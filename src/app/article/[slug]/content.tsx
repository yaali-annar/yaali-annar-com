"use client"

import type { FC } from "react";

import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { ArticleData } from "../engine";


const ArticleContent: FC<MDXRemoteSerializeResult<never, ArticleData>> = (article) => {
  console.log({ article })

  const { frontmatter: data } = article;

  return (
    <article className="mx-auto max-w-4xl px-4 my-4">
      <h1>{data.title}</h1>
      <MDXRemote {...article} />
    </article>
  );
};

export default ArticleContent;

