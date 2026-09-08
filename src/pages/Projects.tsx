import { motion } from 'framer-motion';

const Projects = () => {
  const customProjects = [
    {
      title: "Cure Now - Intelligent Medical Chatbot",
      description: "An AI-powered medical chatbot leveraging Google's Gemini AI for accurate health information delivery. Features vector similarity search using Pinecone for efficient medical knowledge base retrieval.",
      technologies: ["Python", "Flask", "Gemini AI", "LangChain", "Pinecone"],
      github: "https://github.com/Dadiya-Harsh/cure-now/",
      type: "Personal"
    },
    {
      title: "SQL Agent Tool",
      description: "Built intelligent SQL query agent that converts natural language queries into executable SQL statements. Integrated multiple LLMs, robust database schema reflection and safe testing.",
      technologies: ["Python", "SQLAlchemy", "Multiple LLMs", "PostgreSQL"],
      github: "https://github.com/Dadiya-Harsh/sql-tool/",
      type: "Personal"
    },
    {
      title: "Model Context Protocol (MCP) Implementation",
      description: "Implemented comprehensive Model Context Protocol for seamless LLM communication. Developed multiple transport layers to handle async inputs streams.",
      technologies: ["Python", "Async Programming", "LLM Integration", "CLI Tools"],
      github: "https://github.com/Dadiya-Harsh/MCP-DEMO/",
      type: "Personal"
    },
    {
      title: "Air Quality Index (AQI) Monitoring",
      description: "Developed an intelligent AQI monitoring system using advanced data science techniques. Analyzed multiple air quality parameters giving real time historical trends.",
      technologies: ["Python", "Data Science", "Visualization", "Real-time Analytics"],
      github: "https://github.com/Dadiya-Harsh/aqi-monitoring",
      type: "Data Science"
    },
  ];

  const ossContributions = [
    {
      title: "OpenMontage",
      description: "Contributed a critical fix to OpenMontage, a 50k+ star AGPL-3.0 agent framework, resolving a skill-loading bug caused by missing YAML frontmatter and casing mismatches that broke component resolution.",
      technologies: ["Python", "YAML", "Agent Frameworks"],
      github: "https://github.com/calesthio/OpenMontage/issues/192",
      type: "Open Source"
    }
  ];

  const ProjectCard = ({ project, index }: { project: any, index: number }) => (
    <motion.a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="block group bg-surface border border-border p-6 rounded-2xl hover:border-accent transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-bold tracking-widest text-textSecondary uppercase bg-elevated px-3 py-1 rounded-full">
          {project.type}
        </span>
        <svg className="w-5 h-5 text-textSecondary group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-textPrimary mb-3 group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-textSecondary leading-relaxed mb-6">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech: string, techIndex: number) => (
          <span
            key={techIndex}
            className="px-2.5 py-1 bg-elevated text-textSecondary rounded-full text-xs font-medium border border-border"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.a>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-24 py-12">
      {/* Header */}
      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-textPrimary mb-6 tracking-tight">
          Projects & Code
        </h1>
        <p className="text-lg text-textSecondary">
          A selection of personal projects, data science research, and open-source contributions.
          For proprietary production systems, see <a href="/about" className="text-accent hover:underline">my professional experience</a>.
        </p>
      </section>

      {/* Open Source */}
      <section>
        <h2 className="text-2xl font-bold text-textPrimary mb-8 border-b border-border pb-4">
          Open Source Contributions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ossContributions.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* Personal Projects */}
      <section>
        <h2 className="text-2xl font-bold text-textPrimary mb-8 border-b border-border pb-4">
          Personal Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="text-center py-12 border-t border-border">
        <h2 className="text-2xl font-bold text-textPrimary mb-4">Want to see more code?</h2>
        <a
          href="https://github.com/Dadiya-Harsh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-textPrimary text-page px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View GitHub Profile
        </a>
      </section>
    </div>
  );
};

export default Projects;