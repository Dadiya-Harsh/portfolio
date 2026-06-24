import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../utils/animations';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.8 } }} className="text-center py-20">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { duration: 0.6 } }} className="w-40 h-40 rounded-full mx-auto mb-8 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          {/* Your Image Here */}
          <img src="/images/profile.jpg" alt="Harsh Dadiya" className="w-full h-full object-cover" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } }} className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          AI Engineer & Data Scientist
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } }} className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          AI Engineer with hands-on experience designing, deploying, and scaling enterprise AI systems, multi-agent architectures, and workflow automation platforms.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.6 } }} className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/projects"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Projects
          </Link>
          <Link
            to="/resume"
            className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            View Resume
          </Link>
          <Link
            to="/contact"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Contact Me
          </Link>
        </motion.div>
      </motion.section>

      {/* Skills Section */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Technical Expertise
        </h2>
        <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AI/ML & Data Science</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Python, TensorFlow, PyTorch</li>
              <li>Scikit-learn, NumPy, Pandas</li>
              <li>LangChain, Hugging Face</li>
              <li>Vector Databases (Pinecone)</li>
            </ul>
          </motion.div>
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Programming & Development</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Python, R, Java, JavaScript</li>
              <li>Flask, SQL Alchemy</li>
              <li>PostgreSQL, MySQL</li>
              <li>Git, GitHub</li>
            </ul>
          </motion.div>
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AI Specializations</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Natural Language Processing</li>
              <li>Computer Vision</li>
              <li>Predictive Analytics</li>
              <li>Neural Networks</li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Experience Highlights */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Professional Experience
        </h2>
        <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} className="max-w-4xl mx-auto space-y-8">
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Associate AI Engineer - Wappnet Systems Pvt. Ltd.</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">June 2025 - Present</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Designed and deployed production-grade AI systems, multi-agent workflows, and cloud-native AI services using FastAPI, PostgreSQL, and AWS infrastructure.
            </p>
          </motion.div>
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI/ML Intern - Wappnet Systems Pvt. Ltd.</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">January 2025 - June 2025</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Gained hands-on experience in machine learning/deep learning applications and contributed to development of AI-driven enterprise solutions.
            </p>
          </motion.div>
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Data Science & ML Intern - BrainyBeam Info-Tech</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">June 2024 - July 2024</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Developed an intelligent Air Quality Index (AQI) monitoring system using advanced data science techniques and created data visualization dashboards.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Education Section */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Education
        </h2>
        <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} className="max-w-4xl mx-auto space-y-6">
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Bachelor of Engineering - Information Technology</h3>
            <p className="text-gray-500 dark:text-gray-400">A D Patel Institute of Technology | 2021 - 2025</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">CGPA: 8.14 / 10</p>
          </motion.div>
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Minor Degree - Internet of Things</h3>
            <p className="text-gray-500 dark:text-gray-400">A D Patel Institute of Technology | 2022 - 2024</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">CGPA: 7.56 / 10</p>
          </motion.div>
          <motion.div variants={staggerItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Higher Secondary Education (Science)</h3>
            <p className="text-gray-500 dark:text-gray-400">Shree Swaminarayan English Medium School | 2019 - 2021</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Percentage: 87.8%</p>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;