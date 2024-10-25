import Head from 'next/head';

export default function SEO({ title, description, canonical }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {/* Add other SEO tags as needed */}
    </Head>
  );
}