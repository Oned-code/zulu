import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { Article } from '@/types/index';

export async function getPublishedArticles(): Promise<Article[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error.message);
    return [];
  }

  return (data || []).map((article) => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt || '',
    content: article.content || '',
    category: article.category as Article['category'],
    author: article.author || 'ZuluFun Staff',
    publishedAt: article.published_at,
    featuredImage: article.featured_image || '',
    tags: article.tags || [],
    readTime: article.read_time || 3,
    isSponsored: article.is_sponsored || false,
  }));
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .eq('category', category)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles by category:', error.message);
    return [];
  }

  return (data || []).map((article) => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt || '',
    content: article.content || '',
    category: article.category as Article['category'],
    author: article.author || 'ZuluFun Staff',
    publishedAt: article.published_at,
    featuredImage: article.featured_image || '',
    tags: article.tags || [],
    readTime: article.read_time || 3,
    isSponsored: article.is_sponsored || false,
  }));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching article:', error.message);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || '',
    content: data.content || '',
    category: data.category as Article['category'],
    author: data.author || 'ZuluFun Staff',
    publishedAt: data.published_at,
    featuredImage: data.featured_image || '',
    tags: data.tags || [],
    readTime: data.read_time || 3,
    isSponsored: data.is_sponsored || false,
  };
}
