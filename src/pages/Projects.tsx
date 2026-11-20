import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site';

const Projects = () => {
  // Recent work comes from site.ts so it matches the Home page.
  // The section hides itself when this list is empty.
  const recentWork = siteConfig.secureWorkspace.show ? [siteConfig.secureWorkspace] : [];

  const earlierProjects = [
    {
      title: "Cure Now",
      description: "An AI-powered medical chatbot using Google's Gemini AI, with Pinecone for knowledge base search.",
      github: "https://github.com/Dadiya-Harsh/cure-now/",
    },
    {
      title: "SQL Agent Tool",
      description: "An agent that turns natural language questions into SQL queries.",
      github: "https://github.com/Dadiya-Harsh/sql-tool/",
    },
    {
      title: "MCP Implementation",
      description: "A Model Context Protocol implementation for LLM communication, with multiple transport layers.",
      github: "https://github.com/Dadiya-Harsh/MCP-DEMO/",
    },
    {
      title: "AQI Monitoring",
      description: "An air quality monitoring system with real time and historical trends.",
      github: "https://github.com/Dadiya-Harsh/aqi-monitoring",
    },
  ];

  const ossContributions = [
    {
      title: "Found and reported a startup bug in OpenMontage",
      description: "OpenMontage is an open-source agent framework with 81K stars. One of its skills was skipped on startup because its SKILL.md had no YAML frontmatter, and the video-toolkit skill was named in two different ways (kebab-case and snake_case). I traced both causes and reported them. The issue is closed.",
      technologies: ["Python", "YAML", "Agent Frameworks"],
      github: "https://github.com/OpenMontageInc/OpenMontage/issues/192",
      linkLabel: "View issue #192",
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-20 py-12">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-textPrimary mb-5 tracking-tight">
          Projects & Code
        </h1>
        <p className="text-lg text-textSecondary leading-relaxed">
          A selection of personal projects, data science research, and open-source contributions. For proprietary production systems, see my{' '}
          <Link to="/case-studies" className="text-accent hover:underline font-medium">case studies</Link>.
        </p>
      </motion.section>

      {/* Recent Work */}
      {recentWork.length > 0 && (
        <section>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-extrabold tracking-[0.2em] text-textSecondary uppercase mb-6"
          >
            Recent Work
          </motion.p>

          {recentWork.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-surface border border-border rounded-2xl p-7"
            >
              <span className="inline-block text-xs font-bold tracking-widest uppercase bg-accent/15 text-accent border border-accent/30 px-3 py-1 rounded-full mb-4">
                In progress · Open source
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-textPrimary mb-3">
                {project.name}
              </h3>
              <p className="text-sm text-textSecondary leading-relaxed max-w-2xl">
                {project.description}
              </p>
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-5 text-sm font-semibold text-accent hover:underline"
                >
                  View on GitHub →
                </a>
              )}
            </motion.div>
          ))}
        </section>
      )}

      {/* Open Source Contributions */}
      <section>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-extrabold tracking-[0.2em] text-textSecondary uppercase mb-6"
        >
          Open Source Contributions
        </motion.p>

        {ossContributions.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="block group relative bg-surface border border-border rounded-2xl p-7 hover:border-accent/60 transition-all duration-300 overflow-hidden"
          >
            {/* Warm gradient accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.07] via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold tracking-widest uppercase bg-accent/15 text-accent border border-accent/30 px-3 py-1 rounded-full">
                  Open Source
                </span>
                <svg className="w-5 h-5 text-textSecondary group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-textPrimary mb-3 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-textSecondary leading-relaxed mb-5 max-w-2xl">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-elevated text-textSecondary rounded-full text-xs font-semibold border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm font-semibold text-accent">
                {project.linkLabel} →
              </p>
            </div>
          </motion.a>
        ))}
      </section>

      {/* Earlier Projects */}
      <section>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-extrabold tracking-[0.2em] text-textSecondary uppercase mb-6"
        >
          Earlier Projects
        </motion.p>

        <div className="border-t border-border">
          {earlierProjects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-4 border-b border-border"
            >
              <h3 className="sm:w-48 shrink-0 font-bold text-textPrimary group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="flex-1 text-sm text-textSecondary leading-relaxed">
                {project.description}
              </p>
              <span className="text-sm font-semibold text-textSecondary group-hover:text-accent transition-colors whitespace-nowrap">
                GitHub →
              </span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-8"
      >
        <a
          href="https://github.com/Dadiya-Harsh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-textPrimary text-page px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity font-semibold text-sm"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View GitHub Profile
        </a>
      </motion.section>
    </div>
  );
};

export default Projects;