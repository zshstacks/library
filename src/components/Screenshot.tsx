"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClose, MdZoomIn } from "react-icons/md";
import "animate.css";

interface ScreenshotProps {
  src: string;
  alt: string;
  caption?: string;
}

export function Screenshot({ src, alt, caption }: ScreenshotProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <>
      <figure className="my-6">
        <div
          className="group relative overflow-hidden rounded-lg border border-white/10 dark:border-gray-800/20 cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Open full-size screenshot viewer"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setLightboxOpen(true);
          }}
        >
          <div className="absolute bottom-3 right-3 z-10 h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <MdZoomIn size={18} aria-hidden="true" />
          </div>
          <img src={src} alt={alt} className="w-full h-auto block" />
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-xs text-zinc-400">
            {caption}
          </figcaption>
        )}
      </figure>

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

            <div
              className="relative max-w-[95vw] max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl bg-zinc-900/40"
              />
              {caption && (
                <p className="mt-3 text-sm text-zinc-300 text-center select-none">
                  {caption}
                </p>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
