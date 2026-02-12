"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  SiUnrealengine,
  SiGo,
  SiDotnet,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { MdOutlineNavigateNext } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { CATEGORIES } from "@/utility/categories";
import { CategoryMeta } from "@/utility/types";

const ICON_MAP: Record<string, React.ReactNode> = {
  SiUnrealengine: <SiUnrealengine size={20} />,
  SiGo: <SiGo size={20} />,
  SiDotnet: <SiDotnet size={20} />,
  SiReact: <SiReact size={20} />,
  SiTypescript: <SiTypescript size={20} />,
};

const DELAY_CLASSES = [
  "anim-delay-0",
  "anim-delay-1",
  "anim-delay-2",
  "anim-delay-3",
  "anim-delay-4",
];

function CategoryCard({
  category,
  index,
}: {
  category: CategoryMeta;
  index: number;
}) {
  return (
    <Link
      href={`/${category.slug}`}
      className={`group block anim-fade-in-up ${DELAY_CLASSES[index] ?? "anim-delay-5"}`}
    >
      <div
        className="relative h-full rounded-xl border bg-white/[0.04] dark:bg-white/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor =
            `${category.accentColor}55`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor =
            "rgba(255,255,255,0.08)";
        }}
      >
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top left, ${category.accentColor}12 0%, transparent 60%)`,
          }}
        />

        <div className="flex items-start justify-between mb-3">
          <div
            className="p-2 rounded-lg flex items-center justify-center"
            style={{ background: `${category.accentColor}20` }}
          >
            <span style={{ color: category.accentColor }}>
              {ICON_MAP[category.icon]}
            </span>
          </div>

          {category.articleCount > 0 && (
            <span className="text-[11px] font-medium text-white/30 dark:text-gray-700/50 bg-white/5 dark:bg-black/5 px-2 py-0.5 rounded-full border border-white/8 dark:border-gray-800/15">
              {category.articleCount} notes
            </span>
          )}
        </div>

        <h2
          className="font-semibold text-[14.5px] mb-1.5"
          style={{ color: category.accentColor }}
        >
          {category.label}
        </h2>

        <p className="text-[12.5px] text-white/50 dark:text-gray-700/55 leading-relaxed mb-4">
          {category.description}
        </p>

        <div className="flex items-center gap-1 text-[11.5px] text-white/30 dark:text-gray-700/40 group-hover:text-white/65 dark:group-hover:text-gray-700/65 transition-colors">
          <span>Browse notes</span>
          <MdOutlineNavigateNext
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen text-white/80 dark:text-gray-800">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-[88px] pb-16">
        <section
          className="mb-12 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 dark:bg-white/40 border border-white/8 dark:border-gray-800/15 backdrop-blur-sm text-[12px] text-white/55 dark:text-gray-700/60">
              <IoBookOutline size={13} className="text-[#81e6d9]" />
              Personal knowledge base
            </span>
          </div>

          <h1 className="font-bold text-[2.1rem] sm:text-4xl mb-3 text-white/90 dark:text-gray-800/90">
            <span className="text-[#81e6d9]">zsh</span>library
          </h1>

          <p className="text-white/50 dark:text-gray-700/60 max-w-[500px] leading-relaxed text-[14px]">
            A curated collection of notes, patterns, and reference material from
            game development to fullstack engineering — things I keep coming
            back to.
          </p>

          <div className="mt-8 w-full border-t border-white/8 dark:border-gray-800/15" />
        </section>

        <section aria-labelledby="categories-heading">
          <h2
            id="categories-heading"
            className="text-[11px] font-semibold uppercase tracking-widest text-white/28 dark:text-gray-700/38 mb-5 transition-all duration-700 delay-100 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)",
            }}
          >
            Topics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CATEGORIES.map((category, index) => (
              <CategoryCard
                key={category.slug}
                category={category}
                index={index}
              />
            ))}
          </div>
        </section>

        <div
          className="mt-16 text-center transition-opacity duration-700 delay-500"
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <p className="text-[12px] text-white/18 dark:text-gray-700/28">
            Updated as I learn · Built by{" "}
            <a
              href="https://zshstacks.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#81e6d9]/55 hover:text-[#81e6d9] transition-colors"
            >
              zshstacks
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
