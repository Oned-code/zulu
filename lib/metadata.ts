import type { Metadata } from 'next';

export function generateMetadata({
  title,
  description,
  image = '/og-image.png',
  url = 'https://zulufun.io',
  type = 'website',
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}): Metadata {
  return {
    title: `${title} | ZuluFun.io`,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'ZuluFun.io',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

// Default OG image generation config (placeholder for now)
export const DEFAULT_OG_IMAGE = {
  width: 1200,
  height: 630,
  backgroundColor: '#1B1B3A', // Zulu indigo
  foregroundColor: '#F4B740', // African gold
};

// Structured data (Schema.org) generator for articles and products
export function generateArticleSchema({
  title,
  description,
  author,
  datePublished,
  image,
  publisherName = 'ZuluFun.io',
  publisherLogo = '/logo.png',
}: {
  title: string;
  description: string;
  author: string;
  datePublished: string; // ISO date string
  image: string;
  publisherName?: string;
  publisherLogo?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo,
      },
    },
    datePublished,
  };
}

export function generateProductSchema({
  name,
  description,
  image,
  brand = 'ZuluFun.io',
  sku,
  offers,
}: {
  name: string;
  description: string;
  image: string;
  brand?: string;
  sku: string;
  offers: {
    price: number;
    priceCurrency: 'ZAR' | 'USD';
    availability: 'https://schema.org/InStock' | 'https://schema.org/OutOfStock';
    url: string;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    brand,
    sku,
    offers,
  };
}