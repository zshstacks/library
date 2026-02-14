import { notFound } from "next/navigation";
import Link from "next/link";
import { BsTag } from "react-icons/bs";
import { CATEGORIES } from "@/utility/categories";
import { getArticle, getArticleSlugs } from "@/utility/mdx";
import MDXRenderer from "@/components/MDXRenderer";
import ScrollSpy from "@/components/ScrollSpy";

export async function generateStaticParams() {
  const paths: { category: string; slug: string }[] = [];
  for (const cat of CATEGORIES) {
    const slugs = getArticleSlugs(cat.slug);
    slugs.forEach((slug) => paths.push({ category: cat.slug, slug }));
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const result = getArticle(category, slug);
  if (!result) return {};
  return {
    title: `${result.meta.title} — zshLibrary`,
    description: result.meta.description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categorySlug, slug } = await params;

  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) notFound();

  const result = getArticle(categorySlug, slug);
  if (!result) notFound();

  const { meta, content } = result;

  return (
    <main className="min-h-screen text-white/80 dark:text-gray-800">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-[88px] pb-16">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-sm mb-8 anim-slide-in-left anim-delay-0"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="link-underline text-[#ff63c3] hover:opacity-80 transition-opacity"
          >
            library
          </Link>
          <span className="text-white/20 dark:text-gray-800/20 text-xs">/</span>
          <Link
            href={`/${category.slug}`}
            className="link-underline hover:opacity-80 transition-opacity"
            style={{ color: category.accentColor }}
          >
            {category.label}
          </Link>
          <span className="text-white/20 dark:text-gray-800/20 text-xs">/</span>
          <span className="text-white/50 dark:text-gray-800/50 truncate max-w-[180px]">
            {meta.title}
          </span>
        </nav>

        <div className="flex gap-12">
          <article className="flex-1 min-w-0 anim-fade-in-up anim-delay-1">
            <header className="mb-8">
              <h1 className="font-bold text-2xl sm:text-[1.8rem] text-white/90 dark:text-gray-800/90 mb-2 leading-tight">
                {meta.title}
              </h1>
              <p className="text-[14px] text-white/50 dark:text-gray-800/50 mb-5">
                {meta.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag-item items-center gap-1 px-1.5 py-0.5 rounded text-white/35 dark:text-gray-800/40 bg-white/5 dark:bg-black/5 border border-white/8 dark:border-gray-800/12 text-[11px]"
                  >
                    <BsTag size={9} />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 border-t border-white/8 dark:border-gray-800/15" />
            </header>

            <MDXRenderer source={content} />
          </article>

          <aside className="hidden xl:block w-[160px] flex-shrink-0">
            <ScrollSpy content={content} accentColor={category.accentColor} />
          </aside>
        </div>

        <div className="mt-16 pt-6 border-t border-white/8 dark:border-gray-800/15 anim-fade-in-up anim-delay-2">
          <Link
            href={`/${category.slug}`}
            className="inline-flex items-center gap-1.5 text-[13px] text-white/38 dark:text-gray-800/38 hover:text-white/65 dark:hover:text-gray-800/65 transition-colors duration-200"
          >
            ← Back to {category.label}
          </Link>
        </div>
      </div>
    </main>
  );
}
