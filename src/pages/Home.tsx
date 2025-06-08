import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Senior Software Engineer
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Specializing in React, TypeScript, and Cloud Technologies
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/projects"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Contact Me
          </Link>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Technical Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Frontend Development</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>React & TypeScript</li>
              <li>Next.js & Vite</li>
              <li>Tailwind CSS</li>
              <li>Material UI</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Cloud & DevOps</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>AWS Services</li>
              <li>Docker & Kubernetes</li>
              <li>CI/CD Pipelines</li>
              <li>Infrastructure as Code</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Backend & Database</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Node.js & Express</li>
              <li>MongoDB & PostgreSQL</li>
              <li>GraphQL & REST APIs</li>
              <li>Microservices Architecture</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Highlights */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Professional Experience
        </h2>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Senior Software Engineer</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Led development of enterprise-level applications using React, TypeScript, and cloud technologies.
              Implemented CI/CD pipelines and containerized applications using Docker and Kubernetes.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Full Stack Developer</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Developed and maintained web applications using React, Node.js, and MongoDB.
              Implemented responsive designs and optimized application performance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 