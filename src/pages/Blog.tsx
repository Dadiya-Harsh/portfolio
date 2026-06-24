import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

interface Article {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories: string[];
}

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/medium');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setArticles(data.articles);
      } catch (err) {
        console.error('Error fetching Medium articles:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const cleanText = (str: string) => {
    if (!str) return '';
    let cleaned = str.trim();
    
    // Strip CDATA if present
    if (cleaned.startsWith('<![CDATA[')) {
      cleaned = cleaned.substring(9);
    }
    if (cleaned.endsWith(']]>')) {
      cleaned = cleaned.substring(0, cleaned.length - 3);
    }
    
    // Strip any HTML tags that might remain
    cleaned = cleaned.replace(/<[^>]*>/g, '');
    
    // Decode common HTML entities
    const htmlEntities: { [key: string]: string } = {
      '&#x2019;': "'",
      '&#x2018;': "'",
      '&#x201c;': '"',
      '&#x201d;': '"',
      '&#x200a;': ' ',
      '&#x200A;': ' ',
      '&#x2014;': '—',
      '&#x2026;': '…',
      '&rsquo;': "'",
      '&lsquo;': "'",
      '&ldquo;': '"',
      '&rdquo;': '"',
      '&ndash;': '-',
      '&mdash;': '—',
      '&hellip;': '…',
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&apos;': "'",
    };

    // Replace hex/decimal code entities
    cleaned = cleaned.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
    cleaned = cleaned.replace(/&#([0-9]+);/g, (_, dec) => {
      return String.fromCharCode(parseInt(dec, 10));
    });

    // Replace named entities
    Object.keys(htmlEntities).forEach((entity) => {
      cleaned = cleaned.replace(new RegExp(entity, 'g'), htmlEntities[entity]);
    });

    return cleaned.trim();
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Writing
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-12 text-lg">
        Articles on AI, Machine Learning & Data Science
      </p>

      {loading ? (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-6"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-48 animate-pulse"
            >
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-3"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            </motion.div>
          ))}
        </motion.div>
      ) : error ? (
        <motion.div {...fadeInUp} className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Unable to load articles at the moment.
          </p>
          <a
            href="https://medium.com/@harshdadiya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View on Medium
          </a>
        </motion.div>
      ) : articles.length > 0 ? (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6"
        >
          {articles.map((article, index) => (
            <motion.a
              key={index}
              variants={staggerItem}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {cleanText(article.title)}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {formatDate(article.pubDate)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed font-normal">
                    {cleanText(article.description)}
                  </p>
                  {article.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.categories.slice(0, 3).map((category, catIndex) => (
                        <span
                          key={catIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs"
                        >
                          {cleanText(category)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      ) : (
        <motion.div {...fadeInUp} className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            No articles found. Check back soon!
          </p>
          <a
            href="https://medium.com/@harshdadiya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Follow on Medium
          </a>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Blog;
