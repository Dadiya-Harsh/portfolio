import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { loadCaseStudyRegistry, loadCaseStudyContent } from '../utils/caseStudyLoader';
import type { CaseStudyMeta } from '../utils/caseStudyLoader';
import MarkdownRenderer from '../components/MarkdownRenderer';

interface TocItem {
    title: string;
    slug: string;
    level: number;
}

const extractHeadings = (md: string): TocItem[] => {
    // Match ## or ### headings
    const regex = /^(#{2,3})\s+(.+)$/gm;
    let match;
    const extracted: TocItem[] = [];
    while ((match = regex.exec(md)) !== null) {
        const title = match[2].trim();
        const level = match[1].length;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        extracted.push({ title, slug, level });
    }
    return extracted;
};

const CaseStudy = () => {
    const { id } = useParams<{ id: string }>();
    const [meta, setMeta] = useState<CaseStudyMeta | null>(null);
    const [content, setContent] = useState<string>('');
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeSlug, setActiveSlug] = useState<string>('');

    useEffect(() => {
        if (!id) return;

        const load = async () => {
            try {
                setLoading(true);
                const registry = await loadCaseStudyRegistry();
                const study = registry.find(s => s.id === id);

                if (!study) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                setMeta(study);

                if (study.status === 'published') {
                    const md = await loadCaseStudyContent(id);
                    setContent(md);
                    setHeadings(extractHeadings(md));
                }
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [id]);

    useEffect(() => {
        // Intersection observer to highlight active TOC item
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSlug(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -40% 0px' }
        );

        headings.forEach((heading) => {
            const el = document.getElementById(heading.slug);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [headings, content]);

    // Loading skeleton
    if (loading) {
        return (
            <div className="max-w-6xl mx-auto py-20 px-6">
                <div className="h-6 w-48 bg-elevated rounded-lg mb-12 animate-pulse" />
                <div className="animate-pulse space-y-6 max-w-4xl">
                    <div className="h-16 w-3/4 bg-elevated rounded-2xl" />
                    <div className="h-4 w-full bg-elevated rounded-lg" />
                    <div className="h-4 w-5/6 bg-elevated rounded-lg" />
                    <div className="h-4 w-2/3 bg-elevated rounded-lg" />
                    <div className="h-[400px] w-full bg-elevated rounded-[2rem] mt-12" />
                </div>
            </div>
        );
    }

    // Error / not found
    if (error || !meta) {
        return (
            <div className="max-w-4xl mx-auto py-20 px-6 text-center">
                <Link to="/case-studies" className="inline-flex items-center text-textSecondary hover:text-accent font-bold mb-12 transition-colors group">
                    <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-2 transition-transform" />
                    Back to Case Studies
                </Link>
                <div className="bg-surface border border-border/50 shadow-xl rounded-3xl p-16">
                    <h1 className="text-3xl font-extrabold text-textPrimary mb-4">Case Study Not Found</h1>
                    <p className="text-textSecondary">The case study you're looking for doesn't exist or has been removed.</p>
                </div>
            </div>
        );
    }

    // Coming Soon state
    if (meta.status === 'coming-soon') {
        return (
            <div className="max-w-4xl mx-auto py-20 px-6 text-center">
                <Link to="/case-studies" className="inline-flex items-center text-textSecondary hover:text-accent font-medium mb-12 transition-all group">
                    <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-2 transition-transform" />
                    Back to Case Studies
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-surface border border-border/50 shadow-2xl rounded-[2.5rem] p-12 md:p-20 flex flex-col items-center justify-center relative overflow-hidden"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-[80px]"></div>
                    <div className="w-20 h-20 bg-elevated/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-accent mb-8 relative z-10 shadow-sm border border-white/5">
                        <ClockIcon className="w-10 h-10" />
                    </div>
                    <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase mb-4 relative z-10 bg-accent/10 px-3 py-1 rounded-full">Coming Soon</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-textPrimary tracking-tight mb-6 relative z-10 max-w-2xl leading-tight">
                        {meta.title}
                    </h1>
                    <p className="text-lg text-textSecondary max-w-xl mx-auto leading-relaxed relative z-10 mb-12">
                        I'm currently writing this architectural deep dive to unpack the system design, challenges faced, and trade-offs made in building this enterprise solution.
                    </p>
                    <div className="flex justify-center relative z-10">
                        <Link
                            to="/contact?subject=Questions about case studies"
                            className="px-8 py-4 bg-textPrimary text-page hover:scale-105 rounded-xl font-bold transition-transform shadow-lg hover:shadow-xl"
                        >
                            Ask me about this architecture
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Published — full content
    return (
        <div className="max-w-4xl mx-auto py-20 px-4 text-center">
            <Link to="/case-studies" className="inline-flex items-center text-textSecondary hover:text-accent font-bold mb-12 transition-colors group">
                <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Case Studies
            </Link>
        <div className="min-h-screen bg-[#f8f9fa] py-6 lg:py-16 px-3 sm:px-6 md:px-10 lg:px-12">
            <div className="max-w-[1300px] mx-auto mb-6 px-1">
                <Link to="/case-studies" className="inline-flex items-center text-textSecondary hover:text-accent font-medium transition-all group">
                    <ArrowLeftIcon className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform" />
                    Back to Case Studies
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[1300px] mx-auto bg-white rounded-[2rem] md:rounded-[3rem] shadow-sm overflow-hidden"
            >
                {/* HERO SECTION (MOCKUP STYLE) */}
                <div className="relative p-1 sm:p-8 md:p-12 lg:p-16 lg:pb-12 bg-white rounded-t-[2rem] md:rounded-t-[3rem]">
                    <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-gray-50/50 rounded-[1.5rem] md:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-100">

                        {/* Left: Text & Badges */}
                        <div className="flex flex-col justify-center">
                            <span className="text-accent font-bold text-xs md:text-sm uppercase tracking-[0.15em] mb-4">
                                Case Study
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-6 uppercase">
                                {meta.title}
                            </h1>
                            {meta.subtitle && (
                                <p className="text-xl md:text-2xl text-gray-800 font-medium mb-10 max-w-xl leading-snug">
                                    {meta.subtitle}
                                </p>
                            )}

                            {/* Badges container */}
                            <div className="flex flex-wrap gap-4 mt-2">
                                {meta.techStack && (
                                    <div className="px-5 py-2.5 bg-white rounded-full border border-gray-200/80 shadow-sm flex items-center">
                                        <span className="text-[11px] font-bold text-textSecondary uppercase tracking-widest mr-2">Tech Stack:</span>
                                        <span className="text-[13px] font-bold text-gray-900">{meta.techStack}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Feature Image */}
                        {meta.heroImage && (
                            <div className="relative h-[250px] sm:h-[350px] lg:h-[450px] w-full rounded-2xl md:rounded-3xl overflow-hidden bg-white shadow-xl max-w-[600px] ml-auto">
                                <img
                                    src={meta.heroImage}
                                    alt="Architecture Illustration"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* CONTENT SECTION (Single Column Full Width) */}
                <div className="p-4 sm:p-8 md:p-12 lg:p-16 pt-0 lg:pt-8 w-full">
                    {/* Universal Sticky TOC */}
                    {headings.length > 0 && (
                        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm px-4 py-3 -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-16 mb-10 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-6">
                            {headings.map(h => (
                                <a
                                    key={h.slug}
                                    href={`#${h.slug}`}
                                    className={`text-sm tracking-wide font-bold transition-all duration-300
                                        ${h.slug === activeSlug ? 'text-accent border-b-2 border-accent pb-1' : 'text-gray-400 hover:text-gray-900'}
                                    `}
                                >
                                    {h.title}
                                </a>
                            ))}
                        </div>
                    )}

                    <article className="mt-8 md:mt-4 w-full max-w-none">
                        <MarkdownRenderer content={content} />
                    </article>

                    {/* Bottom navigation */}
                    <div className="mt-20 pt-10 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <Link to="/case-studies" className="inline-flex items-center text-textSecondary hover:text-accent font-medium transition-colors group">
                            <ArrowLeftIcon className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform" />
                            All Case Studies
                        </Link>
                        <Link
                            to={`/contact?subject=Questions about ${meta.title}`}
                            className="px-8 py-4 bg-textPrimary text-page hover:scale-[1.02] active:scale-95 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                        >
                            Ask me about this architecture
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CaseStudy;
