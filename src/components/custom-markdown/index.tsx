import type { FC } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import rehypeTocWithOptions from "./rehype-toc";
import components from "./components";

interface Props {
  children: string;
}

const CustomMarkdown: FC<Props> = ({ children }) => (
  <ReactMarkdown
    className="space-y-2 lg:space-y-4"
    remarkPlugins={[remarkMath, remarkGfm]}
    rehypePlugins={[rehypeSlug, rehypeTocWithOptions, rehypeKatex]}
    {...{ components }}
  >
    {children}
  </ReactMarkdown>
);

export default CustomMarkdown;
