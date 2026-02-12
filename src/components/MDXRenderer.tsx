import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import type { RunOptions } from "@mdx-js/mdx";
import { MDX_COMPONENTS } from "@/components/MDXComponents";

interface MDXRendererProps {
  source: string;
}

export default async function MDXRenderer({ source }: MDXRendererProps) {
  const compiled = await compile(source, {
    outputFormat: "function-body",
    development: false,
  });

  const { default: MDXContent } = await run(String(compiled), {
    ...(runtime as unknown as RunOptions),
    baseUrl: import.meta.url,
  });

  return <MDXContent components={MDX_COMPONENTS} />;
}
