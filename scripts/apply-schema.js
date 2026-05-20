const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:BonganiZulu@db.robtxkiowzjevzbkuhrf.supabase.co:5432/postgres',
});

async function apply() {
  await client.connect();
  try {
    console.log('Dropping old constraints...');
    await client.query(`
      ALTER TABLE public.businesses DROP CONSTRAINT IF EXISTS businesses_niche_check;
      ALTER TABLE public.quotes DROP CONSTRAINT IF EXISTS quotes_niche_check;
      ALTER TABLE public.articles DROP CONSTRAINT IF EXISTS articles_category_check;
    `);

    console.log('Adding new constraints...');
    await client.query(`
      ALTER TABLE public.businesses ADD CONSTRAINT businesses_niche_check CHECK (niche IN ('power', 'security', 'real_estate', 'automotive', 'education', 'crypto'));
      ALTER TABLE public.quotes ADD CONSTRAINT quotes_niche_check CHECK (niche IN ('power', 'security', 'real_estate', 'automotive', 'education', 'crypto'));
      ALTER TABLE public.articles ADD CONSTRAINT articles_category_check CHECK (category IN ('ai', 'energy', 'security', 'property', 'automotive', 'education', 'business', 'technology', 'crypto'));
    `);

    console.log('Schema updated successfully.');
  } catch (err) {
    console.error('Error applying schema changes:', err);
  } finally {
    await client.end();
  }
}

apply();
