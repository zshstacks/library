interface YouTubeProps {
  id: string;
  title?: string;
}

export function YouTube({ id, title = "YouTube video" }: YouTubeProps) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-white/8 dark:border-gray-800/12">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
