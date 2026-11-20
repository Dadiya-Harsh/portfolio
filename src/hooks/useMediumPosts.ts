import { useEffect, useState } from 'react';

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  categories: string[];
}

interface ApiArticle {
  title: string;
  link: string;
  pubDate: string;
  categories?: string[];
}

// Module-level cache, same idea as caseStudyLoader. Home and Blog both call the hook,
// but only the first call hits /api/medium. The rest reuse the result (or the request in flight).
let cachedPosts: MediumPost[] | null = null;
let pendingRequest: Promise<MediumPost[]> | null = null;

const htmlEntities: Record<string, string> = {
  '&rsquo;': "'",
  '&lsquo;': "'",
  '&ldquo;': '"',
  '&rdquo;': '"',
  '&ndash;': '-',
  '&mdash;': '—',
  '&hellip;': '…',
  '&quot;': '"',
  '&apos;': "'",
  '&lt;': '<',
  '&gt;': '>',
  '&amp;': '&',
};

const cleanText = (str: string): string => {
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

  // Hex and decimal entities, e.g. &#x2019;
  cleaned = cleaned.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  cleaned = cleaned.replace(/&#([0-9]+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));

  // Named entities
  Object.entries(htmlEntities).forEach(([entity, char]) => {
    cleaned = cleaned.split(entity).join(char);
  });

  return cleaned.trim();
};

const loadMediumPosts = (): Promise<MediumPost[]> => {
  if (cachedPosts) return Promise.resolve(cachedPosts);

  if (!pendingRequest) {
    pendingRequest = fetch('/api/medium')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch Medium posts');
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data?.articles)) throw new Error('Unexpected Medium response');

        // Deduplicate by title so cross-posted articles don't show twice
        const seen = new Set<string>();
        const posts: MediumPost[] = [];
        (data.articles as ApiArticle[]).forEach((article) => {
          const title = cleanText(article.title);
          const key = title.toLowerCase();
          if (!title || seen.has(key)) return;
          seen.add(key);
          posts.push({
            title,
            link: article.link,
            pubDate: article.pubDate,
            categories: (article.categories ?? []).map(cleanText).filter(Boolean),
          });
        });

        cachedPosts = posts;
        return posts;
      })
      .finally(() => {
        // A failed request is not cached, so the next visit can try again
        pendingRequest = null;
      });
  }

  return pendingRequest;
};

export const useMediumPosts = () => {
  const [posts, setPosts] = useState<MediumPost[]>(cachedPosts ?? []);
  const [loading, setLoading] = useState(cachedPosts === null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadMediumPosts()
      .then((data) => {
        if (cancelled) return;
        setPosts(data);
        setError(false);
      })
      .catch((err) => {
        console.error('Error fetching Medium articles:', err);
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { posts, loading, error };
};
