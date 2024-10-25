import { gql } from "@apollo/client";

import client from "../lib/apollo-client";



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

      <h1>Velam Safaris</h1>

      {posts.map((post: Post) => (

        <div key={post.id}>

          <h2>{post.title}</h2>

          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />

        </div>

      ))}

    </div>

  );

}



export async function getStaticProps() {

  const { data } = await client.query<{ posts: { nodes: Post[] } }>({

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

}


