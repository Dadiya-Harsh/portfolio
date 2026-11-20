import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeftIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { loadCaseStudyRegistry, loadCaseStudyContent } from '../utils/caseStudyLoader';
import type { CaseStudyMeta } from '../utils/caseStudyLoader';
import CaseStudyBody, { splitCaseStudy } from '../components/CaseStudyBody';
import NotFound from './NotFound';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { caseStudyTitle } from '../routes';


const CaseStudy = () => {
    const { id } = useParams<{ id: string }>();
    const [meta, setMeta] = useState<CaseStudyMeta | null>(null);
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // While loading, use a plain title. For an unknown id, pass null so NotFound sets its own.
    useDocumentMeta(
        meta
            ? { title: caseStudyTitle(meta.title), description: meta.desc }
            : loading ? { title: 'Case Study · Harsh Dadiya' } : null
    );

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

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
                }
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [id]);

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

    // Unknown id (or the study failed to load): same 404 page as every other bad URL
    if (error || !meta) {
        return <NotFound />;
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
                            Ask me about this system
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Published: full content
    const { headline, sections } = splitCaseStudy(content);
    const statusLabel = meta.status === 'published' ? 'In production' : 'Write-up in progress';

    return (
        <div className="min-h-screen bg-page px-6 transition-colors duration-300">
            {/* Minimalist Top Edge Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
                style={{ scaleX }}
            />
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[820px] mx-auto pt-10 md:pt-14 pb-24"
            >
                <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accentHover transition-colors">
                    <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
                    All case studies
                </Link>

                <div className="flex flex-wrap gap-2 mt-7">
                    <span className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-accent/10 text-accent">{statusLabel}</span>
                    {meta.type && (
                        <span className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-elevated text-textSecondary">{meta.type}</span>
                    )}
                </div>

                <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-textPrimary">
                    {headline || meta.title}
                </h1>
                {meta.subtitle && (
                    <p className="mt-4 text-lg md:text-xl leading-relaxed text-textSecondary">{meta.subtitle}</p>
                )}

                {(meta.role || meta.team || meta.duration) && (
                    <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 rounded-2xl border border-border bg-surface px-6 py-5 text-sm">
                        {[
                            { label: 'My role', value: meta.role },
                            { label: 'Team', value: meta.team },
                            { label: 'Duration', value: meta.duration },
                            { label: 'Status', value: statusLabel },
                        ].filter(item => item.value).map(item => (
                            <div key={item.label}>
                                <dt className="text-textSecondary">{item.label}</dt>
                                <dd className="mt-1 font-semibold text-textPrimary">{item.value}</dd>
                            </div>
                        ))}
                    </dl>
                )}

                <CaseStudyBody sections={sections} />

                {/* Bottom navigation */}
                <div className="mt-14 pt-7 border-t border-border flex flex-wrap items-center justify-between gap-4">
                    <Link to="/case-studies" className="inline-flex items-center gap-2 font-semibold text-accent hover:text-accentHover transition-colors">
                        <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
                        All case studies
                    </Link>
                    <Link
                        to={`/contact?subject=Questions about ${meta.title}`}
                        className="font-semibold text-accent hover:text-accentHover transition-colors"
                    >
                        Ask me about this system →
                    </Link>
                </div>
            </motion.article>
        </div>
    );
};

export default CaseStudy;
