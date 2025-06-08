import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About Me</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          I am a Senior Software Engineer with extensive experience in developing enterprise-level applications
          using modern web technologies. My expertise lies in building scalable, maintainable, and
          high-performance applications using React, TypeScript, and cloud technologies.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Professional Journey</h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Senior Software Engineer</h3>
            <p className="text-gray-500 dark:text-gray-400">2020 - Present</p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Led development of enterprise-level applications using React and TypeScript</li>
              <li>Implemented CI/CD pipelines and containerized applications using Docker and Kubernetes</li>
              <li>Architected and developed microservices using Node.js and Express</li>
              <li>Optimized application performance and implemented best practices</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Full Stack Developer</h3>
            <p className="text-gray-500 dark:text-gray-400">2018 - 2020</p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Developed and maintained web applications using React and Node.js</li>
              <li>Implemented responsive designs and optimized application performance</li>
              <li>Worked with MongoDB and PostgreSQL databases</li>
              <li>Collaborated with cross-functional teams to deliver high-quality solutions</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Frontend</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>React & TypeScript</li>
              <li>Next.js & Vite</li>
              <li>Tailwind CSS & Material UI</li>
              <li>Redux & Context API</li>
              <li>Jest & React Testing Library</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Backend & DevOps</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Node.js & Express</li>
              <li>MongoDB & PostgreSQL</li>
              <li>AWS Services</li>
              <li>Docker & Kubernetes</li>
              <li>CI/CD & Git</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Education</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Bachelor's Degree in Computer Science</h3>
          <p className="text-gray-500 dark:text-gray-400">2014 - 2018</p>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Focused on software engineering, algorithms, and data structures.
            Participated in various hackathons and coding competitions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About; 