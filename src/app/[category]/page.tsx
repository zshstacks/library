"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  SiUnrealengine,
  SiGo,
  SiDotnet,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { MdOutlineNavigateNext } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { BsTag } from "react-icons/bs";
import { CATEGORIES } from "@/utility/categories";
import { Article } from "@/utility/types";

const ICON_MAP: Record<string, React.ReactNode> = {
  SiUnrealengine: <SiUnrealengine size={18} />,
  SiGo: <SiGo size={18} />,
  SiDotnet: <SiDotnet size={18} />,
  SiReact: <SiReact size={18} />,
  SiTypescript: <SiTypescript size={18} />,
};

const PLACEHOLDER_ARTICLES: Record<string, Article[]> = {
  golang: [
    {
      slug: "goroutines-channels",
      title: "Goroutines & Channels",
      description:
        "Core concurrency primitives in Go — how goroutines are scheduled and when to reach for channels vs mutexes.",
      category: "golang",
      tags: ["concurrency", "goroutines", "channels"],
      readTime: 6,
      date: "2025-01-15",
    },
    {
      slug: "gin-rest-api",
      title: "REST APIs with Gin",
      description:
        "Building production-ready REST APIs using the Gin framework — middleware, routing groups, and error handling patterns.",
      category: "golang",
      tags: ["gin", "rest", "api", "middleware"],
      readTime: 10,
      date: "2025-01-20",
    },
  ],
};

function ArticleRow({
  article,
  accentColor,
  index,
}: {
  article: Article;
  accentColor: string;
  index: number;
}) {
  return (
    <Link
      href={`/${article.category}/${article.slug}`}
      className="group block opacity-0 animate-fade-in-up"
      style={{
        animationDelay: `${index * 60 + 200}ms`,
        animationFillMode: "forwards",
      }}
    >
      <div className="flex items-start justify-between gap-4 px-4 py-4 rounded-lg border border-white/6 dark:border-gray-800/12 bg-white/3 dark:bg-white/35 hover:bg-white/7 dark:hover:bg-white/50 hover:border-white/15 dark:hover:border-gray-800/25 transition-all duration-200 hover:-translate-y-px">
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-[15px] mb-1 group-hover:underline group-hover:underline-offset-4 transition-all"
            style={{ color: accentColor }}
          >
            {article.title}
          </h3>
          <p className="text-[13px] text-white/50 dark:text-gray-800/50 leading-relaxed mb-3 line-clamp-2">
            {article.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-white/30 dark:text-gray-800/35">
              <IoTimeOutline size={12} />
              {article.readTime} min read
            </span>
            <span className="text-white/20 dark:text-gray-800/20">·</span>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded text-white/35 dark:text-gray-800/40 bg-white/5 dark:bg-black/5 border border-white/8 dark:border-gray-800/12"
                >
                  <BsTag size={9} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <MdOutlineNavigateNext
          size={18}
          className="text-white/20 dark:text-gray-800/20 group-hover:text-white/50 dark:group-hover:text-gray-800/50 transition-colors mt-0.5 flex-shrink-0 group-hover:translate-x-0.5 duration-200"
        />
      </div>
    </Link>
  );
}

export default function CategoryPage() {
  const params = useParams<{ category: string }>();
  const [isVisible, setIsVisible] = useState(false);

  const category = CATEGORIES.find((c) => c.slug === params.category);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (!category) notFound();

  const articles = PLACEHOLDER_ARTICLES[category.slug] ?? [];

  return (
    <main className="min-h-screen text-white/80 dark:text-gray-800">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-[88px] pb-16">
        {/* Breadcrumb */}
        <nav
          className={`flex items-center gap-2 text-sm mb-8 transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="text-[#ff63c3] hover:underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            library
          </Link>
          <span className="text-white/20 dark:text-gray-800/20 text-xs font-bold">
            &gt;
          </span>
          <span className="text-white/60 dark:text-gray-800/60 font-semibold">
            {category.label}
          </span>
        </nav>

        {/* Category header */}
        <section
          className={`mb-10 transition-all duration-600 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="p-2 rounded-lg"
              style={{ background: `${category.accentColor}18` }}
            >
              <span style={{ color: category.accentColor }}>
                {ICON_MAP[category.icon]}
              </span>
            </div>
            <h1
              className="font-bold text-2xl sm:text-3xl"
              style={{ color: category.accentColor }}
            >
              {category.label}
            </h1>
          </div>

          <p className="text-white/55 dark:text-gray-800/55 max-w-[520px] leading-relaxed text-[14px]">
            {category.description}
          </p>

          <div className="mt-6 border-t border-white/8 dark:border-gray-800/15" />
        </section>

        {/* Articles */}
        <section>
          <div
            className={`flex items-center justify-between mb-4 transition-all duration-500 delay-150 ease-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/30 dark:text-gray-800/35">
              Notes · {articles.length}
            </h2>
          </div>

          {articles.length > 0 ? (
            <div className="flex flex-col gap-2">
              {articles.map((article, i) => (
                <ArticleRow
                  key={article.slug}
                  article={article}
                  accentColor={category.accentColor}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div
              className={`text-center py-20 transition-all duration-500 delay-200 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-white/25 dark:text-gray-800/30 text-sm">
                Notes coming soon.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
