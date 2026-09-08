import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ClockIcon } from '@heroicons/react/24/outline';

const titleMap: Record<string, string> = {
    'voice-agent': 'Real-Time Voice Agent Pipeline',
    'enterprise-rag': 'Scalable Multi-Agent Workflows'
};

const CaseStudy = () => {
    const { id } = useParams<{ id: string }>();
    const title = id && titleMap[id] ? titleMap[id] : 'Case Study';

    return (
        <div className="max-w-4xl mx-auto py-20 px-4 text-center">
            <Link to="/" className="inline-flex items-center text-textSecondary hover:text-accent font-bold mb-12 transition-colors group">
                <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface border-2 border-border rounded-[2.5rem] p-12 md:p-20 flex flex-col items-center justify-center relative overflow-hidden"
            >
                {/* Subtle Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>

                <div className="w-20 h-20 bg-elevated rounded-2xl flex items-center justify-center text-accent mb-8 relative z-10 shadow-sm border border-border">
                    <ClockIcon className="w-10 h-10" />
                </div>

                <p className="text-sm font-extrabold tracking-widest text-textSecondary uppercase mb-4 relative z-10">Coming Soon</p>
                <h1 className="text-4xl md:text-5xl font-extrabold text-textPrimary tracking-tight mb-6 relative z-10 max-w-2xl leading-tight">
                    {title}
                </h1>

                <p className="text-xl text-textSecondary max-w-xl mx-auto leading-relaxed relative z-10 mb-12">
                    I'm currently writing this architectural deep dive to unpack the system design, challenges faced, and trade-offs made in building this enterprise solution.
                </p>

                <div className="flex justify-center relative z-10">
                    <Link
                        to="/contact?subject=Questions about case studies"
                        className="px-8 py-4 bg-textPrimary text-page hover:opacity-90 rounded-xl font-bold transition-opacity"
                    >
                        Ask me about this architecture
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default CaseStudy;
