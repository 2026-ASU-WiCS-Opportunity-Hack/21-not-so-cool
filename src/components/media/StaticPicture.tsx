type StaticPictureProps = {
  alt: string;
  width: number;
  height: number;
  fallbackSrc: string;
  sources: Array<{
    srcSet: string;
    type: string;
  }>;
  className?: string;
  loading?: "eager" | "lazy";
};

export function StaticPicture({
  alt,
  width,
  height,
  fallbackSrc,
  sources,
  className,
  loading = "lazy",
}: StaticPictureProps) {
  return (
    <picture className={className}>
      {sources.map((source) => (
        <source
          key={source.srcSet}
          srcSet={source.srcSet}
          type={source.type}
        />
      ))}
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className="h-auto w-full object-cover"
      />
    </picture>
  );
}
