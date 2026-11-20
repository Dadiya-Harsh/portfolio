import { motion } from 'framer-motion';
import { useMediumPosts } from '../hooks/useMediumPosts';
import type { MediumPost } from '../hooks/useMediumPosts';

// The first post whose link contains this gets the big featured card
const FEATURED_SLUG = 'model-context-protocol';

const ReadOnMedium = () => (
  <span className="inline-block mt-6 text-sm font-bold text-accent">Read on Medium ↗</span>
);

const PostMeta = ({ article, formatDate }: { article: MediumPost; formatDate: (d: string) => string }) => (
  <div className="flex flex-wrap items-center gap-2">
    <div className="flex items-center gap-2 text-textSecondary text-sm font-medium bg-elevated px-4 py-1.5 rounded-full border border-border">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      {formatDate(article.pubDate)}
    </div>
    {article.categories.slice(0, 3).map((category) => (
      <span
        key={category}
        className="px-3 py-1 bg-elevated text-textSecondary border border-border rounded-lg text-xs font-medium"
      >
        {category}
      </span>
    ))}
  </div>
);

const Blog = () => {
  const { posts: articles, loading, error } = useMediumPosts();

  const featured = articles.find((a) => a.link.includes(FEATURED_SLUG));
  const rest = articles.filter((a) => a !== featured);

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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <section className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-accent font-extrabold tracking-[0.2em] uppercase text-sm mb-4">Writing</p>
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold text-textPrimary tracking-tight mb-6">
          My Blog
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
          {featured && (
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              href={featured.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group bg-surface border-2 border-accent p-8 md:p-10 rounded-3xl shadow-sm transition-all duration-300"
            >
              <p className="text-accent font-extrabold tracking-[0.2em] uppercase text-xs mb-4">Featured</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-textPrimary group-hover:text-accent transition-colors tracking-tight mb-5">
                {featured.title}
              </h2>
              <PostMeta article={featured} formatDate={formatDate} />
              <ReadOnMedium />
            </motion.a>
          )}

          {rest.map((article, index) => (
            <motion.a
              key={article.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group bg-surface border border-border p-8 rounded-2xl shadow-sm hover:border-accent transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-textPrimary group-hover:text-accent transition-colors line-clamp-2 mb-4">
                {article.title}
              </h2>
              <PostMeta article={article} formatDate={formatDate} />
              <ReadOnMedium />
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
