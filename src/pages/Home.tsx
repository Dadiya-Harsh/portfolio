import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <div className="w-40 h-40 rounded-full mx-auto mb-8 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          {/* Your Image Here */}
          <img src="/images/profile.jpg" alt="Harsh Dadiya" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          AI/ML Engineer & Data Scientist
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Passionate about building intelligent systems with Machine Learning, Deep Learning, and Natural Language Processing
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
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AI/ML & Data Science</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Python, TensorFlow, PyTorch</li>
              <li>Scikit-learn, NumPy, Pandas</li>
              <li>LangChain, Hugging Face</li>
              <li>Vector Databases (Pinecone)</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Programming & Development</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Python, R, Java, JavaScript</li>
              <li>Flask, SQL Alchemy</li>
              <li>PostgreSQL, MySQL</li>
              <li>Git, GitHub</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AI Specializations</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Natural Language Processing</li>
              <li>Computer Vision</li>
              <li>Predictive Analytics</li>
              <li>Neural Networks</li>
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
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI/ML Intern - Wappnet Systems Pvt. Ltd.</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">January 2025 - Present</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Currently undergoing comprehensive AI/ML training and learning advanced machine learning techniques 
              for enterprise-level AI implementation strategies.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Data Science & ML Intern - BrainyBeam Info-Tech</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">June 2024 - July 2024</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Developed an intelligent Air Quality Index (AQI) monitoring system using advanced data science techniques 
              and created data visualization dashboards for real-time AQI tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Education
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Bachelor of Engineering - Information Technology</h3>
            <p className="text-gray-500 dark:text-gray-400">A D Patel Institute of Technology | 2021 - 2025</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">CGPA: 8.14</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Minor Degree - Internet of Things</h3>
            <p className="text-gray-500 dark:text-gray-400">A D Patel Institute of Technology | 2022 - 2024</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">CGPA: 7.56</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;