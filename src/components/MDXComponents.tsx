import React from "react";
import { Callout } from "./Callout";
import { CopyButton } from "./CopyButton";
import { YouTube } from "./Youtube";
import { Screenshot } from "./Screenshot";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const extractText = (node: any): string => {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node?.props?.children) return extractText(node.props.children);
  return "";
};

export const MDX_COMPONENTS = {
  Callout,
  YouTube,
  Screenshot,

  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = extractText(props.children);
    const id = slugify(text);
    return (
      <h2
        id={id}
        className="font-bold text-[1.1rem] text-white/88 dark:text-gray-800/88 mt-8 mb-3 scroll-mt-20"
        {...props}
      />
    );
  },

  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = extractText(props.children);
    const id = slugify(text);
    return (
      <h3
        id={id}
        className="font-semibold text-[1rem] text-white/80 dark:text-gray-800/80 mt-6 mb-2 scroll-mt-20"
        {...props}
      />
    );
  },

  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-[14px] text-white/65 dark:text-gray-700/70 leading-[1.8] mb-4"
      {...props}
    />
  ),

  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-[#ff63c3] dark:text-[#81e6d9] underline underline-offset-4 hover:opacity-80 transition-opacity font-medium"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),

  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong
      className="font-semibold text-zinc-700 dark:text-gray-900"
      {...props}
    />
  ),

  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="font-mono text-[12.5px] text-[#81e6d9] dark:text-[#319795] bg-[#81e6d9]/8 dark:bg-[#319795]/10 border border-[#81e6d9]/15 dark:border-[#319795]/20 px-1.5 py-0.5 rounded"
      {...props}
    />
  ),

  pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
    const codeText = extractText(props.children);
    return (
      <div className="group relative my-5">
        <CopyButton code={codeText} />
        <pre
          className="my-5 rounded-lg bg-black/40 dark:bg-black/8 border border-white/8 dark:border-gray-800/12 px-5 py-4 overflow-x-auto text-[13px] leading-relaxed [&_code]:bg-transparent [&_code]:border-0 [&_code]:p-0 [&_code]:text-white/80 dark:[&_code]:text-gray-700/80"
          {...props}
        />
      </div>
    );
  },

  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-3 pl-5 space-y-1.5 text-[14px] text-zinc-400 dark:text-gray-700/70 list-disc marker:text-zinc-400 dark:marker:text-gray-700/70"
      {...props}
    />
  ),

  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-3 pl-5 space-y-1.5 text-[14px] text-zinc-400 dark:text-gray-700/70 list-decimal marker:text-zinc-400 dark:marker:text-gray-700/70"
      {...props}
    />
  ),

  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),

  hr: () => <hr className="my-8 border-zinc-200 dark:border-white/8" />,

  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-5 pl-4 border-l-2 border-[#ff63c3]/40 dark:border-[#81e6d9]/40 text-[14px] text-zinc-500 dark:text-white/50 italic"
      {...props}
    />
  ),

  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-5 overflow-x-auto rounded-lg border border-zinc-200 dark:border-white/8">
      <table className="w-full text-[13px]" {...props} />
    </div>
  ),

  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className="bg-zinc-50 dark:bg-white/4 border-b border-zinc-200 dark:border-white/8"
      {...props}
    />
  ),

  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-2.5 text-left font-semibold text-[11px] uppercase tracking-wider text-zinc-500 dark:text-white/45"
      {...props}
    />
  ),

  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-2.5 text-zinc-700 dark:text-white/60 border-b border-zinc-100 dark:border-white/5"
      {...props}
    />
  ),
};
