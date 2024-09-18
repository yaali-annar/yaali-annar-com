import createMDX from "@next/mdx";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeToc from "@jsdevtools/rehype-toc";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  trailingSlash: true,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkMath,
      remarkGfm,
    ],
    rehypePlugins: [rehypeSlug, rehypeKatex],
  },
});

export default withMDX(nextConfig);
