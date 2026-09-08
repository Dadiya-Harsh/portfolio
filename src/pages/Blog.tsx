import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
        // Deduplicate by title to prevent cross-posted articles showing twice
        const seen = new Set<string>();
        const unique = (data.articles as Article[]).filter((a) => {
          const key = cleanText(a.title).toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        setArticles(unique);
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
    <div className="max-w-4xl mx-auto py-12">
      <section className="text-center max-w-2xl mx-auto mb-16">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-textPrimary mb-6 tracking-tight">
          Writing
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-lg text-textSecondary">
          Articles on AI, Machine Learning & Data Science
        </motion.p>
      </section>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-surface border border-border p-8 rounded-2xl h-48 overflow-hidden relative"
            >
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="h-3 bg-elevated rounded-full w-1/5 mb-5" />
              <div className="h-6 bg-elevated rounded-full w-3/4 mb-6" />
              <div className="h-3 bg-elevated rounded-full w-full mb-3" />
              <div className="h-3 bg-elevated rounded-full w-5/6" />
            </div>
          ))}
        </div>
      ) : error ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <p className="text-textSecondary mb-6">
            Unable to load articles at the moment.
          </p>
          <a
            href="https://medium.com/@harshdadiya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-textPrimary text-page px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            View on Medium
          </a>
        </motion.div>
      ) : articles.length > 0 ? (
        <div className="space-y-6">
          {articles.map((article, index) => (
            <motion.a
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group bg-surface border border-border p-8 rounded-2xl shadow-sm hover:border-accent transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold text-textPrimary group-hover:text-accent transition-colors flex-1 line-clamp-1">
                  {cleanText(article.title)}
                </h2>
                <div className="flex items-center gap-2 text-textSecondary text-sm shrink-0 font-medium bg-elevated px-4 py-1.5 rounded-full border border-border">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {formatDate(article.pubDate)}
                </div>
              </div>

              <p className="text-textSecondary mb-6 leading-relaxed line-clamp-2 md:line-clamp-3">
                {cleanText(article.description)}
              </p>

              {article.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.categories.slice(0, 3).map((category, catIndex) => (
                    <span
                      key={catIndex}
                      className="px-3 py-1 bg-elevated text-textSecondary border border-border rounded-lg text-xs font-medium"
                    >
                      {cleanText(category)}
                    </span>
                  ))}
                </div>
              )}
            </motion.a>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <p className="text-textSecondary mb-6">
            No articles found. Check back soon!
          </p>
          <a
            href="https://medium.com/@harshdadiya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-textPrimary text-page px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            Follow on Medium
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default Blog;
