import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AcademicCapIcon, SparklesIcon, TrophyIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const techPills = [
  { label: 'Python', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/python.svg' },
  { label: 'LLMs', emoji: '🧠' },
  { label: 'RAG', emoji: '🗃️' },
  { label: 'Agents', emoji: '🤖' },
  { label: 'MCP', emoji: '🔗' },
  { label: 'AWS', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg' },
  { label: 'Claude Code', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anthropic.svg' },
  { label: 'OpenAI Agents', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg' },
  { label: 'LangChain', iconUrl: 'https://pnglogo.sgp1.digitaloceanspaces.com/simple-icons/langchain-dark.svg' },
  { label: 'Claude Agents SDK', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anthropic.svg' },
];

const About = () => {
  const [showEarlier, setShowEarlier] = useState(false);

  return (
    <div className="space-y-0 pb-16">

      {/* ─── 1. HERO SPLIT CARD ─── */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center"
        >
          {/* Left: Photo Container */}
          <div className="relative w-full md:w-[40%] rounded-[2rem] overflow-hidden shadow-2xl shrink-0 border border-border">
            {/* Full-bleed image */}
            <img
              src="/images/profile.jpg"
              alt="Harsh Dadiya"
              className="w-full aspect-[4/5] object-cover"
            />

            {/* Dark gradient scrim at bottom for text readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

            {/* Open to Opportunities badge */}
            <div className="absolute top-5 left-5 flex items-center gap-2 bg-black/50 border border-white/20 rounded-full px-3 py-1.5 backdrop-blur-sm z-10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/95 text-xs font-semibold">Open to Opportunities</span>
            </div>

            {/* Handwritten note — on the image bottom-left */}
            <div className="absolute bottom-6 left-6 z-10 rotate-[-4deg]">
              <span style={{ fontFamily: 'Caveat, cursive' }} className="text-white text-2xl leading-[1.1] drop-shadow-md">
                Build<br />Ship<br />Learn<br />Repeat
              </span>
              <div className="mt-1.5 w-16 h-[2px] bg-white/50 rounded-full" />
            </div>
          </div>

          {/* Right: Intro Text */}
          <div className="w-full md:w-[60%] flex flex-col justify-center space-y-5">
            <div>
              <p className="text-accent font-extrabold tracking-[0.2em] uppercase text-sm mb-2">About Me</p>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-textPrimary tracking-tight leading-tight">
                I'm Harsh Dadiya
              </h1>
            </div>

            <p className="text-[17px] font-semibold text-textPrimary/90 leading-snug">
              An AI Engineer focused on shipping production LLM systems in Python and contributing to open source like OpenMontage.
            </p>
            <p className="text-[15px] text-textSecondary leading-relaxed">
              I'm an AI Engineer with 1.5+ years of experience building and deploying real-world AI systems. I work at the intersection of LLMs, agentic workflows, and scalable backend infrastructure, turning ideas into production-ready solutions.
            </p>
            <p className="text-[15px] text-textSecondary leading-relaxed">
              From building generative long-form video pipelines to integrating OpenAI Realtime API for voice agents, I enjoy solving complex problems and building tools that create real value. I'm also an active open source contributor, with contributions to OpenMontage (50K+ stars), and I love exploring new technologies like MCP, RAG, and multi-agent systems.
            </p>
            <p className="text-[15px] text-textSecondary leading-relaxed">
              When I'm not building, you'll find me writing about AI, learning something new, or tinkering with side projects.
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {techPills.map(({ label, emoji, iconUrl }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-surface border border-border rounded-full text-sm font-semibold text-textPrimary hover:border-accent/60 transition-colors shadow-sm"
                >
                  {iconUrl ? (
                    <img src={iconUrl} alt={label} className="w-4 h-4 dark:invert opacity-80" />
                  ) : (
                    <span>{emoji}</span>
                  )}
                  {label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── 2. PROFESSIONAL JOURNEY (responsive theme) ─── */}
      <section className="bg-surface border-y border-border py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-8">
            <p className="text-accent font-extrabold tracking-[0.2em] uppercase text-xs mb-2">My Journey</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-textPrimary tracking-tight">Professional Journey</h2>
            <p className="text-textSecondary text-sm font-medium mt-2 max-w-lg mx-auto">
              A timeline of my professional experience and growth in the AI/ML space.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Central vertical line */}
            <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-accent/40 to-white/10" />

            {/* Present dot at top */}
            <div className="relative flex justify-start md:justify-center mb-2 z-10 pl-[8px] md:pl-0">
              <span className="bg-accent text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-lg shadow-accent/30">Present</span>
            </div>

            {/* Role 1 — left card, current */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="pl-[44px] md:pl-0 pr-4 md:pr-8 flex justify-start md:justify-end"
              >
                <div className="bg-elevated border border-border rounded-2xl p-5 max-w-sm w-full hover:border-accent/40 shadow-sm transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-textSecondary text-xs font-semibold">Aug 2024 – Present</span>
                    <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-0.5 rounded-full">Current</span>
                  </div>
                  <h3 className="text-textPrimary text-base md:text-lg font-extrabold mb-1.5">Associate AI Engineer</h3>
                  <a href="https://wappnet.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mb-3 group outline-none">
                    <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 shadow-sm transition-transform group-hover:scale-110">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="50" fill="#313645" />
                        <line x1="24" y1="30" x2="34" y2="64" stroke="#F39C12" strokeWidth="8.5" strokeLinecap="round" />
                        <path d="M 37 74 L 50 30 L 63 74 L 76 30" stroke="white" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </div>
                    <span className="text-textSecondary text-sm font-semibold group-hover:text-accent transition-colors">Wappnet Systems</span>
                  </a>
                  <ul className="text-textSecondary text-xs md:text-sm space-y-1.5 mb-4">
                    <li>• Building and shipping production-grade AI features and tools.</li>
                    <li>• Working on generative long-form video pipelines using LLMs, Remotion and AWS.</li>
                    <li>• Integrated OpenAI Realtime API for voice agents and conversational AI systems.</li>
                    <li>• Developing RAG pipelines and multi-agent workflows for business applications.</li>
                  </ul>
                  <div className="flex flex-wrap gap-1">
                    {['Python', 'FastAPI', 'AWS', 'OpenAI', 'RAG', 'Agents'].map(t => (
                      <span key={t} className="text-[11px] px-2 py-0.5 bg-surface border border-border text-textSecondary rounded-full font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Center dot */}
              <div className="absolute left-[20px] md:left-1/2 top-5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-accent border-4 border-surface z-10 shadow-lg shadow-accent/40" />

              <div className="hidden md:block pl-8" /> {/* Empty right side for this row */}
            </div>

            {/* Role 2 — right card */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 mb-6">
              <div className="hidden md:block pr-8" /> {/* Empty left side for this row */}

              {/* Center dot */}
              <div className="absolute left-[20px] md:left-1/2 top-5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-border border-4 border-surface z-10" />

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="pl-[44px] md:pl-8 pr-4 md:pr-0 flex justify-start"
              >
                <div className="bg-elevated border border-border rounded-2xl p-5 max-w-sm w-full hover:border-accent/40 shadow-sm transition-colors">
                  <span className="text-textSecondary text-xs font-semibold block mb-2">Jan 2024 – Aug 2024</span>
                  <h3 className="text-textPrimary text-base md:text-lg font-extrabold mb-1.5">AI/ML Intern</h3>
                  <a href="https://wappnet.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mb-3 group outline-none">
                    <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 shadow-sm transition-transform group-hover:scale-110">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="50" fill="#313645" />
                        <line x1="24" y1="30" x2="34" y2="64" stroke="#F39C12" strokeWidth="8.5" strokeLinecap="round" />
                        <path d="M 37 74 L 50 30 L 63 74 L 76 30" stroke="white" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </div>
                    <span className="text-textSecondary text-sm font-semibold group-hover:text-accent transition-colors">Wappnet Systems</span>
                  </a>
                  <ul className="text-textSecondary text-xs md:text-sm space-y-1.5 mb-4">
                    <li>• Worked on internal AI tools and automation systems.</li>
                    <li>• Built and evaluated RAG pipelines for document understanding.</li>
                    <li>• Contributed to generative video workflows and data processing tools.</li>
                    <li>• Explored OpenAI APIs and multimodal AI capabilities.</li>
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'LangChain', 'OpenAI', 'RAG', 'Computer Vision'].map(t => (
                      <span key={t} className="text-[11px] px-2 py-0.5 bg-surface border border-border text-textSecondary rounded-full font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Earlier Roles (Toggleable) */}
            <AnimatePresence>
              {showEarlier && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  {/* Role 3 — left card */}
                  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 mb-6 mt-6">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      className="pl-[44px] md:pl-0 pr-4 md:pr-8 flex justify-start md:justify-end"
                    >
                      <div className="bg-elevated border border-border rounded-2xl p-5 max-w-sm w-full hover:border-accent/40 shadow-sm transition-colors">
                        <span className="text-textSecondary text-xs font-semibold block mb-2">June 2024 – July 2024</span>
                        <h3 className="text-textPrimary text-base md:text-lg font-extrabold mb-1.5">Data Science & ML Intern</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-5 h-5 bg-textPrimary rounded-full flex items-center justify-center text-[10px] font-bold text-background">B</div>
                          <span className="text-textSecondary text-sm font-semibold">BrainyBeam Info-Tech</span>
                        </div>
                        <ul className="text-textSecondary text-xs md:text-sm space-y-1.5 mb-4">
                          <li>• Developed an intelligent AQI monitoring system.</li>
                          <li>• Analyzed PM2.5, PM10, and NO2 parameters using Pandas and scikit-learn.</li>
                        </ul>
                        <div className="flex flex-wrap gap-1">
                          {['Python', 'Pandas', 'scikit-learn'].map(t => (
                            <span key={t} className="text-[11px] px-2 py-0.5 bg-surface border border-border text-textSecondary rounded-full font-medium">{t}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Center dot */}
                    <div className="absolute left-[20px] md:left-1/2 top-5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-border border-4 border-surface z-10" />

                    <div className="hidden md:block pl-8" /> {/* Empty right side */}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Row: Quote (Left) & Earlier Toggle (Center) */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 pt-0 pb-8 md:pb-0">
              {/* Left Side: Quote Block */}
              <div className="pl-[44px] md:pl-0 pr-4 md:pr-8 flex flex-col justify-start md:justify-end">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-sm ml-0 md:ml-auto text-left"
                >
                  <span className="text-accent text-3xl font-extrabold leading-none block mb-1">"</span>
                  <p style={{ fontFamily: 'Caveat, cursive' }} className="text-textSecondary text-xl leading-snug">
                    Consistency beats intensity.<br />
                    Ship small, learn fast, keep building."
                  </p>
                  <p className="text-textSecondary opacity-60 text-xs font-semibold mt-3">— Harsh Dadiya</p>
                </motion.div>
              </div>

              {/* Center Dot & Right Side Empty */}
              <div className="relative pl-[44px] md:pl-8 flex flex-col justify-end mt-12 md:mt-0">
                {/* Earlier Toggle Button replacing the line's end */}
                <div className="absolute left-[20px] md:left-0 top-auto bottom-0 md:-translate-x-1/2 translate-y-1/2 flex justify-start md:justify-center z-10 w-full sm:w-auto -translate-x-[18px]">
                  <button
                    onClick={() => setShowEarlier(!showEarlier)}
                    className="group flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 bg-surface p-1 outline-none"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border-4 border-surface transition-colors ${showEarlier ? 'bg-accent' : 'bg-border group-hover:bg-accent'}`} />
                    <span className={`text-sm font-semibold transition-colors ${showEarlier ? 'text-textPrimary' : 'text-textSecondary group-hover:text-textPrimary'}`}>
                      {showEarlier ? 'Hide Earlier' : 'Earlier'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. SKILLS ─── */}
      <section className="max-w-6xl mx-auto px-4 pt-20">
        <div className="mb-10">
          <p className="text-accent font-extrabold tracking-[0.2em] uppercase text-sm mb-3">Technical Radar</p>
          <h2 className="text-3xl font-extrabold text-textPrimary">Skills & Stack</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface border border-border p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-textPrimary mb-4">AI & Machine Learning</h3>
            <div className="flex flex-wrap gap-2">
              {['LLMs', 'Prompt Engineering', 'RAG Pipelines', 'OpenAI Agents SDK', 'OpenAI Realtime API', 'MCP', 'LangChain', 'Langfuse', 'PyTorch'].map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-elevated text-textPrimary text-sm font-medium rounded-lg border border-border">{skill}</span>
              ))}
            </div>
          </div>
          <div className="bg-surface border border-border p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-textPrimary mb-4">Backend & Cloud</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Qdrant', 'AWS (Lambda, ECS, S3)', 'Docker', 'WebSockets'].map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-elevated text-textPrimary text-sm font-medium rounded-lg border border-border">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. EDUCATION ─── */}
      <section className="max-w-6xl mx-auto px-4 pt-16">
        <div className="mb-10">
          <p className="text-accent font-extrabold tracking-[0.2em] uppercase text-sm mb-3">Academic Background</p>
          <h2 className="text-3xl font-extrabold text-textPrimary">Education</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface border border-border p-6 rounded-2xl">
            <p className="text-sm font-bold tracking-widest text-textSecondary uppercase mb-1">2021 – 2025</p>
            <h3 className="text-lg font-bold text-textPrimary mb-2">Bachelor of Engineering (IT)</h3>
            <p className="text-textSecondary text-sm">A D Patel Institute of Technology</p>
          </div>
          <div className="bg-surface border border-border p-6 rounded-2xl">
            <p className="text-sm font-bold tracking-widest text-textSecondary uppercase mb-1">2022 – 2024</p>
            <h3 className="text-lg font-bold text-textPrimary mb-2">Minor Degree (IoT)</h3>
            <p className="text-textSecondary text-sm">A D Patel Institute of Technology</p>
          </div>
        </div>
      </section>

      {/* ─── 5. CERTIFICATIONS ─── */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-8">
        <div className="mb-10">
          <p className="text-accent font-extrabold tracking-[0.2em] uppercase text-sm mb-3">Recognition</p>
          <h2 className="text-3xl font-extrabold text-textPrimary">Certifications & Recognition</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: <AcademicCapIcon className="w-5 h-5" />, title: 'Machine Learning Specialization', issuer: 'DeepLearning.AI & Coursera', date: '2024', link: 'https://www.coursera.org/account/accomplishments/specialization/P6SUM2UJVZ9S' },
            { icon: <SparklesIcon className="w-5 h-5" />, title: 'Code Unnati Innovation Marathon', issuer: 'SAP India & Edunet Foundation', date: '2024' },
            { icon: <TrophyIcon className="w-5 h-5" />, title: 'SSIP Hackathon Participant', issuer: 'Gujarat State Innovation Program', date: '2023–2024' },
            { icon: <CodeBracketIcon className="w-5 h-5" />, title: 'HackerRank Certified', issuer: 'Python & Data Structures', date: '2023' },
          ].map((cert, i) => {
            const inner = (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-surface border border-border p-5 rounded-2xl flex items-start gap-4 hover:border-accent transition-colors"
              >
                <div className="p-2 bg-accent/10 text-accent rounded-xl shrink-0">{cert.icon}</div>
                <div>
                  <p className="font-bold text-textPrimary text-sm">{cert.title}</p>
                  <p className="text-textSecondary text-xs mt-0.5">{cert.issuer}</p>
                  <p className="text-textSecondary text-xs mt-0.5 opacity-60">{cert.date}</p>
                </div>
              </motion.div>
            );
            return cert.link ? <a key={i} href={cert.link} target="_blank" rel="noopener noreferrer">{inner}</a> : inner;
          })}
        </div>
      </section>

    </div>
  );
};

export default About;
