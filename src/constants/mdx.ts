import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import rehypeTocWithOptions from "@/components/custom-markdown/rehype-toc";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const mdxOptions = {
  remarkPlugins: [
    // remarkFrontmatter,
    // remarkMdxFrontmatter,
    remarkMath,
    remarkGfm,
  ],
  rehypePlugins: [rehypeSlug, rehypeTocWithOptions, rehypeKatex],
};

export { mdxOptions };
