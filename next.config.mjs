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
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeToc,
        {
          cssClasses: {
            toc: "toc border-yellow-600 border rounded py-2 px-4 lg:p-4 my-3 text-yellow-600 inline-block",
            list: "toc-list list-disc pl-4",
          },
        },
      ],
      rehypeKatex,
    ],
  },
});

export default withMDX(nextConfig);
