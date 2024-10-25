import { gql } from "@apollo/client";
import client from "../lib/apollo-client";
import Head from 'next/head';

interface Post {
  id: string;
  title: string;
  excerpt: string;
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <div>
      <Head>
        <title>Velam Safaris</title>
        <meta name="description" content="Explore the adventures with Velam Safaris" />
      </Head>
      <h1>Velam Safaris</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  try {
    const { data } = await client.query({
      query: gql`
        query GetPosts {
          posts {
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
        posts: data.posts.nodes,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
}
