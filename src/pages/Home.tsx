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
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div className="space-y-32 py-12">
      {/* 1. Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto px-4">
        {/* Left: Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-4 border-surface shadow-xl"
        >
          <img src="/images/profile.jpg" alt="Harsh Dadiya" className="w-full h-full object-cover" />
        </motion.div>

        {/* Right: Text Content */}
        <div className="text-center md:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-accent font-bold tracking-widest uppercase mb-3">Hi, I'm Harsh Dadiya</p>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-textPrimary leading-[1.1] tracking-tight max-w-2xl">
              I ship production AI systems.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-textSecondary max-w-xl leading-relaxed"
          >
            Specializing in voice agents, RAG pipelines, and MCP servers using FastAPI, PostgreSQL, and AWS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4"
          >
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-accent text-white px-8 py-4 rounded-xl hover:bg-accentHover hover:shadow-lg hover:shadow-accent/20 active:scale-95 transition-all font-bold flex items-center justify-center gap-2 group"
            >
              Let's Talk
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/projects"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-textPrimary hover:bg-elevated transition-colors font-bold border-2 border-border flex items-center justify-center gap-2"
            >
              View Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Strip */}
      <section className="border-y border-border bg-surface py-16">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 md:divide-x divide-border">
            {[
              { number: '1.5+', label: 'Years', sub: 'Production AI' },
              { number: '500+', label: 'Docs', sub: 'RAG-Indexed' },
              { number: '50K+', label: 'Stars', sub: 'OSS Merge' },
              { number: '15+', label: 'Builds', sub: 'Shipped to Prod' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center px-4"
              >
                <div className="text-4xl lg:text-5xl font-extrabold text-accent mb-2 tracking-tight">{stat.number} <span className="text-2xl lg:text-3xl">{stat.label}</span></div>
                <div className="text-textSecondary text-sm font-bold uppercase tracking-widest">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. What I Build */}
      <section className="container max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <p className="text-sm font-extrabold tracking-widest text-accent uppercase">Capabilities</p>
            <h2 className="text-4xl font-extrabold tracking-tight text-textPrimary">Turning ideas into<br />production-ready systems.</h2>
          </div>
          <p className="text-textSecondary max-w-md text-lg leading-relaxed">
            These are the core architectural capabilities I've shipped into active production environments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: MicrophoneIcon, title: 'Voice AI', desc: 'Realtime voice agents with ultra-low latency, tool injection, and natural prosody.', subject: 'Interested in a Voice AI system' },
            { icon: ServerStackIcon, title: 'RAG Pipelines', desc: 'Ingest, index, and retrieve enterprise knowledge securely at scale.', subject: 'Interested in a RAG Pipeline' },
            { icon: CpuChipIcon, title: 'MCP Servers', desc: 'Custom Model Context Protocol servers to securely expose DBs and tools to AI.', subject: 'Interested in MCP Server development' },
            { icon: UserGroupIcon, title: 'Multi-Agent', desc: 'Orchestrate specialized, collaborative agents to solve complex workflows.', subject: 'Interested in a Multi-Agent system' },
            { icon: CloudIcon, title: 'AWS Infra', desc: 'Deploy and scale robust AI systems with AWS Lambda, ECS, and RDS.', subject: 'Interested in AWS AI infrastructure' },
            { icon: ChatBubbleLeftRightIcon, title: 'Chat Systems', desc: 'Domain-specific, streaming chat applications for internal or B2C users.', subject: 'Interested in a Chat System' }
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
                className="block bg-surface p-8 rounded-3xl border-2 border-border hover:border-accent hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 group transition-all duration-300 h-full flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-elevated rounded-2xl flex items-center justify-center text-textSecondary group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <ArrowRightIcon className="w-5 h-5 text-textSecondary group-hover:text-accent group-hover:translate-x-2 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-bold text-textPrimary mb-3">{item.title}</h3>
                <p className="text-textSecondary leading-relaxed flex-grow">{item.desc}</p>
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