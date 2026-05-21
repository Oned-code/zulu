require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const Parser = require('rss-parser');
const parser = new Parser({
  customFields: {
    item: ['media:content', 'enclosure'],
  }
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const FEEDS = [
  { url: 'https://businesstech.co.za/news/feed/', source: 'BusinessTech', defaultCategory: 'business' },
  { url: 'https://techcentral.co.za/feed/', source: 'TechCentral', defaultCategory: 'technology' },
  { url: 'https://dailyinvestor.com/feed/', source: 'Daily Investor', defaultCategory: 'business' }
];

function stripHtml(html) {
  return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
}

function calculateReadTime(text) {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  return Math.ceil(noOfWords / wordsPerMinute);
}

function categorizeArticle(title, content, defaultCategory) {
  const text = (title + ' ' + content).toLowerCase();
  const titleLower = title.toLowerCase();
  
  // AI — check first, highest priority for tech news sites
  if (/\bai\b/.test(titleLower) || text.includes('artificial intelligence') || text.includes('machine learning') || text.includes('chatgpt') || text.includes('openai') || text.includes('deepmind') || /\bai (surge|policy|dream|grid|inference)\b/.test(text)) return 'ai';
  // Security — DDoS/cyber/extortion articles must not leak to other categories
  if (/\b(cybersecurity|cyber.?attack|hacking|data breach|surveillance|ddos|ransomware|extortion|hack|phishing)\b/.test(text)) return 'security';
  if (/\b(crime|police|theft|robbery|safety)\b/.test(titleLower)) return 'security';
  // Energy — specific energy terms only
  if (/\b(eskom|solar energy|load.?shedding|electricity|power grid|renewable|nuclear energy|energy crisis|kilowatt|megawatt|power station|power cut)\b/.test(text)) return 'energy';
  // Crypto — map to technology until DB constraint is updated
  if (/\b(crypto|bitcoin|blockchain|web3|ethereum|defi)\b/.test(text)) return 'technology';
  // Education — only match on strong education signals, not generic 'learning'
  if (/\b(school|university|universities|student|edtech|classroom|teacher|academic|campus|tuition|diploma|degree|curriculum)\b/.test(titleLower)) return 'education';
  if (/\b(education|online learning|e.?learning)\b/.test(text)) return 'education';
  // Property
  if (/\b(property|real estate|housing market|proptech|mortgage|homeowner|rental|tenant|estate)\b/.test(text)) return 'property';
  // Automotive
  if (/\b(vehicle|motor|car market|electric vehicle|ev charging|automobile|automotive)\b/.test(text)) return 'automotive';
  // Technology
  if (/\b(tech|digital|software|internet|app|startup|data centre|datacent|online|streaming)\b/.test(text)) return 'technology';
  // Business — broadest category, check last
  if (/\b(business|finance|economy|market|bank|investment|inflation|interest rate|gdp|revenue|profit|ceo|company|tax|sars|rand|budget)\b/.test(text)) return 'business';
  
  return defaultCategory;
}

// Stop words to filter out when extracting title keywords for image search
const STOP_WORDS = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','shall','can','need','dare','ought','used','its','it','this','that','these','those','i','me','my','we','our','you','your','he','him','his','she','her','they','them','their','what','which','who','whom','how','when','where','why','not','no','nor','as','if','then','than','too','very','just','about','above','after','again','all','also','am','any','because','before','below','between','both','each','few','further','here','into','more','most','other','out','over','own','same','so','some','such','up','down','off','only','now','new','south','african','africa','says','said']);

function extractKeywordsFromTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w))
    .slice(0, 3)
    .join(',');
}

function buildFallbackImageUrl(title, slug) {
  const keywords = extractKeywordsFromTitle(title);
  if (!keywords) return `https://picsum.photos/seed/${slug}/800/500`;
  // Use Unsplash source with contextual keywords from the title
  return `https://source.unsplash.com/800x500/?${encodeURIComponent(keywords)}`;
}

function createPlagiarismFreeContent(originalContent, sourceName, articleLink) {
  const plainText = stripHtml(originalContent);
  const sentences = plainText.match(/[^\.!\?]+[\.!\?]+/g) || [];
  
  if (sentences.length === 0) return '';

  const numSentences = sentences.length;
  let intro = '';
  let summaryPoints = '';
  
  // Use first 2-3 sentences as a solid introduction
  const introCount = Math.min(3, numSentences);
  for (let i = 0; i < introCount; i++) {
    intro += sentences[i].trim() + '. ';
  }
  
  // Use the next 5-8 sentences as detailed bullet points
  const pointsCount = Math.min(10, numSentences);
  for (let i = introCount; i < pointsCount; i++) {
    if (sentences[i] && sentences[i].trim().length > 15) {
      summaryPoints += `- ${sentences[i].trim()}.\n`;
    }
  }

  const bulletsSection = summaryPoints.length > 0 ? `\n\n### Key Takeaways:\n${summaryPoints}` : '';

  return `As originally reported by **${sourceName}**, here is an executive summary of this development:

${intro.trim()}${bulletsSection}

[Read the full original report here](${articleLink})
`;
}

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);
}

const cheerio = require('cheerio');

async function fetchArticlePage(url) {
  const result = { content: '', ogImage: '' };
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
      signal: AbortSignal.timeout(10000),
    });
    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract og:image — the editorial hero image the publication chose
    result.ogImage = $('meta[property="og:image"]').attr('content')
      || $('meta[name="twitter:image"]').attr('content')
      || $('meta[name="twitter:image:src"]').attr('content')
      || '';

    // Extract article body text
    let content = '';
    $('article p, .entry-content p, .post-content p, .article-content p, .article__body p, main p').each((i, el) => {
      const text = $(el).text().trim();
      if (text.length > 30) {
        content += text + ' ';
      }
    });
    result.content = content;
  } catch (err) {
    console.error(`  ↳ Could not fetch page ${url}: ${err.message}`);
  }
  return result;
}

async function scrapeAndPopulate() {
  try {
    console.log('Fetching live RSS feeds...');
    
    for (const feed of FEEDS) {
      try {
        console.log(`Parsing feed from ${feed.source}...`);
        const parsedFeed = await parser.parseURL(feed.url);
        
        let count = 0;
        for (const item of parsedFeed.items) {
          if (count >= 15) break;
          
          const title = item.title || 'Untitled';
          const link = item.link || '';
          
          // Fetch full article page — gets both body text and og:image in one request
          let pageData = { content: '', ogImage: '' };
          if (link) {
            pageData = await fetchArticlePage(link);
          }

          let originalContent = pageData.content;
          if (!originalContent || originalContent.length < 200) {
            originalContent = item.content || item.contentSnippet || '';
          }
          
          if (!originalContent) continue;

          const category = categorizeArticle(title, originalContent, feed.defaultCategory);
          const content = createPlagiarismFreeContent(originalContent, feed.source, link);
          
          let excerpt = stripHtml(originalContent).substring(0, 150) + '...';
          const slug = generateSlug(title);

          // Image priority: og:image > RSS enclosure > RSS media:content > inline img > keyword fallback
          let featured_image = pageData.ogImage;
          if (!featured_image && item.enclosure && item.enclosure.url) featured_image = item.enclosure.url;
          if (!featured_image && item['media:content'] && item['media:content'].$ && item['media:content'].$.url) featured_image = item['media:content'].$.url;
          if (!featured_image) {
            const imgMatch = (item.content || '').match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch && imgMatch[1]) featured_image = imgMatch[1];
          }
          if (!featured_image) featured_image = buildFallbackImageUrl(title, slug);

          const tags = [category, feed.source.toLowerCase().replace(/\s+/g, '')];
          const read_time = calculateReadTime(content);
          
          const { error } = await supabase.from('articles').upsert({
            title, 
            slug, 
            excerpt, 
            content, 
            category, 
            author: 'ContentAI', 
            featured_image, 
            tags, 
            read_time, 
            is_published: true,
            published_at: new Date().toISOString()
          }, { onConflict: 'slug' });
          
          if (error) {
            console.error(`Error inserting ${title}:`, error);
          } else {
            console.log(`Inserted: ${title} (${category})`);
          }
          count++;
        }
      } catch (feedErr) {
        console.error(`Failed to parse feed ${feed.url}:`, feedErr.message);
      }
    }

    console.log('Database population complete.');

    // Delete the 10 oldest articles to maintain a lean database
    const { data: oldArticles, error: fetchErr } = await supabase
      .from('articles')
      .select('id')
      .order('published_at', { ascending: true })
      .limit(10);

    if (fetchErr) {
      console.error('Error fetching old articles:', fetchErr);
    } else if (oldArticles && oldArticles.length > 0) {
      const idsToDelete = oldArticles.map(a => a.id);
      const { error: deleteErr } = await supabase
        .from('articles')
        .delete()
        .in('id', idsToDelete);
        
      if (deleteErr) {
        console.error('Error deleting old articles:', deleteErr);
      } else {
        console.log(`Successfully deleted ${idsToDelete.length} oldest articles to keep the database fresh.`);
      }
    }

  } catch (err) {
    console.error('Error in scrape process:', err);
  }
}

scrapeAndPopulate();
