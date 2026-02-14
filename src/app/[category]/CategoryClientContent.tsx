"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  SiUnrealengine,
  SiGo,
  SiDotnet,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { MdOutlineNavigateNext, MdSearch } from "react-icons/md";
import { BsTag } from "react-icons/bs";
import { Article } from "@/utility/types";

const ICON_MAP: Record<string, React.ReactNode> = {
  SiUnrealengine: <SiUnrealengine size={18} />,
  SiGo: <SiGo size={18} />,
  SiDotnet: <SiDotnet size={18} />,
  SiReact: <SiReact size={18} />,
  SiTypescript: <SiTypescript size={18} />,
};

function ArticleRow({
  article,
  accentColor,
}: {
  article: Article;
  accentColor: string;
}) {
  return (
    <Link href={`/${article.category}/${article.slug}`} className="group block">
      <div className="row-accent relative flex items-start justify-between gap-4 px-4 py-4 rounded-lg border border-white/[0.06] dark:border-gray-800/12 bg-white/[0.03] dark:bg-white/35 hover:bg-white/[0.06] dark:hover:bg-white/45 hover:border-white/12 dark:hover:border-gray-800/20 transition-all duration-250">
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-[15px] mb-1 "
            style={{ color: accentColor }}
          >
            {article.title}
          </h3>
          <p className="text-[13px] text-white/50 dark:text-gray-800/50 leading-relaxed mb-3 line-clamp-2">
            {article.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="tag-item items-center gap-1 px-1.5 py-0.5 rounded text-white/35 dark:text-gray-800/40 bg-white/5 dark:bg-black/5 border border-white/8 dark:border-gray-800/12 text-[11px]"
              >
                <BsTag size={9} />
                {tag}
              </span>
            ))}
          </div>
        </div>
        <MdOutlineNavigateNext
          size={18}
          className="text-white/20 dark:text-gray-800/20 group-hover:text-white/45 dark:group-hover:text-gray-800/45 transition-all duration-250 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5"
        />
      </div>
    </Link>
  );
}

export default function CategoryClientContent({
  category,
  initialArticles,
}: {
  category: any;
  initialArticles: Article[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    return initialArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [searchQuery, initialArticles]);

  return (
    <main className="min-h-screen text-white/80 dark:text-gray-800">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-[88px] pb-16">
        <nav className="flex items-center gap-2 text-sm mb-8 anim-slide-in-left anim-delay-0">
          <Link
            href="/"
            className="link-underline text-[#ff63c3] hover:opacity-80 transition-opacity"
          >
            library
          </Link>
          <span className="text-white/20 dark:text-gray-800/20 text-xs">/</span>
          <span className="text-white/60 dark:text-gray-800/60 font-medium">
            {category.label}
          </span>
        </nav>

        <section className="mb-10 anim-fade-in-up anim-delay-1">
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

        <section className="anim-fade-in-up anim-delay-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-white/30 dark:text-gray-800/35">
              Notes · {filteredArticles.length}
            </h2>

            <div className="relative group flex-1 max-w-[240px] ml-4">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 dark:text-gray-800/20 group-focus-within:text-white/45 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 dark:bg-black/5 border border-white/8 dark:border-gray-800/12 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-white/20 dark:focus:border-gray-800/25 transition-all duration-200"
              />
            </div>
          </div>

          <div className="max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="stagger-list flex flex-col gap-2 pb-4">
              {filteredArticles.map((article) => (
                <ArticleRow
                  key={article.slug}
                  article={article}
                  accentColor={category.accentColor}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
