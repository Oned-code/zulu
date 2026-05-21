require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function fixConstraint() {
  // We can't run DDL through anon key, so instead we'll just map 'crypto' -> 'technology' in the scraper
  // Let's verify what categories currently exist
  const { data, error } = await supabase
    .from('articles')
    .select('category')
    .limit(100);

  if (error) {
    console.error('Error:', error);
    return;
  }

  const categories = [...new Set(data.map(a => a.category))];
  console.log('Current categories in DB:', categories);
}

fixConstraint();
