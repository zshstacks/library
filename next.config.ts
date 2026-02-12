import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@mdx-js/mdx"],
  reactCompiler: true,
};

export default nextConfig;
