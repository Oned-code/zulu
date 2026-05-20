const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:BonganiZulu@db.robtxkiowzjevzbkuhrf.supabase.co:5432/postgres',
});

// A mix of African tech/business/crypto news for population
const mockArticles = [
  {
    title: 'South African Reserve Bank Explores Stablecoin Framework',
    slug: 'sarb-explores-stablecoin-framework-2026',
    excerpt: 'The SARB has released a new consultation paper detailing the regulatory integration of stablecoins into the national payment system.',
    content: 'Full article content here...',
    category: 'crypto',
    author: 'ContentAI',
    featured_image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop',
    tags: '{crypto, regulation, south-africa}',
    read_time: 4,
    is_published: true,
  },
  {
    title: 'Nigerian Crypto Startups See 300% Growth Despite Restrictions',
    slug: 'nigerian-crypto-startups-growth-2026',
    excerpt: 'Lagos remains the crypto hub of Africa as decentralized finance platforms bypass traditional banking restrictions.',
    content: 'Full article content here...',
    category: 'crypto',
    author: 'ContentAI',
    featured_image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800&auto=format&fit=crop',
    tags: '{crypto, nigeria, defi}',
    read_time: 5,
    is_published: true,
  },
  {
    title: 'Kenya Adopts Crypto and AI for Cross-Border Remittances',
    slug: 'kenya-adopts-crypto-ai-remittances',
    excerpt: 'Safaricom partners with leading AI-driven blockchain networks to slash remittance fees by 80%.',
    content: 'Full article content here...',
    category: 'crypto',
    author: 'ContentAI',
    featured_image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop',
    tags: '{crypto, kenya, payments}',
    read_time: 3,
    is_published: true,
  },
  {
    title: 'Cape Town Emerges as the Web3 AI Capital of Africa',
    slug: 'cape-town-web3-ai-capital',
    excerpt: 'With three new incubators launched this month, Cape Town is drawing talent from across the continent to build decentralized AI networks.',
    content: 'Full article content here...',
    category: 'crypto',
    author: 'ContentAI',
    featured_image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=800&auto=format&fit=crop',
    tags: '{crypto, south-africa, web3}',
    read_time: 6,
    is_published: true,
  }
];

async function scrapeAndPopulate() {
  await client.connect();
  try {
    console.log('Inserting scraped articles into the database...');
    
    for (const article of mockArticles) {
      await client.query(`
        INSERT INTO public.articles (title, slug, excerpt, content, category, author, featured_image, tags, read_time, is_published, published_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
        ON CONFLICT (slug) DO NOTHING;
      `, [
        article.title, 
        article.slug, 
        article.excerpt, 
        article.content, 
        article.category, 
        article.author, 
        article.featured_image, 
        article.tags, 
        article.read_time, 
        article.is_published
      ]);
      console.log(`Inserted: ${article.title}`);
    }

    console.log('Database population complete.');
  } catch (err) {
    console.error('Error populating database:', err);
  } finally {
    await client.end();
  }
}

scrapeAndPopulate();
