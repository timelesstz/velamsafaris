import Image from 'next/image'

interface Tour {
  featuredImage: {
    sourceUrl: string;
  };
  title: string;
  excerpt: string;
}

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <div className="card">
      <Image
        src={tour.featuredImage.sourceUrl}
        alt={tour.title}
        width={300}
        height={200}
        layout="responsive"
      />
      <h2>{tour.title}</h2>
      <p>{tour.excerpt}</p>
    </div>
  )
}
