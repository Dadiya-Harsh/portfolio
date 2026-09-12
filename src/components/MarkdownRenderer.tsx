import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { Children } from 'react';

// Helper to convert heading text/children to an ID slug
const getSlugAction = (children: any) => {
    let text = '';
    Children.forEach(children, (child) => {
        if (typeof child === 'string') {
            text += child;
        }
    });
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const components: Components = {
    h1: ({ children }) => (
        <h1 id={getSlugAction(children)} className="text-4xl md:text-5xl font-extrabold text-textPrimary tracking-tight mb-8 mt-12 first:mt-0 leading-tight">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 id={getSlugAction(children)} className="text-3xl md:text-4xl font-bold text-textPrimary tracking-tight mb-6 mt-16 scroll-mt-24">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 id={getSlugAction(children)} className="text-2xl md:text-3xl font-semibold text-textPrimary mb-4 mt-12 scroll-mt-24">
            {children}
        </h3>
    ),
    h4: ({ children }) => (
        <h4 id={getSlugAction(children)} className="text-xl font-semibold text-textPrimary mb-3 mt-8 scroll-mt-24">
            {children}
        </h4>
    ),
    p: ({ children }) => (
        <p className="text-textSecondary leading-[1.8] mb-6 text-base md:text-lg text-justify w-full">
            {children}
        </p>
    ),
    ul: ({ children }) => (
        <ul className="space-y-3 mb-8 ml-2 mt-2">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal list-outside space-y-3 mb-8 ml-6 text-textSecondary text-base md:text-lg mt-2">
            {children}
        </ol>
    ),
    li: ({ children }) => (
        <li className="flex items-start gap-4 text-textSecondary text-base md:text-lg leading-[1.8]">
            <span className="w-2 h-2 rounded-full bg-accent/80 shrink-0 mt-[0.6rem] shadow-sm" />
            <span className="flex-1">{children}</span>
        </li>
    ),
    strong: ({ children }) => (
        <strong className="font-bold text-textPrimary">{children}</strong>
    ),
    em: ({ children }) => (
        <em className="italic text-textSecondary opacity-90">{children}</em>
    ),
    a: ({ href, children }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent/80 underline underline-offset-4 decoration-accent/30 hover:decoration-accent/80 font-medium transition-all"
        >
            {children}
        </a>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-accent pl-6 py-3 my-8 bg-gradient-to-r from-accent/10 to-transparent rounded-r-2xl italic text-lg text-textPrimary">
            {children}
        </blockquote>
    ),
    code: ({ className, children }) => {
        const isBlock = className?.includes('language-');
        if (isBlock) {
            return (
                <div className="relative group my-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10 blur-xl"></div>
                    <code className="block bg-[#1a1b26] text-gray-300 rounded-2xl p-6 text-[15px] font-mono overflow-x-auto shadow-2xl border border-white/10">
                        {children}
                    </code>
                </div>
            );
        }
        return (
            <code className="bg-elevated/80 text-accent px-2 py-1 rounded-md text-[14px] font-mono border border-border shadow-sm mx-1">
                {children}
            </code>
        );
    },
    pre: ({ children }) => (
        <pre className="mb-0 overflow-visible">{children}</pre>
    ),
    hr: () => (
        <hr className="border-border my-16 opacity-50" />
    ),
    table: ({ children }) => (
        <div className="overflow-x-auto mb-10 rounded-2xl border border-border shadow-sm max-w-full">
            <table className="w-full text-left text-sm md:text-base border-collapse">{children}</table>
        </div>
    ),
    thead: ({ children }) => (
        <thead className="bg-surface text-textPrimary font-semibold border-b border-border">
            {children}
        </thead>
    ),
    th: ({ children }) => (
        <th className="px-6 py-4 font-semibold text-xs md:text-sm uppercase tracking-wider text-textSecondary whitespace-nowrap">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="px-6 py-4 text-textSecondary border-b border-border/50">
            {children}
        </td>
    ),
    img: ({ src, alt }) => (
        <figure className="my-12 relative group">
            <div className="absolute inset-x-4 -inset-y-4 bg-gradient-to-b from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] -z-10"></div>
            <div className="overflow-hidden rounded-2xl border border-border/60 shadow-lg bg-surface transform transition-transform group-hover:-translate-y-1 duration-300 relative z-10">
                <img
                    src={src}
                    alt={alt || ''}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                />
            </div>
            {alt && (
                <figcaption className="text-center text-sm text-textSecondary mt-4 font-medium max-w-2xl mx-auto italic opacity-80">
                    {alt}
                </figcaption>
            )}
        </figure>
    ),
};

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
    return (
        <div className="prose-custom w-full">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
