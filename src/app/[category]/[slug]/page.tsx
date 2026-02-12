"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { IoTimeOutline } from "react-icons/io5";
import { BsTag } from "react-icons/bs";
import { CATEGORIES } from "@/utility/categories";
import { TocItem } from "@/utility/types";

const ARTICLE_CONTENT: Record<
  string,
  {
    title: string;
    description: string;
    tags: string[];
    readTime: number;
    date: string;
    toc: TocItem[];
    body: React.ReactNode;
  }
> = {
  "goroutines-channels": {
    title: "Goroutines & Channels",
    description: "Core concurrency primitives in Go",
    tags: ["concurrency", "goroutines", "channels"],
    readTime: 6,
    date: "Jan 15, 2025",
    toc: [
      { id: "what-is-a-goroutine", title: "What is a goroutine?", level: 2 },
      { id: "channels", title: "Channels", level: 2 },
      { id: "buffered-channels", title: "Buffered channels", level: 3 },
      { id: "select-statement", title: "The select statement", level: 2 },
      { id: "common-patterns", title: "Common patterns", level: 2 },
    ],
    body: (
      <div className="prose-library">
        <h2 id="what-is-a-goroutine">What is a goroutine?</h2>
        <p>
          A goroutine is a lightweight thread managed by the Go runtime. Unlike
          OS threads, goroutines are multiplexed onto a small number of OS
          threads, so you can have thousands running concurrently without a
          heavy memory footprint.
        </p>
        <pre>
          <code>{`go func() {
    fmt.Println("running concurrently")
}()`}</code>
        </pre>
        <h2 id="channels">Channels</h2>
        <p>
          Channels provide a way for goroutines to communicate with each other
          and synchronise their execution. Think of them as typed pipes — you
          send values into one end and receive them from the other.
        </p>
        <pre>
          <code>
            {`ch := make(chan int)

go func() {
    ch <- 42          // send
}()

value := <-ch         // receive`}
            ddd
          </code>
        </pre>
        <h3 id="buffered-channels">Buffered channels</h3>
        <p>
          A buffered channel has capacity — sends only block when the buffer is
          full, and receives only block when the buffer is empty.
        </p>
        <pre>
          <code>{`ch := make(chan int, 3)  // buffer of 3`}</code>
        </pre>
        <h2 id="select-statement">The select statement</h2>
        <p>
          <code>select</code> lets a goroutine wait on multiple channel
          operations simultaneously, proceeding with whichever is ready first.
        </p>
        <h2 id="common-patterns">Common patterns</h2>
        <p>
          Fan-out, fan-in, timeout with <code>time.After</code>, and done
          channels for cancellation are the patterns worth having memorised.
        </p>
      </div>
    ),
  },
};

function TableOfContents({
  toc,
  activeId,
  accentColor,
}: {
  toc: TocItem[];
  activeId: string;
  accentColor: string;
}) {
  return (
    <nav aria-label="Table of contents" className="sticky top-[80px]">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-white/25 dark:text-gray-800/30 mb-3">
        On this page
      </p>
      <ul className="space-y-1.5">
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: item.level === 3 ? "12px" : "0" }}
          >
            <a
              href={`#${item.id}`}
              className={`block text-[13px] transition-colors duration-150 hover:opacity-100 ${
                activeId === item.id
                  ? "opacity-100 font-medium"
                  : "opacity-40 hover:opacity-70"
              }`}
              style={{ color: activeId === item.id ? accentColor : undefined }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function ArticlePage() {
  const params = useParams<{ category: string; slug: string }>();
  const [isVisible, setIsVisible] = useState(false);
  const [activeId, setActiveId] = useState("");

  const category = CATEGORIES.find((c) => c.slug === params.category);
  const article = ARTICLE_CONTENT[params.slug];

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Scroll spy
  useEffect(() => {
    if (!article?.toc) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0% -70% 0%" },
    );
    article.toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [article]);

  if (!category) notFound();
  if (!article) {
    return (
      <main className="min-h-screen text-white/80 dark:text-gray-800">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-[88px] pb-16 text-center">
          <h1 className="text-xl font-bold mb-4 text-white/60">
            Note not found
          </h1>
          <Link
            href={`/${params.category}`}
            className="text-[#ff63c3] hover:underline underline-offset-4"
          >
            ← Back to {category.label}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-white/80 dark:text-gray-800">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-[88px] pb-16">
        {/* Breadcrumb */}
        <nav
          className={`flex items-center gap-2 text-sm mb-8 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="text-[#ff63c3] hover:underline underline-offset-4 hover:opacity-80"
          >
            library
          </Link>
          <span className="text-white/20 dark:text-gray-800/20 text-xs font-bold">
            &gt;
          </span>
          <Link
            href={`/${category.slug}`}
            className="hover:underline underline-offset-4 hover:opacity-80 transition-opacity"
            style={{ color: category.accentColor }}
          >
            {category.label}
          </Link>
          <span className="text-white/20 dark:text-gray-800/20 text-xs font-bold">
            &gt;
          </span>
          <span className="text-white/60 dark:text-gray-800/60 truncate max-w-[160px]">
            {article.title}
          </span>
        </nav>

        {/* Two-column layout: content + TOC */}
        <div className="flex gap-10">
          {/* Main content */}
          <article
            className={`flex-1 min-w-0 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            {/* Article header */}
            <header className="mb-8">
              <h1 className="font-bold text-2xl sm:text-3xl text-white/90 dark:text-gray-800/90 mb-2">
                {article.title}
              </h1>
              <p className="text-white/50 dark:text-gray-800/50 text-[14px] mb-4">
                {article.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-[12px]">
                <span className="flex items-center gap-1 text-white/35 dark:text-gray-800/40">
                  <IoTimeOutline size={13} />
                  {article.readTime} min read
                </span>
                <span className="text-white/20">·</span>
                <span className="text-white/30 dark:text-gray-800/35">
                  {article.date}
                </span>
                <span className="text-white/20">·</span>
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

              <div className="mt-6 border-t border-white/8 dark:border-gray-800/15" />
            </header>

            {/* Body */}
            <div className="prose-library">{article.body}</div>
          </article>

          {/* Sticky TOC — desktop only */}
          <aside className="hidden xl:block w-[180px] flex-shrink-0">
            <div
              className={`transition-all duration-700 delay-200 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <TableOfContents
                toc={article.toc}
                activeId={activeId}
                accentColor={category.accentColor}
              />
            </div>
          </aside>
        </div>

        {/* Back link */}
        <div
          className={`mt-16 transition-all duration-500 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            href={`/${category.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-white/40 dark:text-gray-800/40 hover:text-white/70 dark:hover:text-gray-800/70 transition-colors border-t border-white/8 dark:border-gray-800/15 pt-6 w-full"
          >
            <span>←</span>
            <span>Back to {category.label}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
