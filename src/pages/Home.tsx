import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { loadCaseStudyRegistry } from '../utils/caseStudyLoader';
import type { CaseStudyMeta } from '../utils/caseStudyLoader';
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

// Count-up hook: animates a number from 0 to `end` when `trigger` is true
const useCountUp = (end: number, duration: number = 1.5, trigger: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease-out cubic for a smooth deceleration feel
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration, trigger]);

  return count;
};

// Individual stat card component with count-up
const StatCard = ({ value, suffix, label, sub, delay }: {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  delay: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCountUp(value, 1.8, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: delay }}
      className="text-center px-4 md:px-8 w-full"
    >
      <div className="text-3xl lg:text-4xl font-extrabold text-accent mb-2 tracking-tight">
        {count}{suffix} <span className="text-xl lg:text-2xl font-bold text-textPrimary">{label}</span>
      </div>
      <div className="text-textSecondary text-sm font-medium">{sub}</div>
    </motion.div>
  );
};

const Home = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudyMeta[]>([]);

  useEffect(() => {
    loadCaseStudyRegistry()
      .then(data => setCaseStudies(data.slice(0, 2)))
      .catch(() => setCaseStudies([]));
  }, []);

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
          {/* Handwritten Annotation — absolute on large screens, inline on mobile */}
          <div className="lg:hidden flex flex-col items-center mb-2 text-textSecondary opacity-70">
            <span style={{ fontFamily: 'Caveat, cursive' }} className="text-lg text-center leading-tight">Building useful AI for a better tomorrow.</span>
          </div>
          <div className="hidden lg:flex flex-col items-center absolute -top-8 right-0 text-textSecondary opacity-80 z-10 rotate-3 translate-x-8">
            <span style={{ fontFamily: 'Caveat, cursive' }} className="text-xl text-center leading-tight">Building useful<br />AI for a better<br />tomorrow.</span>
            <svg className="w-10 h-10 text-textSecondary opacity-60 -ml-16 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18,4 Q12,12 6,18 M10,18 L6,18 L6,14" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="inline-flex items-center border border-accent/30 bg-accent/5 text-accent px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
              Hi, I'm Harsh Dadiya
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl lg:text-5xl lg:text-[3.5rem] font-extrabold text-textPrimary leading-[1.1] tracking-tight mb-6"
          >
            I ship production AI systems.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-textSecondary font-medium leading-relaxed max-w-xl"
          >
            Turning complex ideas into reliable, scalable AI solutions that create real value.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4 relative z-20"
          >
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-accent text-white px-8 py-3.5 rounded-xl hover:bg-accentHover hover:shadow-lg active:scale-95 transition-all font-bold flex items-center justify-center gap-2 group"
            >
              Let's Talk
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/projects"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-textPrimary hover:bg-elevated transition-colors font-bold border-2 border-border flex items-center justify-center gap-2"
            >
              View Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Strip */}
      <section className="border-y border-border bg-page py-12 lg:py-16">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 md:divide-x divide-border">
            <StatCard value={1} suffix=".5+" label="Years" sub="Experience" delay={0} />
            <StatCard value={50} suffix="K+" label="Stars" sub="OSS Merge" delay={0.1} />
            <StatCard value={500} suffix="+" label="Documents" sub="RAG-Indexed" delay={0.2} />
            <StatCard value={15} suffix="+" label="Systems" sub="Shipped to Prod" delay={0.3} />
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
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-surface p-8 md:p-10 rounded-3xl border-2 border-border block flex flex-col h-full"
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
              <Link to={`/case-studies/${study.id}`} className="inline-flex font-bold text-textPrimary hover:text-accent group transition-colors mt-auto self-start">
                Read Full Case Study <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform inline self-center" />
              </Link>
            </motion.div>
          ))}
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