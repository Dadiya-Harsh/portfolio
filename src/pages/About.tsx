import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeIn } from '../utils/animations';

const About = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-12">
      {/* About Me / Summary Section */}
      <motion.section variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About Me</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          AI Engineer with 1.5+ years shipping production LLM systems in Python — real-time voice agents, MCP servers, multi-agent workflows, and RAG pipelines, running on FastAPI, PostgreSQL, and AWS. I own features end to end, from design through deployment and production debugging, and contribute to open source (OpenMontage, 50k+ stars).
        </p>
      </motion.section>

      {/* Professional Journey Section */}
      <motion.section variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Professional Journey</h2>
        <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }} className="space-y-6">
          
          {/* Associate AI Engineer */}
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Associate AI Engineer</h3>
                <p className="text-gray-500 dark:text-gray-400">Wappnet Systems Pvt. Ltd. | Gujarat, India</p>
              </div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 md:mt-1">June 2025 – Present</p>
            </div>
            <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-3">Promoted from AI/ML Intern after six months.</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Built a video generation system producing themed long-form videos (up to 45 minutes) for multiple YouTube channels, matching each channel's format and tone — in active real-world use.</li>
              <li>Built a real-time voice agent for customer support on the OpenAI Realtime API, streaming bidirectional audio between Twilio telephony and the model over FastAPI websockets.</li>
              <li>Built MCP servers exposing internal business systems as agent-callable tools, usable from any MCP client including Claude Code and Codex.</li>
              <li>Shipped multi-agent workflows with tool use and contextual reasoning across internal business functions, including automated research and reporting.</li>
              <li>Built RAG pipelines over 500+ enterprise documents using the OpenAI Agents SDK and Qdrant for internal search and knowledge retrieval.</li>
              <li>Built WhatsApp and web chat integrations for business sites, connecting customer conversations to internal systems.</li>
              <li>Design and deploy FastAPI + PostgreSQL services on AWS (Lambda, S3, RDS, IAM, Secrets Manager, CloudWatch); established reusable logging and monitoring patterns across services.</li>
            </ul>
          </motion.div>

          {/* AI/ML Intern */}
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI/ML Intern</h3>
                <p className="text-gray-500 dark:text-gray-400">Wappnet Systems Pvt. Ltd. | Gujarat, India</p>
              </div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 md:mt-1">January 2025 – June 2025</p>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Built a recommendation system in Python for an enterprise client application.</li>
              <li>Deployed applications on Oracle Cloud Infrastructure (OCI) and worked with Oracle Database as the backing data store.</li>
              <li>Worked alongside senior engineers on enterprise AI architecture, code review, and deployment workflows — progressing to production ownership within six months.</li>
            </ul>
          </motion.div>

          {/* Data Science & Machine Learning Intern */}
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Data Science & Machine Learning Intern</h3>
                <p className="text-gray-500 dark:text-gray-400">BrainyBeam Info-Tech Pvt. Ltd. | Gujarat, India</p>
              </div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 md:mt-1">June 2024 - July 2024</p>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Developed an intelligent Air Quality Index (AQI) monitoring system using advanced data science techniques.</li>
              <li>Analyzed multiple air quality parameters (PM2.5, PM10, O3, NO2, CO, SO2) from environmental monitoring stations.</li>
              <li>Created data visualization dashboards for real-time AQI tracking and historical trend analysis.</li>
            </ul>
          </motion.div>

        </motion.div>
      </motion.section>

      {/* Open Source Section */}
      <motion.section variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Open Source</h2>
        <motion.div variants={staggerItem} initial="initial" whileInView="animate" viewport={{ once: true }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                <a href="https://github.com/calesthio/OpenMontage" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
                  OpenMontage
                </a>
              </h3>
              <p className="text-gray-500 dark:text-gray-400">calesthio/OpenMontage · 50k+ stars · AGPL-3.0</p>
            </div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 md:mt-1">June 2026</p>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Fixed an agent skill-loading bug (missing YAML frontmatter, kebab/snake-case mismatch) that broke skill resolution in a system built on the framework —{' '}
            <a href="https://github.com/calesthio/OpenMontage/issues/192" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
              Issue #192
            </a>.
          </p>
        </motion.div>
      </motion.section>

      {/* Technical Skills Section */}
      <motion.section variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Technical Skills</h2>
        <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AI & Machine Learning</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• LLMs, Generative AI, Prompt Engineering, RAG Pipelines</li>
              <li>• OpenAI Agents SDK, OpenAI Realtime API, Model Context Protocol (MCP)</li>
              <li>• Multi-Agent Architectures, LangChain, Conversational & Voice AI</li>
              <li>• LLM Observability & Tracing (Langfuse, OpenTelemetry)</li>
              <li>• NumPy, Pandas, scikit-learn, PyTorch</li>
            </ul>
          </motion.div>

          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Backend & Data</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Python, SQL, FastAPI, Flask, REST APIs, WebSockets</li>
              <li>• PostgreSQL, MySQL, Oracle Database, SQLAlchemy</li>
              <li>• Vector Stores: Qdrant, Pinecone</li>
            </ul>
          </motion.div>

          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Cloud & Operations</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• AWS: Lambda, S3, RDS, IAM, Secrets Manager, CloudWatch</li>
              <li>• Oracle Cloud Infrastructure (OCI)</li>
              <li>• Docker, Git, GitHub, Linux, logging & monitoring</li>
            </ul>
          </motion.div>

          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Integrations</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Twilio, WhatsApp Business API</li>
              <li>• MCP client integrations (Claude Code, Codex)</li>
            </ul>
          </motion.div>

        </motion.div>
      </motion.section>

      {/* Core Competencies Section */}
      <motion.section variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Core Competencies</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300 text-sm">
            <div>• Agentic AI Systems</div>
            <div>• Multi-Agent Architectures</div>
            <div>• Model Context Protocol (MCP)</div>
            <div>• Large Language Models (LLMs)</div>
            <div>• RAG Pipelines & Vector Search</div>
            <div>• Real-Time Voice & Conversational AI</div>
            <div>• LLM Observability & Tracing</div>
            <div>• Cloud Architecture (AWS, OCI)</div>
            <div>• Backend & API Engineering</div>
            <div>• Enterprise Integrations (WhatsApp, Twilio)</div>
            <div>• Production Debugging & Ownership</div>
            <div>• Prompt Engineering</div>
          </div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Education</h2>
        <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }} className="space-y-4">
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Bachelor of Engineering - Information Technology</h3>
            <p className="text-gray-500 dark:text-gray-400">A D Patel Institute of Technology | 2021 - 2025</p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              CGPA: 8.14 / 10 - Focused on artificial intelligence, machine learning, and data science applications.
            </p>
          </motion.div>
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Minor Degree - Internet of Things</h3>
            <p className="text-gray-500 dark:text-gray-400">A D Patel Institute of Technology | 2022 - 2024</p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              CGPA: 7.56 / 10 - Specialized in IoT technologies and embedded systems integration.
            </p>
          </motion.div>
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Higher Secondary Education (Science)</h3>
            <p className="text-gray-500 dark:text-gray-400">Shree Swaminarayan English Medium School | 2019 - 2021</p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Percentage: 87.8%
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Certifications Section */}
      <motion.section variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Certifications & Achievements</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li>• <strong><a href="https://www.coursera.org/account/accomplishments/specialization/P6SUM2UJVZ9S" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Machine Learning Specialization by DeepLearning.AI</a></strong> - Specialization in Machine Learning</li>
            <li>• <strong>Code Unnati Innovation Marathon</strong> - SAP India & Edunet Foundation (Advanced AI/ML Program)</li>
            <li>• <strong>SSIP Hackathon Participant</strong> - Gujarat State Innovation Program</li>
            <li>• <strong>HackerRank Certified</strong> - Python Programming and Data Structures</li>
            <li>• Active contributor to open-source AI/ML projects on GitHub</li>
          </ul>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default About;
