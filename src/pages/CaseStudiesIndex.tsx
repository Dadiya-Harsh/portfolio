import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loadCaseStudyRegistry } from '../utils/caseStudyLoader';
import type { CaseStudyMeta } from '../utils/caseStudyLoader';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { getRouteMeta } from '../routes';

const COMING_NEXT = ['MCP Server Extensibility', 'Recommendation Engines'];

const Chip = ({ children, tone }: { children: React.ReactNode; tone: 'accent' | 'muted' }) => (
    <span
        className={`text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full ${tone === 'accent' ? 'bg-accent/10 text-accent' : 'bg-elevated text-textSecondary'}`}
    >
        {children}
    </span>
);

const Fact = ({ label, value }: { label: string; value: string }) => (
    <div>
        <dt className="text-textSecondary">{label}</dt>
        <dd className="font-semibold text-textPrimary">{value}</dd>
    </div>
);

const CaseStudiesIndex = () => {
    useDocumentMeta(getRouteMeta('/case-studies'));
    const [studies, setStudies] = useState<CaseStudyMeta[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCaseStudyRegistry()
            .then(data => setStudies(data))
            .catch(() => setStudies([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-[1120px] w-full mx-auto px-6">
            <section className="pt-12 md:pt-20">
                <p className="text-[13px] font-bold tracking-[0.12em] uppercase text-accent">Case Studies</p>
                <h1 className="mt-2.5 text-4xl md:text-[52px] md:leading-[1.1] font-extrabold tracking-tight text-textPrimary">
                    How I built them
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-textSecondary max-w-[640px]">
                    Write-ups of AI systems I've worked on: the problem, the architecture, what was hard and what I'd change.
                </p>
            </section>

            <section className="pt-12 flex flex-col gap-5">
                {loading
                    ? [0, 1].map(i => (
                        <div key={i} className="bg-surface p-6 md:p-8 rounded-[20px] border border-border animate-pulse flex flex-col md:flex-row gap-8">
                            <div className="flex-1 space-y-4">
                                <div className="flex gap-2">
                                    <div className="h-6 w-28 bg-elevated rounded-full" />
                                    <div className="h-6 w-20 bg-elevated rounded-full" />
                                </div>
                                <div className="h-7 w-2/3 bg-elevated rounded-lg" />
                                <div className="h-4 w-full bg-elevated rounded-lg" />
                                <div className="h-4 w-5/6 bg-elevated rounded-lg" />
                            </div>
                            <div className="md:w-[280px] space-y-3">
                                <div className="h-10 bg-elevated rounded-lg" />
                                <div className="h-10 bg-elevated rounded-lg" />
                                <div className="h-10 bg-elevated rounded-lg" />
                            </div>
                        </div>
                    ))
                    : studies.map((study, index) => {
                        const published = study.status === 'published';
                        const teamLine = [study.team, study.duration].filter(Boolean).join(' · ');
                        const stackLine = study.techStack?.split(',').map(t => t.trim()).filter(Boolean).join(' · ');

                        const inner = (
                            <>
                                <div className="flex-1 min-w-0 flex flex-col gap-3.5">
                                    <div className="flex flex-wrap gap-2">
                                        {published ? <Chip tone="accent">In production</Chip> : <Chip tone="muted">Write-up in progress</Chip>}
                                        <Chip tone="muted">{study.type}</Chip>
                                    </div>
                                    <h2 className="text-2xl md:text-[28px] font-bold text-textPrimary">{study.title}</h2>
                                    <p className="text-base leading-relaxed text-textSecondary">{study.desc}</p>
                                    {published && (
                                        <span className="font-semibold text-[15px] text-accent">Read case study →</span>
                                    )}
                                </div>
                                <dl className="md:w-[280px] md:shrink-0 flex flex-col gap-2.5 text-sm border-t md:border-t-0 md:border-l border-border pt-5 md:pt-0 md:pl-6">
                                    {study.role && <Fact label="My role" value={study.role} />}
                                    {teamLine && <Fact label="Team · Duration" value={teamLine} />}
                                    {stackLine && <Fact label="Stack" value={stackLine} />}
                                </dl>
                            </>
                        );

                        return (
                            <motion.div
                                key={study.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {published ? (
                                    <Link
                                        to={`/case-studies/${study.id}`}
                                        className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8 rounded-[20px] bg-surface border border-border hover:border-accent transition-colors"
                                    >
                                        {inner}
                                    </Link>
                                ) : (
                                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8 rounded-[20px] bg-elevated/40 border border-dashed border-border">
                                        {inner}
                                    </div>
                                )}
                            </motion.div>
                        );
                    })
                }
            </section>

            <section className="pt-14 pb-24">
                <p className="text-[13px] font-bold tracking-[0.12em] uppercase text-textSecondary">Coming next</p>
                <ul className="mt-4 flex flex-wrap gap-3">
                    {COMING_NEXT.map(tag => (
                        <li key={tag} className="text-[13px] font-semibold px-3.5 py-2 rounded-full bg-surface border border-border text-textPrimary">{tag}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default CaseStudiesIndex;
