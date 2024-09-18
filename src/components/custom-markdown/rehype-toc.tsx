import rehypeToc from "@jsdevtools/rehype-toc";
import type {
  HtmlElementNode,
  Options as RehypeTocOptions,
  TextNode,
} from "@jsdevtools/rehype-toc";
import type { Pluggable } from "unified";

import { TOC_ID } from "./constants";

const customizeTOC = (node: HtmlElementNode) => {
  const customizedNode = { ...node };
  const { children } = customizedNode;

  if (!children) {
    return;
  }

  const toc = children.find(
    (child) => (child as HtmlElementNode).tagName === "ol"
  ) as HtmlElementNode;

  const tocLength = toc?.children?.length || 0;

  if (tocLength < 2) {
    return;
  }

  const title: HtmlElementNode = {
    children: [{ type: "text", value: "Table of Contents" } as TextNode],
    properties: { id: TOC_ID },
    tagName: "h2",
    type: "element",
  };

  customizedNode.children = [title, ...children];
  return customizedNode;
};

const rehypeTocOptions: RehypeTocOptions = { customizeTOC };

const rehypeTocWithOptions: Pluggable = [rehypeToc, rehypeTocOptions];

export default rehypeTocWithOptions;
