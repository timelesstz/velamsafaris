import { GetStaticProps, GetStaticPaths } from 'next'
import { gql } from '@apollo/client'
import client from '../../lib/apollo-client'

interface Tour {
  title: string
  content: string
}

export default function Tour({ tour }: { tour: Tour }) {
  return (
    <div>
      <h1>{tour.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: tour.content }} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query GetTourSlugs {
        tours {
          nodes {
            slug
          }
        }
      }
    `,
  })

  const paths = data.tours.nodes.map((tour: { slug: string }) => ({
    params: { slug: tour.slug },
  }))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: gql`
      query GetTour($slug: ID!) {
        tour(id: $slug, idType: SLUG) {
          title
          content
        }
      }
    `,
    variables: { slug: params?.slug },
  })

  return {
    props: {
      tour: data.tour,
    },
    revalidate: 60, // Revalidate every 60 seconds
  }
}
