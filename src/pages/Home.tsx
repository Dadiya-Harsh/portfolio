import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MicrophoneIcon,
  ServerStackIcon,
  CpuChipIcon,
  UserGroupIcon,
  CloudIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div className="space-y-16 pt-4 pb-12">
      {/* 1. Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 max-w-6xl mx-auto px-4">
        {/* Left: Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-4 border-surface shadow-2xl relative"
        >
          <img src="/images/profile.jpg" alt="Harsh Dadiya" className="w-full h-full object-cover" />
        </motion.div>

        {/* Right: Text Content */}
        <div className="text-center md:text-left space-y-5 relative flex-1 max-w-2xl">
          {/* Handwritten Annotation */}
          <div className="hidden lg:flex flex-col items-center absolute -top-8 right-0 text-textSecondary opacity-80 z-10 rotate-3 translate-x-8">
            <span style={{ fontFamily: 'Caveat, cursive' }} className="text-xl text-center leading-tight">Building useful<br />AI for a better<br />tomorrow.</span>
            <svg className="w-10 h-10 text-textSecondary opacity-60 -ml-16 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18,4 Q12,12 6,18 M10,18 L6,18 L6,14" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-accent font-bold mb-4 relative inline-block">
              Hi, I'm Harsh Dadiya
              <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-accent rounded-full opacity-60" />
            </p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-textPrimary leading-[1.15] tracking-tight mb-4">
              I ship production AI systems — <span className="text-textSecondary/90">voice agents, RAG pipelines, and MCP servers.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-textSecondary font-medium"
          >
            1.5+ years · FastAPI + PostgreSQL + AWS
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4 relative z-20"
          >
            <Link
              to="/projects"
              className="w-full sm:w-auto bg-accent text-white px-8 py-3.5 rounded-xl hover:bg-accentHover hover:shadow-lg active:scale-95 transition-all font-bold flex items-center justify-center gap-2 group"
            >
              View Projects
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/resume"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-textPrimary hover:bg-elevated transition-colors font-bold border-2 border-border flex items-center justify-center gap-2"
            >
              <DocumentTextIcon className="w-5 h-5 text-accent" />
              Download Resume
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Strip */}
      <section className="border-y border-border bg-page py-12 lg:py-16">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 md:divide-x divide-border">
            {[
              { number: '1.5+ Years', sub: 'Production AI' },
              { number: '500+ Docs', sub: 'RAG-Indexed' },
              { number: '50K+ Stars', sub: 'OSS Merge' },
              { number: '3 Systems', sub: 'In Prod' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center px-4 md:px-8 w-full"
              >
                <div className="text-3xl lg:text-4xl font-extrabold text-accent mb-2 tracking-tight">{stat.number}</div>
                <div className="text-textSecondary text-sm font-medium">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. What I Build */}
      <section className="container max-w-5xl mx-auto px-4">
        <div className="mb-12 text-center md:text-left">
          <p className="text-xs font-extrabold tracking-widest text-textSecondary uppercase mb-3">WHAT I BUILD</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-textPrimary max-w-lg">Turning ideas into production-ready AI systems.</h2>
            <p className="text-textSecondary max-w-sm text-[15px] leading-relaxed">
              From voice agents to scalable RAG pipelines, I build and deploy AI systems that solve real problems.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pb-4">
          {[
            { icon: MicrophoneIcon, title: 'Voice AI', desc: 'Realtime voice agents with low latency, tool use, and natural conversations.', subject: 'Interested in a Voice AI system', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' },
            { icon: ServerStackIcon, title: 'RAG Pipelines', desc: 'Ingest, index, and retrieve knowledge at scale for reliable AI answers.', subject: 'Interested in a RAG Pipeline', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
            { icon: CpuChipIcon, title: 'MCP Servers', desc: 'Model Context Protocol servers to expose tools and data to AI agents.', subject: 'Interested in MCP Server development', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
            { icon: UserGroupIcon, title: 'Multi-Agent', desc: 'Orchestrate specialized agents to solve complex workflows.', subject: 'Interested in a Multi-Agent system', color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
            { icon: CloudIcon, title: 'AWS Infra', desc: 'Deploy and scale AI systems with AWS (Lambda, ECS, S3, RDS, etc.).', subject: 'Interested in AWS AI infrastructure', color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
            { icon: ChatBubbleLeftRightIcon, title: 'Chat Systems', desc: 'Domain-specific chat applications for internal and external users.', subject: 'Interested in a Chat System', color: 'text-pink-600', bg: 'bg-pink-100 dark:bg-pink-900/30' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={`/contact?subject=${encodeURIComponent(item.subject)}`}
                className="block bg-surface p-6 rounded-3xl border-2 border-border hover:border-accent hover:shadow-xl hover:-translate-y-1 group transition-all duration-300 h-full relative"
              >
                <div className="flex items-start gap-4 h-full">
                  <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-105 transition-transform duration-300`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col pr-6">
                    <h3 className="text-xl font-bold text-textPrimary mb-1">{item.title}</h3>
                    <p className="text-textSecondary text-[15px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <ArrowRightIcon className="w-5 h-5 text-textSecondary group-hover:text-accent absolute top-6 right-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Technical Case Studies */}
      <section className="container max-w-5xl mx-auto px-4">
        <div className="mb-12">
          <p className="text-sm font-extrabold tracking-widest text-accent uppercase mb-4">Architecture Deep Dives</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-textPrimary">Technical Case Studies</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface p-8 md:p-10 rounded-3xl border-2 border-border block flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-accent/10 text-accent font-bold text-xs uppercase tracking-widest rounded-lg">Production</span>
              <span className="px-3 py-1 bg-elevated text-textSecondary font-bold text-xs uppercase tracking-widest rounded-lg">Voice AI</span>
            </div>
            <h3 className="text-2xl font-bold text-textPrimary mb-4">Real-Time Voice Agent Pipeline</h3>
            <p className="text-textSecondary leading-relaxed mb-6 flex-grow">
              Architected and deployed a production-grade voice agent serving scalable, low-latency conversational AI. Replaced traditional turn-based constraints with uninterrupted, bidirectional streaming architectures.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-sm text-textSecondary font-medium text-left">
                <CheckCircleIcon className="w-5 h-5 text-accent shrink-0" />
                <div>Integrated OpenAI Realtime API over FastAPI WebSockets</div>
              </li>
              <li className="flex items-start gap-3 text-sm text-textSecondary font-medium text-left">
                <CheckCircleIcon className="w-5 h-5 text-accent shrink-0" />
                <div>Managed bi-directional ultra-low latency audio streams</div>
              </li>
            </ul>
            <Link to="/case-studies/voice-agent" className="inline-flex font-bold text-textPrimary hover:text-accent group transition-colors mt-auto self-start">
              Read Full Case Study <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform inline self-center" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface p-8 md:p-10 rounded-3xl border-2 border-border block flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-accent/10 text-accent font-bold text-xs uppercase tracking-widest rounded-lg">Production</span>
              <span className="px-3 py-1 bg-elevated text-textSecondary font-bold text-xs uppercase tracking-widest rounded-lg">Enterprise RAG</span>
            </div>
            <h3 className="text-2xl font-bold text-textPrimary mb-4">Scalable Multi-Agent Workflows</h3>
            <p className="text-textSecondary leading-relaxed mb-6 flex-grow">
              Engineered highly reliable ingestion and retrieval pipelines for massive enterprise repositories utilizing distributed intelligence and external data binding.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-sm text-textSecondary font-medium text-left">
                <CheckCircleIcon className="w-5 h-5 text-accent shrink-0" />
                <div>RAG pipelines scaling to 500+ enterprise documents using Qdrant</div>
              </li>
              <li className="flex items-start gap-3 text-sm text-textSecondary font-medium text-left">
                <CheckCircleIcon className="w-5 h-5 text-accent shrink-0" />
                <div>Developed custom MCP servers to expose internal business intelligence</div>
              </li>
            </ul>
            <Link to="/case-studies/enterprise-rag" className="inline-flex font-bold text-textPrimary hover:text-accent group transition-colors mt-auto self-start">
              Read Full Case Study <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform inline self-center" />
            </Link>
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <Link to="/about" className="inline-flex items-center gap-2 text-textSecondary hover:text-accent font-bold transition-colors group">
            See my full professional experience
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 5. Quotation Flow CTA */}
      <section className="bg-textPrimary text-page py-24 px-4 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, var(--accent) 0%, transparent 70%)' }}></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container max-w-3xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to accelerate your AI workflow?</h2>
          <p className="text-xl text-page/70 mb-10 leading-relaxed max-w-2xl mx-auto">
            Whether you need a custom voice agent, a highly accurate RAG pipeline, or just an experienced engineer to scale your backend—let's make it happen.
          </p>
          <Link
            to="/contact?subject=Project Inquiry"
            className="inline-flex items-center justify-center px-10 py-5 bg-accent hover:bg-accentHover text-white rounded-2xl font-bold text-lg shadow-xl shadow-accent/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/30 transition-all group"
          >
            Start a Conversation
            <ArrowRightIcon className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;