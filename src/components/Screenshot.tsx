interface ScreenshotProps {
  src: string;
  alt: string;
  caption?: string;
}

export function Screenshot({ src, alt, caption }: ScreenshotProps) {
  return (
    <figure className="my-6">
      <div className="overflow-hidden rounded-lg border border-white/8 dark:border-gray-800/12">
        <img src={src} alt={alt} className="w-full h-auto block" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-[12px] text-white/35 dark:text-gray-700/45">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
