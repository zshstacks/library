import { CATEGORIES } from "@/utility/categories";
import { getArticlesByCategory } from "@/utility/mdx";
import HomeContent from "./HomeContent";

export default function Page() {
  const allArticles = CATEGORIES.flatMap((category) =>
    getArticlesByCategory(category.slug),
  );

  const totalNotes = allArticles.length;

  const tagCounts = new Map<string, number>();
  for (const article of allArticles) {
    for (const tag of article.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  const topTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([tag]) => tag);

  return (
    <HomeContent
      categories={CATEGORIES}
      totalNotes={totalNotes}
      topTags={topTags}
    />
  );
}
