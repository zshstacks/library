import { notFound } from "next/navigation";
import { CATEGORIES } from "@/utility/categories";
import { getArticlesByCategory } from "@/utility/mdx";
import CategoryClientContent from "./CategoryClientContent";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);

  if (!category) notFound();

  const articles = getArticlesByCategory(category.slug);

  return (
    <CategoryClientContent category={category} initialArticles={articles} />
  );
}
