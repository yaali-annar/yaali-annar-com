import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { FC } from "react";

interface Props {
  children: string;
}

const MarkdownWithLatex: FC<Props> = ({ children }) => (
  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
    {children}
  </ReactMarkdown>
);

export default MarkdownWithLatex;
