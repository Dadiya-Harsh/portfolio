import { motion } from 'framer-motion';
import { AcademicCapIcon, SparklesIcon, TrophyIcon, CodeBracketIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

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
      title: 'Open Source Contributor — OpenMontage',
      issuer: 'calesthio/OpenMontage (50k+ stars, AGPL-3.0)',
      date: '2026',
      description: 'Fixed an agent skill-loading bug (missing YAML frontmatter, kebab/snake-case mismatch) that broke skill resolution — Issue #192.',
      icon: <GlobeAltIcon className="w-6 h-6" />,
      link: 'https://github.com/calesthio/OpenMontage/issues/192',
    },
    {
      title: 'Machine Learning Specialization',
      issuer: 'DeepLearning.AI & Coursera',
      date: '2024',
      description: 'Comprehensive specialization covering foundational and advanced machine learning concepts',
      icon: <AcademicCapIcon className="w-6 h-6" />,
      link: 'https://www.coursera.org/account/accomplishments/specialization/P6SUM2UJVZ9S',
    },
    {
      title: 'Code Unnati Innovation Marathon',
      issuer: 'SAP India & Edunet Foundation',
      date: '2024',
      description: 'Advanced AI/ML program with focus on innovative enterprise solutions',
      icon: <SparklesIcon className="w-6 h-6" />,
    },
    {
      title: 'SSIP Hackathon Participant',
      issuer: 'Gujarat State Innovation Program',
      date: '2023-2024',
      description: 'State-level hackathon focused on innovative technology solutions',
      icon: <TrophyIcon className="w-6 h-6" />,
    },
    {
      title: 'HackerRank Certified',
      issuer: 'HackerRank',
      date: '2023',
      description: 'Certified in Python Programming and Data Structures',
      icon: <CodeBracketIcon className="w-6 h-6" />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-12">
      <section className="text-center max-w-2xl mx-auto mb-16">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-textPrimary mb-6 tracking-tight">
          Achievements & Certifications
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-lg text-textSecondary">
          Milestones and recognitions in my professional journey
        </motion.p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {achievement.link ? (
              <a
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full group"
              >
                <div className="bg-surface border border-border p-6 rounded-2xl h-full shadow-sm hover:border-accent transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-elevated border border-border flex items-center justify-center text-textSecondary group-hover:text-accent group-hover:border-accent/30 transition-colors flex-shrink-0">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-textPrimary group-hover:text-accent transition-colors">
                        {achievement.title}
                      </h3>
                      <p className="text-sm font-medium text-textSecondary mt-1">
                        {achievement.issuer}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-textSecondary mb-4 leading-relaxed">
                    {achievement.description}
                  </p>
                  <p className="text-xs font-bold tracking-widest text-textSecondary uppercase">
                    {achievement.date}
                  </p>
                </div>
              </a>
            ) : (
              <div className="bg-surface border border-border p-6 rounded-2xl h-full shadow-sm transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-elevated border border-border flex items-center justify-center text-textSecondary flex-shrink-0">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-textPrimary">
                      {achievement.title}
                    </h3>
                    <p className="text-sm font-medium text-textSecondary mt-1">
                      {achievement.issuer}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-textSecondary mb-4 leading-relaxed">
                  {achievement.description}
                </p>
                <p className="text-xs font-bold tracking-widest text-textSecondary uppercase">
                  {achievement.date}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default Achievements;
