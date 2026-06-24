import { motion } from 'framer-motion';
import { AcademicCapIcon, SparklesIcon, TrophyIcon, CodeBracketIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
}

const Achievements = () => {
  const achievements: Achievement[] = [
    {
      title: 'Machine Learning Specialization',
      issuer: 'DeepLearning.AI & Coursera',
      date: '2024',
      description: 'Comprehensive specialization covering foundational and advanced machine learning concepts',
      icon: <AcademicCapIcon className="w-8 h-8" />,
      link: 'https://www.coursera.org/account/accomplishments/specialization/P6SUM2UJVZ9S',
    },
    {
      title: 'Code Unnati Innovation Marathon',
      issuer: 'SAP India & Edunet Foundation',
      date: '2024',
      description: 'Advanced AI/ML program with focus on innovative enterprise solutions',
      icon: <SparklesIcon className="w-8 h-8" />,
    },
    {
      title: 'SSIP Hackathon Participant',
      issuer: 'Gujarat State Innovation Program',
      date: '2023-2024',
      description: 'State-level hackathon focused on innovative technology solutions',
      icon: <TrophyIcon className="w-8 h-8" />,
    },
    {
      title: 'HackerRank Certified',
      issuer: 'HackerRank',
      date: '2023',
      description: 'Certified in Python Programming and Data Structures',
      icon: <CodeBracketIcon className="w-8 h-8" />,
    },
    {
      title: 'Open Source Contributions',
      issuer: 'GitHub',
      date: 'Ongoing',
      description: 'Active contributor to multiple AI/ML open-source projects',
      icon: <GlobeAltIcon className="w-8 h-8" />,
      link: 'https://github.com/Dadiya-Harsh',
    },
  ];

  return (
    <motion.div {...fadeInUp} className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Achievements & Certifications
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-12 text-lg">
        Milestones and recognitions in my professional journey
      </p>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
      >
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className="group"
          >
            {achievement.link ? (
              <a
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full hover:shadow-xl transition-shadow hover:scale-105 transform duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-blue-600 dark:text-blue-400 flex-shrink-0">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {achievement.issuer}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {achievement.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {achievement.date}
                  </p>
                </div>
              </a>
            ) : (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full hover:shadow-xl transition-shadow hover:scale-105 transform duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-blue-600 dark:text-blue-400 flex-shrink-0">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {achievement.issuer}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {achievement.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {achievement.date}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 p-8 rounded-lg text-white text-center"
      >
        <h2 className="text-2xl font-bold mb-3">Always Learning & Growing</h2>
        <p className="mb-6">
          Continuously pursuing new certifications and improving skills in AI/ML and data science
        </p>
        <a
          href="https://www.coursera.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          View Learning Path
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Achievements;
