import { FC } from "react";
import { join } from "path";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";

import type { Metadata } from "next";

import CustomMarkdown from "@/components/custom-markdown";
import { ARTICLES_DIR } from "@/constants/article";
import { getArticle } from "../util";

interface PageProps {
  params: { slug: string };
}

interface Article {
  content: string;
  data: {
    title: string;
    description: string;
  };
}

const generateStaticParams = () => {
  const filenames = readdirSync(ARTICLES_DIR);
  return filenames.map((filename) => ({ slug: filename.replace(/\.md$/, "") }));
};

const generateMetadata = ({ params }: PageProps): Metadata => {
  const { slug } = params;
  const { data } = getArticle(slug);
  return {
    title: data.title,
    openGraph: {
      title: data.title,
      description: data.description,
    },
  };
};

const Article: FC<PageProps> = ({ params }) => {
  const { slug } = params;
  const { data, content } = getArticle(slug);
  return (
    <article className="mx-auto max-w-4xl px-4 my-4">
      <h1>{data.title}</h1>
      <CustomMarkdown>{content}</CustomMarkdown>
    </article>
  );
};

export default Article;

export { generateMetadata, generateStaticParams };
