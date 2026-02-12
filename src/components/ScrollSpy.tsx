"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function parseHeadings(content: string): Heading[] {
  const lines = content.split("\n");
  const headings: Heading[] = [];

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)/);
    const h3 = line.match(/^###\s+(.+)/);

    if (h2) {
      const text = h2[1].trim();
      headings.push({ id: slugify(text), text, level: 2 });
    } else if (h3) {
      const text = h3[1].trim();
      headings.push({ id: slugify(text), text, level: 3 });
    }
  }

  return headings;
}

export default function ScrollSpy({
  content,
  accentColor,
}: {
  content: string;
  accentColor: string;
}) {
  const headings = parseHeadings(content);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -70% 0%",
        threshold: 0,
      },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [content, headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-[100px] w-full">
      <p className="text-[10.5px] font-semibold uppercase tracking-widest text-white/20 mb-4">
        On this page
      </p>
      <ul className="space-y-0.5 border-l border-white/5">
        {headings.map(({ id, text, level }) => {
          const isActive = activeId === id;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(id);
                  if (element) {
                    const offset = 88;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });

                    window.history.pushState(null, "", `#${id}`);
                  }
                }}
                className={`
                  block text-[12.5px] leading-relaxed transition-all duration-200 py-1.5 -ml-[1px] border-l
                  ${level === 3 ? "pl-6" : "pl-4"}
                  ${
                    isActive
                      ? "font-medium translate-x-1 border-current"
                      : "dark:text-gray-700/55 border-transparent dark:hover:text-gray-700/95 hover:text-white/50  hover:border-white/10"
                  }
                `}
                style={
                  isActive
                    ? { color: accentColor, borderColor: accentColor }
                    : {}
                }
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
