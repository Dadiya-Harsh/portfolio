// Runs after `vite build`. Gives every route its own index.html (title, description,
// canonical, Open Graph / Twitter tags), plus dist/404.html and dist/sitemap.xml.
// Routes come from src/routes.json, the same list the app uses for page titles.
// Also writes dist/content.json, dist/llms.txt and dist/llms-full.txt, and checks
// content.json against the v1 contract (plans/mcp/master-plan.md, section 6).
// Plain Node, no dependencies.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const routes = JSON.parse(readFileSync(join(root, 'src/routes.json'), 'utf8'));
const registry = JSON.parse(readFileSync(join(root, 'public/case-studies/registry.json'), 'utf8'));
const { siteUrl, caseStudyTitleSuffix } = routes;

const fail = (msg) => {
  console.error(`generate-static-routes: ${msg}`);
  process.exit(1);
};

// Guard: the router and routes.json must list the same pages. A page missing here
// would 404 on a hard reload once the catch-all rewrite is gone.
const routerSource = readFileSync(join(root, 'src/components/AnimatedRoutes.tsx'), 'utf8');
const routerPaths = [...routerSource.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);
const known = new Set([...routes.pages.map((p) => p.path), '/case-studies/:id', '*']);
routerPaths.forEach((p) => {
  if (!known.has(p)) fail(`AnimatedRoutes.tsx has a route "${p}" that is not in src/routes.json`);
});
routes.pages.forEach((p) => {
  if (!routerPaths.includes(p.path)) fail(`src/routes.json has "${p.path}" but AnimatedRoutes.tsx has no such route`);
});

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const template = readFileSync(join(dist, 'index.html'), 'utf8');

// Swap one tag. The base index.html keeps each of these tags on a single line.
const swap = (html, pattern, replacement) => {
  if (!pattern.test(html)) fail(`index.html is missing a tag matching ${pattern}`);
  return html.replace(pattern, () => replacement);
};

const render = ({ title, description, url, noindex = false }) => {
  let html = template;
  html = swap(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`);
  const descriptionTag = `<meta name="description" content="${escapeAttr(description)}" />`;
  html = swap(
    html,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    noindex ? `${descriptionTag}\n  <meta name="robots" content="noindex" />` : descriptionTag,
  );
  html = swap(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeAttr(title)}" />`);
  html = swap(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeAttr(description)}" />`);
  html = swap(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeAttr(title)}" />`);
  html = swap(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escapeAttr(description)}" />`);
  if (noindex) {
    // 404 page: no canonical, no og:url, and tell crawlers to skip it
    html = swap(html, /\s*<link rel="canonical" href="[^"]*"\s*\/?>/, '');
    html = swap(html, /\s*<meta property="og:url" content="[^"]*"\s*\/?>/, '');
  } else {
    html = swap(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${escapeAttr(url)}" />`);
    html = swap(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${escapeAttr(url)}" />`);
  }
  return html;
};

const write = (relPath, content) => {
  const file = join(dist, relPath);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};

const pages = routes.pages.map((p) => ({
  path: p.path,
  title: p.title,
  description: p.description,
  url: p.path === '/' ? `${siteUrl}/` : `${siteUrl}${p.path}`,
}));

const published = registry.filter((s) => s.status === 'published');
const caseStudyPages = published.map((s) => ({
  path: `/case-studies/${s.id}`,
  title: `${s.title}${caseStudyTitleSuffix}`,
  description: s.desc,
  url: `${siteUrl}/case-studies/${s.id}`,
}));

const all = [...pages, ...caseStudyPages];

all.forEach((page) => {
  const out = page.path === '/' ? 'index.html' : `${page.path.slice(1)}/index.html`;
  write(out, render(page));
});

write('404.html', render({ ...routes.notFound, noindex: true }));

const urls = all.map((p) => `  <url><loc>${escapeText(p.url)}</loc></url>`).join('\n');
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);


// ---------------------------------------------------------------------------
// content.json, llms.txt, llms-full.txt
// ---------------------------------------------------------------------------

// The contract wants the case study headings to be the five below. A heading that isn't
// one of them fails the build. (Set this to false to print warnings instead.)
const HEADINGS_ARE_ERRORS = true;
const ALLOWED_HEADINGS = ['Overview', 'The Problem', 'System Architecture', 'What Was Hard', 'Where It Ended Up'];

const readJson = (rel) => {
  try {
    return JSON.parse(readFileSync(join(root, rel), 'utf8'));
  } catch (e) {
    return fail(`cannot read ${rel}: ${e.message}`);
  }
};

const profileSrc = readJson('src/content/profile.json');
const projectsSrc = readJson('src/content/projects.json');

// "81K" lives in projects.openSource[0].repoStars. Text that mentions it has {repoStars}.
const repoStars = projectsSrc.openSource?.[0]?.repoStars;
const fillPlaceholders = (value) => {
  if (typeof value === 'string') {
    if (!value.includes('{repoStars}')) return value;
    if (typeof repoStars !== 'string' || !repoStars) fail('text uses {repoStars} but projects.openSource[0].repoStars is missing');
    return value.split('{repoStars}').join(repoStars);
  }
  if (Array.isArray(value)) return value.map(fillPlaceholders);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fillPlaceholders(v)]));
  return value;
};

const caseStudies = published.map((s) => ({
  id: s.id,
  type: s.type,
  title: s.title,
  subtitle: s.subtitle,
  role: s.role,
  team: s.team,
  duration: s.duration,
  techStack: typeof s.techStack === 'string' ? s.techStack.split(', ') : s.techStack,
  desc: s.desc,
  bullets: s.bullets,
  url: `/case-studies/${s.id}`,
  markdownUrl: `/case-studies/${s.id}.md`,
}));

const content = fillPlaceholders({
  version: 1,
  generatedAt: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
  siteUrl,
  profile: profileSrc,
  projects: projectsSrc,
  caseStudies,
});

// --- schema check (no dependencies) ---------------------------------------

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const kind = (v) => (v === null ? 'null' : Array.isArray(v) ? 'array' : typeof v);

// A schema is a string ('string', 'number', 'boolean', 'string|null'), ['array', itemSchema],
// or { req: {...}, opt: {...} }. Extra keys are allowed (for example experience[].tags).
const checkShape = (value, schema, path, errors) => {
  if (typeof schema === 'string') {
    const okKinds = schema.split('|');
    if (!okKinds.includes(kind(value))) {
      errors.push(`${path}: expected ${schema}, got ${kind(value)}`);
    } else if (value === '') {
      errors.push(`${path}: empty string`);
    }
    return;
  }
  if (Array.isArray(schema)) {
    if (!Array.isArray(value)) return errors.push(`${path}: expected array, got ${kind(value)}`);
    value.forEach((item, i) => checkShape(item, schema[1], `${path}[${i}]`, errors));
    return;
  }
  if (!isObj(value)) return errors.push(`${path}: expected object, got ${kind(value)}`);
  for (const [key, sub] of Object.entries(schema.req ?? {})) {
    if (!(key in value)) errors.push(`${path}.${key}: missing`);
    else checkShape(value[key], sub, `${path}.${key}`, errors);
  }
  for (const [key, sub] of Object.entries(schema.opt ?? {})) {
    if (key in value) checkShape(value[key], sub, `${path}.${key}`, errors);
  }
};

const linkSchema = { req: { label: 'string', url: 'string' } };
const projectSchema = { req: { title: 'string', description: 'string', links: ['array', linkSchema] } };

const contentSchema = {
  req: {
    version: 'number',
    generatedAt: 'string',
    siteUrl: 'string',
    profile: {
      req: {
        name: 'string',
        title: 'string',
        location: 'string',
        careerStart: 'string',
        openToRoles: 'boolean',
        openToRolesLabel: 'string',
        headline: 'string',
        summary: 'string',
        tagline: 'string',
        focus: ['array', { req: { title: 'string', description: 'string' }, opt: { href: 'string' } }],
        stats: ['array', { req: { value: 'string', label: 'string' } }],
        photo: 'string',
        email: 'string',
        links: {
          req: {
            github: 'string',
            linkedin: 'string',
            medium: 'string',
            resume: 'string',
            resumePdf: 'string',
            resumeDocx: 'string',
            contact: 'string',
            booking: 'string|null',
          },
        },
        nowBuilding: { req: { show: 'boolean', name: 'string', description: 'string', repoUrl: 'string' } },
        experience: [
          'array',
          { req: { role: 'string', org: 'string', orgUrl: 'string|null', period: 'string', points: ['array', 'string'] }, opt: { tags: ['array', 'string'] } },
        ],
        education: ['array', { req: { title: 'string', org: 'string', period: 'string' } }],
        certifications: ['array', { req: { title: 'string', issuer: 'string', date: 'string', url: 'string|null' } }],
      },
    },
    projects: {
      req: {
        recent: ['array', projectSchema],
        openSource: [
          'array',
          { req: { title: 'string', description: 'string', links: ['array', linkSchema], technologies: ['array', 'string'], repoStars: 'string' } },
        ],
        earlier: ['array', projectSchema],
      },
    },
    caseStudies: [
      'array',
      {
        req: {
          id: 'string',
          type: 'string',
          title: 'string',
          subtitle: 'string',
          role: 'string',
          team: 'string',
          duration: 'string',
          techStack: ['array', 'string'],
          desc: 'string',
          bullets: ['array', 'string'],
          url: 'string',
          markdownUrl: 'string',
        },
      },
    ],
  },
};

// ## headings of a case study .md, ignoring anything inside code fences
const h2Headings = (md) => {
  const found = [];
  let inFence = false;
  for (const line of md.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    else if (!inFence && /^## /.test(line)) found.push(line.slice(3).trim());
  }
  return found;
};

const draftsDir = join(root, 'drafts/case-studies');
const draftIds = existsSync(draftsDir)
  ? readdirSync(draftsDir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
  : [];

// Returns { errors, warnings }. `outputs` is the generated text, to check for leftovers.
const validateContent = (obj, outputs = {}) => {
  const errors = [];
  const warnings = [];
  checkShape(obj, contentSchema, 'content', errors);
  if (errors.length) return { errors, warnings }; // the checks below need the right shape

  if (obj.version !== 1) errors.push(`content.version: expected 1, got ${obj.version}`);
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(obj.generatedAt)) errors.push('content.generatedAt: not an ISO 8601 UTC time');
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(obj.profile.careerStart)) errors.push('content.profile.careerStart: expected "YYYY-MM"');
  if (obj.profile.focus.length === 0) errors.push('content.profile.focus: empty');
  if (obj.profile.experience.length === 0) errors.push('content.profile.experience: empty');

  const seen = new Set();
  obj.caseStudies.forEach((cs, i) => {
    const at = `content.caseStudies[${i}] (${cs.id})`;
    if (seen.has(cs.id)) errors.push(`${at}: duplicate id`);
    seen.add(cs.id);
    if (draftIds.includes(cs.id)) errors.push(`${at}: this id is in drafts/, drafts must not be published`);
    if (cs.url !== `/case-studies/${cs.id}`) errors.push(`${at}: url should be /case-studies/${cs.id}`);
    if (cs.markdownUrl !== `/case-studies/${cs.id}.md`) errors.push(`${at}: markdownUrl should be /case-studies/${cs.id}.md`);
    if (cs.techStack.length === 0) errors.push(`${at}: techStack is empty`);
    const mdPath = join(root, 'public/case-studies', `${cs.id}.md`);
    if (!existsSync(mdPath)) {
      errors.push(`${at}: public/case-studies/${cs.id}.md does not exist`);
      return;
    }
    const headings = h2Headings(readFileSync(mdPath, 'utf8'));
    const problems = [];
    let last = -1;
    headings.forEach((h) => {
      const idx = ALLOWED_HEADINGS.indexOf(h);
      if (idx === -1) problems.push(`"## ${h}" is not an allowed heading`);
      else if (idx <= last) problems.push(`"## ${h}" is out of order or repeated`);
      else last = idx;
    });
    problems.forEach((p) => (HEADINGS_ARE_ERRORS ? errors : warnings).push(`${cs.id}.md: ${p} (allowed, in order: ${ALLOWED_HEADINGS.join(' / ')})`));
  });

  // nothing left over in what we write: no placeholders, no draft ids
  const everything = { 'content.json': JSON.stringify(obj), ...outputs };
  for (const [name, text] of Object.entries(everything)) {
    if (name !== 'llms-full.txt' && /\{[A-Za-z][A-Za-z0-9_]*\}/.test(text)) errors.push(`${name}: has an unfilled {placeholder}`);
    if (text.includes('{repoStars}')) errors.push(`${name}: has an unfilled {repoStars}`);
    draftIds.forEach((id) => {
      if (text.toLowerCase().includes(id.toLowerCase())) errors.push(`${name}: mentions draft "${id}"`);
    });
  }
  return { errors, warnings };
};

// --- llms.txt and llms-full.txt -------------------------------------------

const abs = (u) => (/^https?:\/\//.test(u) ? u : `${siteUrl}${u}`);
const { profile: P, projects: PR } = content;

const projectLine = (p) => `- [${p.title}](${abs(p.links[0].url)}): ${p.description}`;

const llmsTxt =
  [
    `# ${P.name}`,
    '',
    `> ${P.summary}`,
    '',
    '## Case studies',
    ...content.caseStudies.map((c) => `- [${c.title}](${abs(c.url)}): ${c.desc}`),
    '',
    '## Projects',
    ...[...PR.recent, ...PR.openSource, ...PR.earlier].map(projectLine),
    '',
    '## More',
    `- [Resume](${abs(P.links.resume)})`,
    `- [Writing](${abs('/blog')})`,
    `- [Contact](${abs(P.links.contact)})`,
    `- [Full text for AI](${abs('/llms-full.txt')})`,
  ].join('\n') + '\n';

// Case study markdown goes under its registry title as an H2, so its own "# Title" line
// is dropped and every other heading moves down one level.
const demoteHeadings = (md) => {
  let inFence = false;
  return md
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
      return !inFence && /^#{1,5} /.test(line) ? `#${line}` : line;
    })
    .join('\n');
};
const dropTitleLine = (md) => md.replace(/\r\n/g, '\n').replace(/^# .*\n+/, '');

// A missing file is reported by validateContent, so don't crash here
const readCaseStudyMd = (id) => {
  const file = join(root, 'public/case-studies', `${id}.md`);
  return existsSync(file) ? readFileSync(file, 'utf8') : '';
};

const list = (items) => items.map((i) => `- ${i}`);

const llmsFull =
  [
    `# ${P.name}`,
    '',
    `> ${P.summary}`,
    '',
    '## Profile',
    `- Title: ${P.title}`,
    `- Location: ${P.location}`,
    `- ${P.openToRoles ? P.openToRolesLabel : 'Not looking for roles right now'}`,
    `- Email: ${P.email}`,
    `- GitHub: ${P.links.github}`,
    `- LinkedIn: ${P.links.linkedin}`,
    `- Medium: ${P.links.medium}`,
    `- Resume: ${abs(P.links.resume)} (PDF: ${abs(P.links.resumePdf)})`,
    '',
    `${P.headline} ${P.tagline}`,
    '',
    '### What I work on',
    ...P.focus.map((f) => `- ${f.title}: ${f.description}`),
    '',
    '### Numbers',
    ...P.stats.map((s) => `- ${s.value}: ${s.label}`),
    ...(P.nowBuilding.show ? ['', '### Now building', `- [${P.nowBuilding.name}](${P.nowBuilding.repoUrl}): ${P.nowBuilding.description}`] : []),
    '',
    '## Experience',
    ...P.experience.flatMap((e) => [
      '',
      `### ${e.role}, ${e.org} (${e.period})`,
      ...list(e.points),
      ...(e.tags?.length ? [`Tech: ${e.tags.join(', ')}`] : []),
    ]),
    '',
    '## Education',
    ...P.education.map((e) => `- ${e.title}, ${e.org} (${e.period})`),
    '',
    '## Certifications',
    ...P.certifications.map((c) => `- ${c.title}, ${c.issuer} (${c.date})${c.url ? `: ${c.url}` : ''}`),
    '',
    ...content.caseStudies.flatMap((c) => [
      `## ${c.title}`,
      `${c.subtitle}. ${c.role}, team of ${c.team.replace(/^team of /i, '')}, ${c.duration}. Page: ${abs(c.url)}`,
      `Tech: ${c.techStack.join(', ')}`,
      '',
      demoteHeadings(dropTitleLine(readCaseStudyMd(c.id))).trim(),
      '',
    ]),
    '## Projects',
    '',
    '### Recent',
    ...PR.recent.map((p) => `- ${p.title}: ${p.description} (${p.links.map((l) => `${l.label}: ${l.url}`).join(', ')})`),
    '',
    '### Open source',
    ...PR.openSource.map(
      (p) => `- ${p.title}: ${p.description} Tech: ${p.technologies.join(', ')}. (${p.links.map((l) => `${l.label}: ${l.url}`).join(', ')})`,
    ),
    '',
    '### Earlier',
    ...PR.earlier.map((p) => `- ${p.title}: ${p.description} (${p.links.map((l) => `${l.label}: ${l.url}`).join(', ')})`),
  ].join('\n') + '\n';

const { errors, warnings } = validateContent(content, { 'llms.txt': llmsTxt, 'llms-full.txt': llmsFull });
warnings.forEach((w) => console.warn(`generate-static-routes: warning: ${w}`));
if (errors.length) {
  fail(`content.json is not valid:\n  - ${errors.join('\n  - ')}`);
}

write('content.json', JSON.stringify(content, null, 2) + '\n');
write('llms.txt', llmsTxt);
write('llms-full.txt', llmsFull);

console.log(`generate-static-routes: ${all.length} routes, 404.html, sitemap.xml, content.json, llms.txt, llms-full.txt`);
