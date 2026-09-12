import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { loadCaseStudyRegistry } from '../utils/caseStudyLoader';
import type { CaseStudyMeta } from '../utils/caseStudyLoader';

const CaseStudiesIndex = () => {
    const [studies, setStudies] = useState<CaseStudyMeta[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCaseStudyRegistry()
            .then(data => setStudies(data))
            .catch(() => setStudies([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-5xl mx-auto space-y-16 py-12 px-4">
            <section className="text-center max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-textPrimary tracking-tight mb-6">
                    Case Studies
                </h1>
                <p className="text-lg text-textSecondary leading-relaxed">
                    Deep dives into the architecture, challenges, and solutions behind the enterprise AI systems I've shipped to production.
                </p>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
                {loading
                    ? [0, 1].map(i => (
                        <div key={i} className="bg-surface p-8 md:p-10 rounded-3xl border-2 border-border animate-pulse">
                            <div className="flex gap-3 mb-6">
                                <div className="h-6 w-20 bg-elevated rounded-lg" />
                                <div className="h-6 w-24 bg-elevated rounded-lg" />
                            </div>
                            <div className="h-7 w-3/4 bg-elevated rounded-lg mb-4" />
                            <div className="h-4 w-full bg-elevated rounded-lg mb-2" />
                            <div className="h-4 w-5/6 bg-elevated rounded-lg mb-6" />
                            <div className="h-4 w-2/3 bg-elevated rounded-lg mb-3" />
                            <div className="h-4 w-3/4 bg-elevated rounded-lg" />
                        </div>
                    ))
                    : studies.map((study, index) => (
                        <motion.div
                            key={study.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-surface p-8 md:p-10 rounded-3xl border-2 border-border flex flex-col h-full"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 bg-accent/10 text-accent font-bold text-xs uppercase tracking-widest rounded-lg">Production</span>
                                <span className="px-3 py-1 bg-elevated text-textSecondary font-bold text-xs uppercase tracking-widest rounded-lg">{study.type}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-textPrimary mb-4">{study.title}</h3>
                            <p className="text-textSecondary leading-relaxed mb-6 flex-grow">
                                {study.desc}
                            </p>
                            <ul className="space-y-3 mb-8">
                                {study.bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-textSecondary font-medium text-left">
                                        <CheckCircleIcon className="w-5 h-5 text-accent shrink-0" />
                                        <div>{bullet}</div>
                                    </li>
                                ))}
                            </ul>
                            <Link to={`/case-studies/${study.id}`} className="inline-flex items-center font-bold text-textPrimary hover:text-accent group transition-colors mt-auto self-start">
                                Read Full Case Study <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))
                }
            </section>

            <div className="text-center mt-12 bg-elevated p-8 rounded-3xl border border-border">
                <p className="text-textSecondary font-medium mb-4">More architectural deep dives are currently being written, covering:</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {['Generative Video Pipelines', 'MCP Server Extensibility', 'Enterprise Recommendation Engines', 'AQI Monitoring'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-surface border border-border rounded-full text-xs font-bold text-textSecondary uppercase tracking-wider">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CaseStudiesIndex;
