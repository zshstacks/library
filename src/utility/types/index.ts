export type Category =
  | "unreal-engine"
  | "golang"
  | "dotnet"
  | "react"
  | "typescript";

export interface CategoryMeta {
  slug: Category;
  label: string;
  description: string;
  icon: string;
  accentColor: string;
  articleCount: number;
  lastUpdated: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  readTime: number;
  date: string;
  content?: string;
}

export interface TocItem {
  id: string;
  title: string;
  level: number;
}
