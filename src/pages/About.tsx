import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeIn } from '../utils/animations';

const About = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-12">
      {/* About Me / Summary Section */}
      <motion.section variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About Me</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          AI Engineer with hands-on experience designing, deploying, and scaling enterprise AI systems, multi-agent architectures, cloud-native applications, and workflow automation platforms. Specialized in building production-grade AI solutions leveraging large language models, agent frameworks, MCP-based integrations, retrieval systems, and real-time conversational AI. Proven expertise in Anthropic-managed agents, Agent SDKs, AI workflow orchestration, and enterprise-grade automation that improves operational efficiency and business productivity.
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
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Designed and deployed production-grade AI systems leveraging Anthropic and OpenAI ecosystems, enabling intelligent automation across multiple business functions.</li>
              <li>Architected multi-agent workflows capable of autonomous task execution, contextual reasoning, tool usage, and enterprise system interactions.</li>
              <li>Developed scalable cloud-native AI services using FastAPI and PostgreSQL, deployed on AWS infrastructure including IAM, Secrets Manager, Lambda, S3, RDS, and CloudWatch.</li>
              <li>Built and maintained MCP-based integrations connecting AI agents with enterprise applications and internal business systems.</li>
              <li>Led development of enterprise knowledge management and retrieval systems supporting intelligent search and decision-making.</li>
              <li>Designed real-time conversational AI platforms supporting voice, chat, and omnichannel customer interactions.</li>
              <li>Established reusable AI service frameworks along with observability and monitoring practices to streamline deployment and maintain production reliability.</li>
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
              <li>Gained hands-on experience in machine learning and deep learning applications.</li>
              <li>Contributed to development of AI-driven solutions and learned production-level implementation.</li>
              <li>Worked closely with senior engineers to understand enterprise AI architecture and best practices.</li>
              <li>Demonstrated strong technical skills and problem-solving ability, leading to promotion to Associate AI Engineer.</li>
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

      {/* Technical Skills Section */}
      <motion.section variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Technical Skills</h2>
        <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AI & LLM</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Anthropic Claude, Claude Sonnet 4.6, Opus 4.x models, GPT-4, GPT Realtime Models</li>
              <li>• Agent SDKs, Multi-Agent Systems, Function Calling, Tool Use Architectures</li>
              <li>• RAG Pipelines, Prompt Engineering, Semantic Search, Vector Search</li>
            </ul>
          </motion.div>

          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Cloud & Infra</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• AWS: EC2, Lambda, API Gateway, RDS (PostgreSQL), DynamoDB, S3, CloudWatch, SQS</li>
              <li>• Secrets Manager, IAM, VPC Architecture, CI/CD Pipelines, Containerized Deployments</li>
            </ul>
          </motion.div>

          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Backend Development</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Python, FastAPI, Django, PostgreSQL, REST APIs</li>
              <li>• WebSockets, Async Programming, Microservices & API Design</li>
            </ul>
          </motion.div>

          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Integrations & Frameworks</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Slack, Jira, Notion, Google Workspace (Calendar, Gmail)</li>
              <li>• Microsoft Graph / Outlook, Twilio, MCP Servers, OAuth</li>
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
            <div>• Anthropic Claude Managed Agents</div>
            <div>• Claude Agent SDK</div>
            <div>• Model Context Protocol (MCP)</div>
            <div>• Enterprise AI Automation</div>
            <div>• AI Workflow Orchestration</div>
            <div>• Large Language Models (LLMs)</div>
            <div>• RAG Pipelines</div>
            <div>• Conversational AI</div>
            <div>• Real-Time Voice Agents</div>
            <div>• Cloud Architecture (AWS, Bedrock)</div>
            <div>• Microservices & API Design</div>
            <div>• Enterprise Integrations</div>
            <div>• Knowledge Management</div>
            <div>• Semantic & Vector Search</div>
            <div>• AI Platform Engineering</div>
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
