import type {VideoSource} from "@/lib/video";

export function VideoPlayer({
  source,
  title,
  className,
}: {
  source: VideoSource;
  title: string;
  className?: string;
}) {
  if (source.type === "file") {
    return (
      <video controls className={className} aria-label={title}>
        <source src={source.url} />
      </video>
    );
  }

  return (
    <iframe
      src={source.embedUrl}
      title={title}
      className={className}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
