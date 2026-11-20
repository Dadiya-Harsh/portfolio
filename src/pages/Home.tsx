import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { loadCaseStudyRegistry } from '../utils/caseStudyLoader';
import { experienceYears } from '../utils/experience';
import { useMediumPosts } from '../hooks/useMediumPosts';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { getRouteMeta } from '../routes';
import { siteConfig } from '../config/site';
import type { CaseStudyMeta } from '../utils/caseStudyLoader';
import {
  MicrophoneIcon,
  ServerStackIcon,
  CpuChipIcon,
  UserGroupIcon,
  CloudIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// Individual stat card
const StatCard = ({ value, sub, delay }: {
  value: string;
  sub: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: delay }}
    className="text-left px-6 py-3 w-full"
  >
    <div className="text-3xl font-extrabold text-accent tracking-tight">{value}</div>
    <div className="text-textSecondary text-sm font-medium mt-1">{sub}</div>
  </motion.div>
);

// Recent writing date, e.g. "Oct 2025"
const formatPostDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const Home = () => {
  useDocumentMeta(getRouteMeta('/'));
  const [caseStudies, setCaseStudies] = useState<CaseStudyMeta[]>([]);
  const { posts: allPosts } = useMediumPosts();
  const posts = allPosts.slice(0, 3);

  useEffect(() => {
    loadCaseStudyRegistry()
      .then(data => setCaseStudies(data.slice(0, 2)))
      .catch(() => setCaseStudies([]));
  }, []);

  return (
    <div className="space-y-24 pt-4 pb-12">
      {/* 1. Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 max-w-6xl mx-auto px-4">
        {/* Left: Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-full overflow-hidden border-4 border-surface shadow-2xl relative"
        >
          <img src="/images/profile.jpg" alt="Harsh Dadiya" className="w-full h-full object-cover" />
        </motion.div>

        {/* Right: Text Content */}
        <div className="text-center md:text-left space-y-5 relative flex-1 max-w-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2"
          >
            <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/5 text-accent px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
              Open to AI Engineer roles
            </div>
            <span style={{ fontFamily: 'Caveat, cursive' }} className="text-xl text-textSecondary">Building useful AI for a better tomorrow.</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl lg:text-[3.5rem] font-extrabold text-textPrimary leading-[1.1] tracking-tight mb-6"
          >
            I ship production AI systems.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-textSecondary font-medium leading-relaxed max-w-xl"
          >
            Associate AI Engineer based in Ahmedabad. I build voice agents, RAG pipelines and MCP-based agent workflows in Python, and get them running in production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center md:justify-start gap-4 pt-4 relative z-20"
          >
            <Link
              to="/resume"
              className="w-full sm:w-auto bg-accent text-white px-8 py-3.5 rounded-xl hover:bg-accentHover hover:shadow-lg active:scale-95 transition-all font-bold flex items-center justify-center gap-2 group"
            >
              View resume
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/case-studies"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-textPrimary hover:bg-elevated transition-colors font-bold border-2 border-border flex items-center justify-center gap-2"
            >
              Read case studies
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="px-2 py-3.5 text-textSecondary hover:text-accent transition-colors font-medium"
            >
              {siteConfig.email}
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Strip */}
      <section className="border-y border-border bg-surface py-9">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 md:divide-x divide-border">
            <StatCard value={`${experienceYears()}+ yrs`} sub="building AI in production" delay={0} />
            <StatCard value="OpenMontage" sub="open-source contributor · 81K★ repo" delay={0.1} />
            <StatCard value="500+" sub="documents indexed in RAG systems" delay={0.2} />
          </div>
        </div>
      </section>

      {/* Now building */}
      {siteConfig.secureWorkspace.show && (
        <section className="container max-w-6xl mx-auto px-4 -mt-14">
          <div className="bg-surface border-2 border-border rounded-3xl px-6 py-5 flex flex-wrap items-center gap-4">
            <span className="px-3 py-1 bg-textPrimary text-page font-bold text-xs uppercase tracking-widest rounded-full">Now building</span>
            <p className="flex-1 basis-80 min-w-0 text-[15px] leading-relaxed text-textSecondary">
              <strong className="text-textPrimary">{siteConfig.secureWorkspace.name}</strong>
              {' '}&mdash; {siteConfig.secureWorkspace.description}
            </p>
            {siteConfig.secureWorkspace.repoUrl && (
              <a
                href={siteConfig.secureWorkspace.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-sm text-accent hover:text-accentHover transition-colors"
              >
                Follow on GitHub &rarr;
              </a>
            )}
          </div>
        </section>
      )}

      {/* Case studies */}
      <section className="container max-w-6xl mx-auto px-4">
        <p className="text-sm font-extrabold tracking-widest text-accent uppercase">Case studies</p>
        <div className="flex flex-wrap items-end justify-between gap-4 mt-3">
          <h2 className="text-4xl md:text-[2.5rem] font-extrabold tracking-tight text-textPrimary">Systems I've built at work</h2>
          <Link to="/case-studies" className="inline-flex items-center gap-2 font-bold text-accent hover:text-accentHover transition-colors group">
            All case studies
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-9">
          {caseStudies.map((study) => {
            const published = study.status === 'published';
            const hasMeta = study.role || study.team || study.duration;
            const body = (
              <>
                <div className="flex items-center gap-2">
                  {published ? (
                    <span className="px-3 py-1 bg-accent/10 text-accent font-bold text-xs uppercase tracking-widest rounded-full">In production</span>
                  ) : (
                    <span className="px-3 py-1 bg-elevated text-textSecondary font-bold text-xs uppercase tracking-widest rounded-full">Write-up in progress</span>
                  )}
                  <span className="px-3 py-1 bg-elevated text-textSecondary font-bold text-xs uppercase tracking-widest rounded-full">{study.type}</span>
                </div>
                <h3 className="text-[22px] font-bold text-textPrimary">{study.title}</h3>
                <p className="text-[15px] text-textSecondary leading-relaxed flex-grow">{study.desc}</p>
                {hasMeta && (
                  <p className="text-[13px] text-textSecondary">
                    {study.role && <strong className="text-textPrimary">{study.role}</strong>}
                    {study.role && (study.team || study.duration) && ' · '}
                    {[study.team, study.duration].filter(Boolean).join(' · ')}
                  </p>
                )}
                {published && <span className="font-bold text-[15px] text-accent mt-auto">Read case study &rarr;</span>}
              </>
            );
            const base = 'bg-surface p-7 rounded-3xl border-2 flex flex-col gap-3.5 h-full';
            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="h-full"
              >
                {published ? (
                  <Link to={`/case-studies/${study.id}`} className={`${base} border-border hover:border-accent hover:shadow-xl transition-all duration-300`}>
                    {body}
                  </Link>
                ) : (
                  <div className={`${base} border-dashed border-border`}>{body}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* What I work on */}
      <section className="container max-w-6xl mx-auto px-4">
        <p className="text-sm font-extrabold tracking-widest text-accent uppercase">What I work on</p>
        <h2 className="text-4xl md:text-[2.5rem] font-extrabold tracking-tight text-textPrimary mt-3">Where I spend my time</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-9">
          {[
            { icon: MicrophoneIcon, title: 'Voice AI', desc: 'Real-time voice agents with tool use', href: '/case-studies/voice-agent', hint: 'See case study', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' },
            { icon: ServerStackIcon, title: 'RAG pipelines', desc: 'Ingest, index and retrieve business documents', href: '', hint: '', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
            { icon: CpuChipIcon, title: 'MCP servers', desc: 'Exposing tools and data to AI agents', href: '/projects', hint: 'See projects', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
            { icon: UserGroupIcon, title: 'Multi-agent workflows', desc: 'Specialized agents with review checkpoints', href: '/case-studies/generative-video', hint: 'See case study', color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
            { icon: CloudIcon, title: 'AWS deployment', desc: 'Lambda, ECS, S3, RDS, etc.', href: '', hint: '', color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
            { icon: ChatBubbleLeftRightIcon, title: 'Chat systems', desc: 'Domain-specific assistants for teams and customers', href: '', hint: '', color: 'text-pink-600', bg: 'bg-pink-100 dark:bg-pink-900/30' }
          ].map((item, i) => {
            const inner = (
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
                  <item.icon className="w-[22px] h-[22px]" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-textPrimary">{item.title}</h3>
                  <p className="text-sm text-textSecondary mt-1 leading-relaxed">{item.desc}</p>
                  {item.hint && <p className="text-[13px] font-bold text-accent mt-2">{item.hint} &rarr;</p>}
                </div>
              </div>
            );
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                {item.href ? (
                  <Link to={item.href} className="block bg-surface p-5 rounded-3xl border-2 border-border hover:border-accent hover:shadow-xl transition-all duration-300 h-full">
                    {inner}
                  </Link>
                ) : (
                  <div className="bg-surface p-5 rounded-3xl border-2 border-border h-full">{inner}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Recent writing (hides itself if the feed is empty or down) */}
      {posts.length > 0 && (
        <section className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-extrabold tracking-widest text-accent uppercase">Writing</p>
              <h2 className="text-4xl md:text-[2.5rem] font-extrabold tracking-tight text-textPrimary mt-3">Recent writing</h2>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 font-bold text-accent hover:text-accentHover transition-colors group">
              All posts
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="bg-surface rounded-3xl border-2 border-border overflow-hidden divide-y divide-border">
            {posts.map((post) => (
              <a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-6 px-6 md:px-7 py-5 hover:bg-elevated transition-colors"
              >
                <span className="font-semibold text-textPrimary text-[17px] leading-snug">{post.title}</span>
                <span className="text-sm text-textSecondary shrink-0">
                  {formatPostDate(post.pubDate)}
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Hiring CTA */}
      <section className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-textPrimary text-page rounded-[28px] px-8 py-16 flex flex-col items-center text-center gap-4"
        >
          <h2 className="text-4xl md:text-[2.5rem] font-extrabold tracking-tight">Hiring an AI engineer?</h2>
          <p className="text-[17px] text-page/70 leading-relaxed max-w-xl">
            I'm open to full-time AI / ML engineering roles. The fastest way to reach me is email.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
            <a
              href="/resume/Harsh_Dadiya_Resume.pdf"
              download
              className="inline-flex items-center justify-center px-6 py-3.5 bg-accent hover:bg-accentHover text-white rounded-xl font-bold transition-colors"
            >
              Download resume
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold border border-page/25 text-page hover:bg-page/10 transition-colors break-all"
            >
              {siteConfig.email}
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
