import { VercelRequest, VercelResponse } from '@vercel/node';

interface Article {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories: string[];
}

function parseRSSFeed(xml: string): Article[] {
  const items: Article[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let itemMatch;

  while ((itemMatch = itemRegex.exec(xml)) !== null) {
    const itemContent = itemMatch[1];

    const titleMatch = /<title[^>]*?>\s*([\s\S]*?)\s*<\/title>/.exec(itemContent);
    const linkMatch = /<link>([\s\S]*?)<\/link>/.exec(itemContent);
    const pubDateMatch = /<pubDate>([\s\S]*?)<\/pubDate>/.exec(itemContent);
    const descriptionMatch = /<description>([\s\S]*?)<\/description>/.exec(itemContent);
    const categoryMatches = itemContent.match(/<category[^>]*?>([\s\S]*?)<\/category>/g) || [];

    const cleanText = (str: string) => {
      if (!str) return '';
      let cleaned = str.trim();
      if (cleaned.startsWith('<![CDATA[')) {
        cleaned = cleaned.substring(9);
      }
      if (cleaned.endsWith(']]>')) {
        cleaned = cleaned.substring(0, cleaned.length - 3);
      }
      cleaned = cleaned
        .replace(/<[^>]*>/g, '')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .trim();
      return cleaned;
    };

    const title = cleanText(titleMatch ? titleMatch[1] : '');
    const link = cleanText(linkMatch ? linkMatch[1] : '');
    const pubDate = cleanText(pubDateMatch ? pubDateMatch[1] : '');
    const description = cleanText(descriptionMatch ? descriptionMatch[1] : '');

    const categories = categoryMatches
      .map((cat) => {
        const match = /<category[^>]*?>([\s\S]*?)<\/category>/.exec(cat);
        return match ? cleanText(match[1]) : '';
      })
      .filter((cat) => cat !== '');

    if (title && link) {
      items.push({
        title,
        link,
        pubDate,
        description: description.substring(0, 200) + (description.length > 200 ? '...' : ''),
        categories,
      });
    }
  }

  return items;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const feedUrl = 'https://medium.com/feed/@harshdadiya';
    const response = await fetch(feedUrl);

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch Medium feed' });
    }

    const xml = await response.text();
    const articles = parseRSSFeed(xml).slice(0, 6);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json({ articles });
  } catch (error) {
    console.error('Error fetching Medium feed:', error);
    return res.status(500).json({ error: 'Failed to fetch Medium feed' });
  }
}
