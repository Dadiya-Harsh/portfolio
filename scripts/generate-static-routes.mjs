// Runs after `vite build`. Gives every route its own index.html (title, description,
// canonical, Open Graph / Twitter tags), plus dist/404.html and dist/sitemap.xml.
// Routes come from src/routes.json, the same list the app uses for page titles.
// Plain Node, no dependencies.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
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

console.log(`generate-static-routes: ${all.length} routes, 404.html, sitemap.xml`);
