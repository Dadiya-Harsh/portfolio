import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { Children } from 'react';

// Splits a case study markdown file into a headline (its first "# " line) and
// "## " sections. Sections about challenges render their "### " parts as cards.
export interface CaseStudySection {
    title: string;
    intro: string;
    cards: { title: string; body: string }[];
}

const CARD_SECTION = /hard|hurdle|challenge|trade-?off/i;

export const splitCaseStudy = (md: string): { headline: string | null; sections: CaseStudySection[] } => {
    let text = md.replace(/\r\n/g, '\n');

    let headline: string | null = null;
    const h1 = text.match(/^# (.+)\n/);
    if (h1) {
        headline = h1[1].trim();
        text = text.slice(h1[0].length);
    }

    text = text
        .replace(/^### (Tech Stack)\s*$/gm, '## $1') // the stack table is its own section
        .replace(/^---\s*$/gm, ''); // dividers between sections aren't needed

    const sections: CaseStudySection[] = [];
    for (const part of text.split(/^## /m).slice(1)) {
        const nl = part.indexOf('\n');
        const title = (nl === -1 ? part : part.slice(0, nl)).trim();
        const body = nl === -1 ? '' : part.slice(nl + 1);

        if (!CARD_SECTION.test(title)) {
            sections.push({ title, intro: body.trim(), cards: [] });
            continue;
        }
        const [intro, ...cardParts] = body.split(/^### /m);
        sections.push({
            title,
            intro: intro.trim(),
            cards: cardParts.map((c) => {
                const i = c.indexOf('\n');
                return { title: c.slice(0, i === -1 ? undefined : i).trim(), body: i === -1 ? '' : c.slice(i + 1).trim() };
            }),
        });
    }
    return { headline, sections };
};

const slug = (children: React.ReactNode) => {
    let text = '';
    Children.forEach(children, (child) => {
        if (typeof child === 'string') text += child;
    });
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const components: Components = {
    h3: ({ children }) => (
        <h3 id={slug(children)} className="text-lg font-bold text-textPrimary mt-8 mb-2 scroll-mt-24">
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="text-base md:text-[17px] leading-[1.75] text-textSecondary mt-3">{children}</p>
    ),
    ul: ({ children }) => <ul className="mt-4 space-y-3">{children}</ul>,
    ol: ({ children }) => <ol className="mt-4 list-decimal pl-6 space-y-3">{children}</ol>,
    li: ({ children }) => (
        <li className="flex items-start gap-3 text-base md:text-[17px] leading-[1.75] text-textSecondary">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-[0.8rem]" aria-hidden="true" />
            <span className="flex-1">{children}</span>
        </li>
    ),
    strong: ({ children }) => <strong className="font-semibold text-textPrimary">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    a: ({ href, children }) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accentHover font-semibold">
            {children}
        </a>
    ),
    code: ({ className, children }) =>
        className?.includes('language-') ? (
            <code className="block bg-elevated text-textPrimary rounded-2xl p-5 text-sm font-mono overflow-x-auto border border-border">
                {children}
            </code>
        ) : (
            <code className="bg-elevated text-textPrimary px-1.5 py-0.5 rounded-md text-[14px] font-mono border border-border">
                {children}
            </code>
        ),
    pre: ({ children }) => <pre className="mt-4 overflow-visible">{children}</pre>,
    blockquote: ({ children }) => (
        <blockquote className="mt-4 border-l-2 border-accent pl-5 text-textPrimary">{children}</blockquote>
    ),
    table: ({ children }) => (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full text-left text-[15px] border-collapse">{children}</table>
        </div>
    ),
    thead: ({ children }) => <thead className="border-b border-border">{children}</thead>,
    th: ({ children }) => (
        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-textSecondary whitespace-nowrap">{children}</th>
    ),
    td: ({ children }) => (
        <td className="px-5 py-3.5 text-textPrimary border-b border-border/60 first:text-textSecondary first:w-44 [tr:last-child_&]:border-b-0">
            {children}
        </td>
    ),
    img: ({ src, alt }) => (
        <figure className="mt-5">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                <img src={src} alt={alt || ''} className="w-full h-auto object-contain" loading="lazy" />
            </div>
        </figure>
    ),
    hr: () => null,
};

const Md = ({ children }: { children: string }) => (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
    </ReactMarkdown>
);

const CaseStudyBody = ({ sections }: { sections: CaseStudySection[] }) => (
    <>
        {sections.map((s) => (
            <section key={s.title} className="mt-12 first:mt-10">
                <h2 id={slug(s.title)} className="text-2xl md:text-[28px] font-bold tracking-tight text-textPrimary scroll-mt-24">
                    {s.title}
                </h2>
                {s.intro && <Md>{s.intro}</Md>}
                {s.cards.length > 0 && (
                    <div className="mt-5 flex flex-col gap-4">
                        {s.cards.map((c) => (
                            <div key={c.title} className="rounded-2xl border border-border bg-surface px-6 py-5">
                                <h3 className="text-[17px] font-bold text-textPrimary">{c.title}</h3>
                                <Md>{c.body}</Md>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        ))}
    </>
);

export default CaseStudyBody;
