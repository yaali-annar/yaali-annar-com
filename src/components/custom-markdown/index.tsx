import { FC } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeToc, { HtmlElementNode, TextNode } from "@jsdevtools/rehype-toc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import type { Pluggable } from "unified";

import { TOC_ID } from "./constants";
import generateHeadingComponent from "./heading";

interface Props {
  children: string;
}

const headingComponents: Components = {
  h2: generateHeadingComponent(2),
  h3: generateHeadingComponent(3),
  h4: generateHeadingComponent(4),
  h5: generateHeadingComponent(5),
  h6: generateHeadingComponent(6),
};

const customizeTOC = (node: HtmlElementNode) => {
  const customizedNode = { ...node };
  const { children } = customizedNode;
  if (!children) {
    return null;
  }
  const title: HtmlElementNode = {
    children: [{ type: "text", value: "Table of Contents" } as TextNode],
    properties: { class: "mb-0", id: TOC_ID },
    tagName: "h2",
    type: "element",
  };
  customizedNode.children = [title, ...children];
  return customizedNode;
};

const rehypeTocWithOptions: Pluggable = [
  rehypeToc,
  {
    customizeTOC,
    cssClasses: {
      toc: "border-yellow-600 border rounded p-2 lg:p-4 my-3 text-yellow-600",
    },
  },
];

const CustomMarkdown: FC<Props> = ({ children }) => (
  <ReactMarkdown
    remarkPlugins={[remarkMath, remarkGfm]}
    rehypePlugins={[rehypeSlug, rehypeTocWithOptions, rehypeKatex]}
    components={{ ...headingComponents }}
  >
    {children}
  </ReactMarkdown>
);

export default CustomMarkdown;
