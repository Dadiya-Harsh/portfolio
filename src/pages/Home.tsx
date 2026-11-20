import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { loadCaseStudyRegistry } from '../utils/caseStudyLoader';
import { experienceYears } from '../utils/experience';
import { siteConfig } from '../config/site';
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

// Individual stat card
const StatCard = ({ value, label, sub, delay }: {
  value: string;
  label?: string;
  sub: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: delay }}
    className="text-center px-4 md:px-8 w-full"
  >
    <div className="text-3xl lg:text-4xl font-extrabold text-accent mb-2 tracking-tight">
      {value}{label && <> <span className="text-xl lg:text-2xl font-bold text-textPrimary">{label}</span></>}
    </div>
    <div className="text-textSecondary text-sm font-medium">{sub}</div>
  </motion.div>
);

// Recent writing. Temporary local fetch, Phase 5 swaps it for the shared useMediumPosts hook.
interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  publication?: string;
}

const decodeEntities = (str: string) =>
  str
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");

const formatPostDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const Home = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudyMeta[]>([]);
  const [posts, setPosts] = useState<MediumPost[]>([]);

  useEffect(() => {
    loadCaseStudyRegistry()
      .then(data => setCaseStudies(data.slice(0, 2)))
      .catch(() => setCaseStudies([]));
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/medium')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
      })
      .then(data => {
        // Dedupe by title so cross-posted articles don't show twice
        const seen = new Set<string>();
        const unique = (data.articles as MediumPost[])
          .map(a => ({ ...a, title: decodeEntities(a.title) }))
          .filter(a => {
            const key = a.title.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        if (!cancelled) setPosts(unique.slice(0, 3));
      })
      .catch(() => {
        // Section hides itself when the feed is down
        if (!cancelled) setPosts([]);
      });
    return () => { cancelled = true; };
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
            <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/5 text-accent px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
              Open to AI Engineer roles
            </div>
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
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4 relative z-20"
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
              className="px-2 py-3.5 text-textSecondary hover:text-accent transition-colors font-medium break-all"
            >
              {siteConfig.email}
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Strip */}
      <section className="border-y border-border bg-page py-12 lg:py-16">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 md:gap-0 md:divide-x divide-border">
            <StatCard value={`${experienceYears()}+`} label="yrs" sub="Building AI in production" delay={0} />
            <StatCard value="OpenMontage" sub="Open-source contributor · 81K★ repo" delay={0.1} />
            <StatCard value="500+" label="docs" sub="Indexed in RAG systems" delay={0.2} />
          </div>
        </div>
      </section>

      {/* Now building */}
      {siteConfig.secureWorkspace.show && (
        <section className="container max-w-5xl mx-auto px-4">
          <div className="bg-surface border-2 border-border rounded-3xl px-6 py-5 flex flex-wrap items-center gap-4">
            <span className="px-3 py-1 bg-textPrimary text-page font-bold text-xs uppercase tracking-widest rounded-lg">Now building</span>
            <p className="flex-1 basis-80 min-w-0 text-[15px] leading-relaxed text-textSecondary">
              <strong className="text-textPrimary">{siteConfig.secureWorkspace.name}</strong>
              {' '}&mdash; {siteConfig.secureWorkspace.description}
            </p>
            {siteConfig.secureWorkspace.repoUrl && (
              <a
                href={siteConfig.secureWorkspace.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-sm text-textPrimary hover:text-accent transition-colors"
              >
                View on GitHub &rarr;
              </a>
            )}
          </div>
        </section>
      )}

      {/* Case studies */}
      <section className="container max-w-5xl mx-auto px-4">
        <div className="mb-12">
          <p className="text-sm font-extrabold tracking-widest text-accent uppercase mb-4">Architecture Deep Dives</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-textPrimary">Technical Case Studies</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study) => {
            const published = study.status === 'published';
            const meta = [study.role, study.team, study.duration].filter(Boolean).join(' · ');
            return (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`bg-surface p-8 md:p-10 rounded-3xl border-2 ${published ? '' : 'border-dashed '}border-border block flex flex-col h-full`}
            >
              <div className="flex items-center gap-3 mb-6">
                {published ? (
                  <span className="px-3 py-1 bg-accent/10 text-accent font-bold text-xs uppercase tracking-widest rounded-lg">Production</span>
                ) : (
                  <span className="px-3 py-1 bg-elevated text-textSecondary font-bold text-xs uppercase tracking-widest rounded-lg">Write-up in progress</span>
                )}
                <span className="px-3 py-1 bg-elevated text-textSecondary font-bold text-xs uppercase tracking-widest rounded-lg">{study.type}</span>
              </div>
              <h3 className="text-2xl font-bold text-textPrimary mb-4">{study.title}</h3>
              <p className="text-textSecondary leading-relaxed mb-6 flex-grow">
                {study.desc}
              </p>
              {published && (
                <ul className="space-y-3 mb-6">
                  {study.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-textSecondary font-medium text-left">
                      <CheckCircleIcon className="w-5 h-5 text-accent shrink-0" />
                      <div>{bullet}</div>
                    </li>
                  ))}
                </ul>
              )}
              {meta && <p className="text-sm text-textSecondary font-medium mb-6">{meta}</p>}
              {published && (
                <Link to={`/case-studies/${study.id}`} className="inline-flex font-bold text-textPrimary hover:text-accent group transition-colors mt-auto self-start">
                  Read Full Case Study <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform inline self-center" />
                </Link>
              )}
            </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/about" className="inline-flex items-center gap-2 text-textSecondary hover:text-accent font-bold transition-colors group">
            See my full professional experience
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* What I work on */}
      <section className="container max-w-5xl mx-auto px-4">
        <div className="mb-12 text-center md:text-left">
          <p className="text-xs font-extrabold tracking-widest text-textSecondary uppercase mb-3">WHAT I WORK ON</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-textPrimary">Where I spend my time</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pb-4">
          {[
            { icon: MicrophoneIcon, title: 'Voice AI', desc: 'Realtime voice agents with low latency, tool use, and natural conversations.', href: '/case-studies/voice-agent', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' },
            { icon: ServerStackIcon, title: 'RAG Pipelines', desc: 'Ingest, index, and retrieve knowledge at scale for reliable AI answers.', href: '', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
            { icon: CpuChipIcon, title: 'MCP Servers', desc: 'Model Context Protocol servers to expose tools and data to AI agents.', href: '/projects', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
            { icon: UserGroupIcon, title: 'Multi-Agent', desc: 'Orchestrate specialized agents to solve complex workflows.', href: '/case-studies/generative-video', color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
            { icon: CloudIcon, title: 'AWS Infra', desc: 'Deploy and scale AI systems with AWS (Lambda, ECS, S3, RDS, etc.).', href: '', color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
            { icon: ChatBubbleLeftRightIcon, title: 'Chat Systems', desc: 'Domain-specific chat applications for internal and external users.', href: '', color: 'text-pink-600', bg: 'bg-pink-100 dark:bg-pink-900/30' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {item.href ? (
                <Link
                  to={item.href}
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
              ) : (
                <div className="bg-surface p-6 rounded-3xl border-2 border-border h-full">
                  <div className="flex items-start gap-4 h-full">
                    <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}>
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-xl font-bold text-textPrimary mb-1">{item.title}</h3>
                      <p className="text-textSecondary text-[15px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent writing (hides itself if the feed is empty or down) */}
      {posts.length > 0 && (
        <section className="container max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-extrabold tracking-widest text-accent uppercase mb-4">Writing</p>
              <h2 className="text-4xl font-extrabold tracking-tight text-textPrimary">Recent writing</h2>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 text-textSecondary hover:text-accent font-bold transition-colors group">
              All posts
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="bg-surface rounded-3xl border-2 border-border overflow-hidden divide-y divide-border">
            {posts.map((post) => (
              <a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-6 px-6 md:px-8 py-5 hover:bg-elevated transition-colors"
              >
                <span className="font-bold text-textPrimary text-[17px] leading-snug">{post.title}</span>
                <span className="text-sm text-textSecondary font-medium shrink-0">
                  {[post.publication, formatPostDate(post.pubDate)].filter(Boolean).join(' · ')}
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Hiring CTA */}
      <section className="bg-textPrimary text-page py-24 px-4 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, var(--accent) 0%, transparent 70%)' }}></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container max-w-3xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Hiring an AI engineer?</h2>
          <p className="text-xl text-page/70 mb-10 leading-relaxed max-w-2xl mx-auto">
            I'm open to full-time AI / ML engineering roles. The fastest way to reach me is email.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/resume/Harsh_Dadiya_Resume.pdf"
              download
              className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accentHover text-white rounded-2xl font-bold text-lg shadow-xl shadow-accent/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/30 transition-all"
            >
              Download resume
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-lg border-2 border-page/25 text-page hover:bg-page/10 transition-colors break-all"
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