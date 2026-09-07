import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const caseStudies = [
    {
        id: 'voice-agent',
        type: 'Voice AI',
        title: 'Real-Time Voice Agent Pipeline',
        desc: 'Architected and deployed a production-grade voice agent serving scalable, low-latency conversational AI. Replaced traditional turn-based constraints with uninterrupted, bidirectional streaming architectures.',
        bullets: ['Integrated OpenAI Realtime API over FastAPI WebSockets', 'Managed bi-directional ultra-low latency audio streams']
    },
    {
        id: 'enterprise-rag',
        type: 'Enterprise RAG',
        title: 'Scalable Multi-Agent Workflows',
        desc: 'Engineered highly reliable ingestion and retrieval pipelines for massive enterprise repositories utilizing distributed intelligence and external data binding.',
        bullets: ['RAG pipelines scaling to 500+ enterprise documents using Qdrant', 'Developed custom MCP servers to expose internal business intelligence']
    }
];

const CaseStudiesIndex = () => {
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
                {caseStudies.map((study, index) => (
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
                ))}
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
