/**
 * Fetch and parse Beehiiv RSS feed at build time.
 * Returns an array of post objects sorted by date (newest first).
 */

const RSS_URL = 'https://rss.beehiiv.com/feeds/HcZc79eYmo.xml';

export async function fetchPosts() {
  const res = await fetch(RSS_URL);
  if (!res.ok) {
    console.error(`Beehiiv RSS fetch failed: ${res.status}`);
    return [];
  }

  const xml = await res.text();
  return parseItems(xml);
}

function parseItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = tag(block, 'title');
    items.push({
      title,
      slug: slugify(title),
      link: tag(block, 'link'),
      pubDate: tag(block, 'pubDate'),
      description: stripHtml(tag(block, 'description')).slice(0, 200),
      content: tag(block, 'content:encoded'),
      author: tag(block, 'dc:creator'),
      categories: allTags(block, 'category'),
      image: enclosureUrl(block),
    });
  }

  return items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
}

function tag(xml, name) {
  // Handle CDATA wrapped values
  const cdataRe = new RegExp(`<${name}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${name}>`);
  const cdataMatch = cdataRe.exec(xml);
  if (cdataMatch) return cdataMatch[1].trim();

  const re = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`);
  const m = re.exec(xml);
  return m ? m[1].trim() : '';
}

function allTags(xml, name) {
  const results = [];
  const re = new RegExp(`<${name}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${name}>|<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'g');
  let m;
  while ((m = re.exec(xml)) !== null) {
    results.push((m[1] || m[2]).trim());
  }
  return results;
}

function enclosureUrl(xml) {
  const m = /url="([^"]+)"/.exec(/<enclosure[^>]+>/.exec(xml)?.[0] || '');
  return m ? m[1] : '';
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#8203;/g, '').replace(/\s+/g, ' ').trim();
}

export function formatDate(dateStr, locale = 'hu') {
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale === 'hu' ? 'hu-HU' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
