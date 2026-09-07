import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-24 py-12">

      {/* 1. Hero / Intro Split */}
      <section className="flex flex-col md:flex-row gap-12 items-center md:items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full md:w-1/3 shrink-0"
        >
          <div className="aspect-square rounded-3xl overflow-hidden border border-border bg-surface shadow-sm">
            <img src="/images/profile.jpg" alt="Harsh Dadiya" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-2/3 space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-textPrimary tracking-tight">About Me</h1>
          <p className="text-lg text-textSecondary leading-relaxed">
            I am an AI Engineer with 1.5+ years of experience shipping production LLM systems in Python. I specialize in real-time voice agents, MCP servers, multi-agent workflows, and RAG pipelines running on FastAPI, PostgreSQL, and AWS.
          </p>
          <p className="text-lg text-textSecondary leading-relaxed">
            I own features end to end, from architectural design through deployment and production debugging. Outside of work, I actively contribute to the open-source AI ecosystem, including a notable contribution to OpenMontage (50k+ stars).
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="bg-surface border border-border rounded-xl px-4 py-3 flex flex-col">
              <span className="text-2xl font-bold text-accent">1.5+</span>
              <span className="text-xs font-bold text-textSecondary uppercase tracking-wider">Years Exp</span>
            </div>
            <div className="bg-surface border border-border rounded-xl px-4 py-3 flex flex-col">
              <span className="text-2xl font-bold text-accent">500+</span>
              <span className="text-xs font-bold text-textSecondary uppercase tracking-wider">Indexed Docs</span>
            </div>
          </div>
        </motion.div>
      </section>

      <hr className="border-border" />

      {/* 2. Experience Timeline */}
      <section>
        <h2 className="text-3xl font-bold text-textPrimary mb-8">Professional Journey</h2>
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:via-border/50 before:to-transparent">

          {/* Role 1 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-page bg-accent text-page shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface border border-border p-6 rounded-2xl shadow-sm hover:border-accent transition-colors">
              <div className="flex flex-col mb-3">
                <span className="text-accent font-semibold text-sm mb-1">June 2025 – Present</span>
                <h3 className="text-xl font-bold text-textPrimary">Associate AI Engineer</h3>
                <p className="text-textSecondary text-sm">Wappnet Systems Pvt. Ltd. | Gujarat, India</p>
              </div>
              <ul className="text-sm text-textSecondary space-y-2 list-disc list-inside">
                <li>Built a generative long-form video pipeline (up to 45 mins) in active production for YouTube.</li>
                <li>Built a real-time voice agent using OpenAI Realtime API, streaming bidirectional audio over fastAPI websockets.</li>
                <li>Developed MCP servers exposing internal business systems as agent-callable tools.</li>
                <li>Shipped multi-agent workflows for automated research and reporting.</li>
                <li>Built RAG pipelines scaling to 500+ enterprise documents using Qdrant.</li>
              </ul>
            </div>
          </div>

          {/* Role 2 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group text-textSecondary">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-page bg-border text-textSecondary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow"></div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-elevated border border-border/50 p-6 rounded-2xl">
              <div className="flex flex-col mb-3">
                <span className="font-semibold text-sm mb-1">January 2025 – June 2025</span>
                <h3 className="text-xl font-bold text-textPrimary">AI/ML Intern</h3>
                <p className="text-textSecondary text-sm">Wappnet Systems Pvt. Ltd.</p>
              </div>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li>Built an enterprise recommendation system in Python.</li>
                <li>Deployed applications on OCI with Oracle Database.</li>
                <li>Promoted to full-time Associate AI Engineer after successful execution of internships deliverables.</li>
              </ul>
            </div>
          </div>

          {/* Role 3 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group text-textSecondary">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-page bg-border text-textSecondary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow"></div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-elevated border border-border/50 p-6 rounded-2xl">
              <div className="flex flex-col mb-3">
                <span className="font-semibold text-sm mb-1">June 2024 - July 2024</span>
                <h3 className="text-xl font-bold text-textPrimary">Data Science & ML Intern</h3>
                <p className="text-textSecondary text-sm">BrainyBeam Info-Tech</p>
              </div>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li>Developed an intelligent AQI monitoring system.</li>
                <li>Analyzed PM2.5, PM10, and NO2 parameters using Pandas and scikit-learn.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* 3. Skills */}
      <section>
        <h2 className="text-3xl font-bold text-textPrimary mb-8">Technical Radar</h2>
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

      {/* 4. Education */}
      <section>
        <h2 className="text-3xl font-bold text-textPrimary mb-8">Education</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface border border-border p-6 rounded-2xl">
            <p className="text-sm font-bold tracking-widest text-textSecondary uppercase mb-1">2021 - 2025</p>
            <h3 className="text-lg font-bold text-textPrimary mb-2">Bachelor of Engineering (IT)</h3>
            <p className="text-textSecondary text-sm mb-4">A D Patel Institute of Technology</p>
            <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 text-accent font-bold rounded-lg text-sm">CGPA: 8.14</div>
          </div>
          <div className="bg-surface border border-border p-6 rounded-2xl">
            <p className="text-sm font-bold tracking-widest text-textSecondary uppercase mb-1">2022 - 2024</p>
            <h3 className="text-lg font-bold text-textPrimary mb-2">Minor Degree (IoT)</h3>
            <p className="text-textSecondary text-sm mb-4">A D Patel Institute of Technology</p>
            <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 text-accent font-bold rounded-lg text-sm">CGPA: 7.56</div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
