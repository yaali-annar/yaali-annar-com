import rehypeToc, {
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
    (child) => ((child as HtmlElementNode).tagName = "ol")
  ) as HtmlElementNode;

  const tocLength = toc?.children?.length || 0;

  if (tocLength < 2) {
    return;
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

const rehypeTocOptions: RehypeTocOptions = {
  customizeTOC,
  cssClasses: {
    toc: "border-yellow-600 border rounded py-2 px-4 lg:p-4 my-3 text-yellow-600 inline-block",
    list: "list-disc pl-4",
  },
};

const rehypeTocWithOptions: Pluggable = [rehypeToc, rehypeTocOptions];

export default rehypeTocWithOptions;
