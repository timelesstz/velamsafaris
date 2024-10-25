import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative h-[50vh]">
      <Image
        src="/hero-image.jpg"
        alt="Velam Safaris Hero"
        layout="fill"
        objectFit="cover"
        priority
      />
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white font-bold">
        Welcome to Velam Safaris
      </h1>
    </div>
  )
}