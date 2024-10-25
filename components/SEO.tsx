import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
}

export default function SEO({ title, description, canonical }: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {/* Add other SEO tags as needed */}
    </Head>
  );
}
