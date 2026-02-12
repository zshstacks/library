import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Article, Category } from "@/utility/types";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

/**
 * Read frontmatter + content from a single .mdx file.
 */
export function getArticle(
  category: string,
  slug: string,
): { meta: Article; content: string } | null {
  const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const meta: Article = {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    category: category as Category,
    tags: data.tags ?? [],
    readTime: data.readTime ?? 1,
    date: data.date ? String(data.date) : "",
  };

  return { meta, content };
}

/**
 * Return all article metadata for a given category (no content).
 * Sorted newest-first by date.
 */
export function getArticlesByCategory(category: string): Article[] {
  const dir = path.join(CONTENT_DIR, category);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      category: category as Category,
      tags: data.tags ?? [],
      readTime: data.readTime ?? 1,
      date: data.date ? String(data.date) : "",
    } satisfies Article;
  });

  // Newest first
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/**
 * Return slugs for a category — used by generateStaticParams.
 */
export function getArticleSlugs(category: string): string[] {
  const dir = path.join(CONTENT_DIR, category);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Return all categories that have at least one article.
 */
export function getAllCategories(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => fs.statSync(path.join(CONTENT_DIR, f)).isDirectory());
}
