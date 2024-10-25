import { gql } from "@apollo/client";
import client from "../lib/apollo-client";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface PageData {
  title: string;
  content: string;
}

interface PageProps {
  pageData: PageData;
}

export default function Page({ pageData }: PageProps) {
  return (
    <Layout>
      <Header />
      <main>
        <h1>{pageData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
      </main>
      <Footer />
    </Layout>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query<{ pages: { nodes: { slug: string }[] } }>({
    query: gql`
      query GetAllPageSlugs {
        pages(first: 100) {
          nodes {
            slug
          }
        }
      }
    `,
  });

  const paths = data.pages.nodes.map((page) => ({
    params: { slug: page.slug },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { data } = await client.query<{ page: PageData }>({
    query: gql`
      query GetPageData($slug: ID!) {
        page(id: $slug, idType: URI) {
          title
          content
        }
      }
    `,
    variables: { slug: params.slug },
  });

  return {
    props: {
      pageData: data.page,
    },
    revalidate: 60,
  };
}
