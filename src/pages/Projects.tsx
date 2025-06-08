import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: "Enterprise E-commerce Platform",
      description: "A scalable e-commerce platform built with React, TypeScript, and Node.js. Features include real-time inventory management, payment processing, and analytics dashboard.",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB", "AWS"],
      image: "/projects/ecommerce.jpg"
    },
    {
      title: "Cloud-Based Task Management System",
      description: "A collaborative task management system with real-time updates, team collaboration features, and automated task assignment.",
      technologies: ["React", "GraphQL", "Docker", "Kubernetes", "PostgreSQL"],
      image: "/projects/task-management.jpg"
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description: "An analytics dashboard that uses machine learning to provide insights and predictions based on user data.",
      technologies: ["React", "Python", "TensorFlow", "AWS Lambda", "DynamoDB"],
      image: "/projects/analytics.jpg"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
        Featured Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <div className="h-48 bg-gray-200 dark:bg-gray-700">
              {/* Add project image here */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Project Image
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Want to see more?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Check out my GitHub profile for more projects and contributions.
        </p>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          View GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default Projects; 