import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: "Cure Now - Intelligent Medical Chatbot",
      description: "An AI-powered medical chatbot leveraging Google's Gemini AI for accurate health information delivery. Features vector similarity search using Pinecone for efficient medical knowledge base retrieval and advanced natural language processing.",
      technologies: ["Python", "Flask", "Google Gemini AI", "LangChain", "Pinecone", "Hugging Face"],
      image: "/projects/medical-chatbot.jpg",
      github: "https://github.com/Dadiya-Harsh/cure-now/",
      demo: "#"
    },
    {
      title: "SQL Agent Tool - Natural Language to SQL Converter",
      description: "Built intelligent SQL query agent that converts natural language queries into executable SQL statements. Integrated multiple LLM providers and implemented robust database schema reflection with safe query execution.",
      technologies: ["Python", "SQLAlchemy", "Multiple LLM APIs", "PostgreSQL", "Groq", "OpenAI"],
      image: "/projects/sql-agent.jpg",
      github: "https://github.com/Dadiya-Harsh/sql-tool/",
      demo: "#"
    },
    {
      title: "Model Context Protocol (MCP) Implementation",
      description: "Implemented comprehensive Model Context Protocol for seamless LLM communication. Developed multiple transport layers and created various server implementations with asynchronous support and interactive interfaces.",
      technologies: ["Python", "Async Programming", "Transport Layers", "LLM Integration", "CLI Tools"],
      image: "/projects/mcp-protocol.jpg",
      github: "https://github.com/Dadiya-Harsh/MCP-DEMO/",
      demo: "#"
    },
    {
      title: "Air Quality Index (AQI) Monitoring System",
      description: "Developed an intelligent AQI monitoring system using advanced data science techniques. Analyzed multiple air quality parameters and created real-time visualization dashboards for environmental monitoring.",
      technologies: ["Python", "Data Science", "Visualization", "Environmental Monitoring", "Real-time Analytics"],
      image: "/projects/aqi-monitoring.jpg",
      github: "https://github.com/Dadiya-Harsh/aqi-monitoring",
      demo: "#"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
        AI/ML Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700">
              <div className="w-full h-full flex items-center justify-center text-white text-lg font-semibold">
                {project.title.split(' ')[0]} {project.title.split(' ')[1]}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Want to see more?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Check out my GitHub profile for more AI/ML projects and open-source contributions.
        </p>
        <a
          href="https://github.com/Dadiya-Harsh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default Projects;