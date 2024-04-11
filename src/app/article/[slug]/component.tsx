"use client";

import { FC } from "react";
import MarkdownWithLatex from "@/components/markdown-with-latex";

interface ArticleComponentProps {
  content: string;
  title: string;
}

const ArticleComponent: FC<ArticleComponentProps> = ({ content, title }) => {
  return (
    <article className="mx-auto max-w-4xl px-4 my-4">
      <h1>{title}</h1>
      <MarkdownWithLatex>{content}</MarkdownWithLatex>
    </article>
  );
};

export default ArticleComponent;
