import Image from 'next/image';

export default function OptimizedImage({ src, alt, width, height }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      layout="responsive"
      loading="lazy"
    />
  );
}