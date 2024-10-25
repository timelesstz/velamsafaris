import { gql } from "@apollo/client";
import client from "../lib/apollo-client";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({ posts, pageData }) {
  return (
    <Layout>
      <Header />
      <main>
        <h1>{pageData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
        {/* Add other components as needed to match your current design */}
      </main>
      <Footer />
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query GetHomePageData {
        pageBy(uri: "/") {
          title
          content
        }
        posts(first: 3) {
          nodes {
            id
            title
            excerpt
          }
        }
      }
    `,
  });

  return {
    props: {
      pageData: data.pageBy,
      posts: data.posts.nodes,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}