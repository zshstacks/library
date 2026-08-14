"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdZoomIn,
} from "react-icons/md";

interface GalleryProps {
  images: { src: string; alt?: string }[];
}

export function Gallery({ images }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goTo = (index: number) => {
    if (images.length === 0) return;
    setActiveIndex((index + images.length) % images.length);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, activeIndex, images.length]);

  if (images.length === 0) return null;
  const hasMultiple = images.length > 1;
  const currentAlt = images[activeIndex].alt || `Screenshot ${activeIndex + 1}`;

  return (
    <>
      <div className="my-6 space-y-3">
        {/* Hero Image */}
        <div
          className="group relative rounded-2xl overflow-hidden border border-white/10 dark:border-gray-800/10 bg-white/5 dark:bg-black/5 cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Open full-size screenshot viewer"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setLightboxOpen(true);
          }}
        >
          <div className="absolute top-3 left-3 z-10 bg-black/60 dark:bg-white/30 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-[#81e6d9] dark:text-[#2c7a7b]">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </div>

          <div className="absolute bottom-3 right-3 z-10 h-8 w-8 rounded-full bg-black/40 dark:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white dark:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <MdZoomIn size={18} aria-hidden="true" />
          </div>

          <img
            key={activeIndex}
            src={images[activeIndex].src}
            alt={currentAlt}
            className="w-full h-auto animate__animated animate__fadeIn animate__faster"
            loading="eager"
            fetchPriority="high"
          />

          {hasMultiple && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(activeIndex - 1);
                }}
                aria-label="Previous screenshot"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/40 dark:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white dark:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <MdChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(activeIndex + 1);
                }}
                aria-label="Next screenshot"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/40 dark:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white dark:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <MdChevronRight size={20} aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {/* Filmstrip Thumbnails */}
        {hasMultiple && (
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Screenshot thumbnails"
          >
            {images.map((img, index) => (
              <button
                key={`thumb-${index}`}
                onClick={() => goTo(index)}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`View screenshot ${index + 1}`}
                className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                  index === activeIndex
                    ? "border-[#81e6d9] dark:border-[#319795]"
                    : "border-white/10 dark:border-gray-800/10 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img.src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal mit Portal */}
      {lightboxOpen &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate__animated animate__fadeIn animate__faster"
            onClick={() => setLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Screenshot viewer"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close viewer"
              className="absolute top-5 right-5 z-[10000] h-10 w-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/30"
            >
              <MdClose size={24} aria-hidden="true" />
            </button>

            <div className="absolute top-5 left-5 z-[10000] font-mono text-xs text-white/70 bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </div>

            <div
              className="relative max-w-[95vw] max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                key={activeIndex}
                src={images[activeIndex].src}
                alt={currentAlt}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl bg-zinc-900/40 animate__animated animate__fadeIn animate__faster"
              />
            </div>

            {hasMultiple && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(activeIndex - 1);
                  }}
                  aria-label="Previous screenshot"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-[10000] h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/20"
                >
                  <MdChevronLeft size={24} aria-hidden="true" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(activeIndex + 1);
                  }}
                  aria-label="Next screenshot"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-[10000] h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/20"
                >
                  <MdChevronRight size={24} aria-hidden="true" />
                </button>
              </>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
