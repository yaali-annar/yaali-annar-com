import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeToc from "@jsdevtools/rehype-toc";
import rehypeSlug from "rehype-slug";
import { FC } from "react";

interface Props {
  children: string;
}

const MarkdownWithLatex: FC<Props> = ({ children }) => (
  <ReactMarkdown
    remarkPlugins={[remarkMath, remarkGfm]}
    rehypePlugins={[rehypeSlug, rehypeToc, rehypeKatex]}
  >
    {children}
  </ReactMarkdown>
);

export default MarkdownWithLatex;
