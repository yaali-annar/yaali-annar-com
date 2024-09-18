import { readdirSync } from "node:fs";
import type { FC } from "react";

import type { Metadata } from "next";

import { ARTICLES_DIR } from "@/constants/article";
import CustomMarkdown from "@/components/custom-markdown";
import NavBar from "@/components/navbar";

import { getArticle } from "../engine";

interface Params {
  slug: string;
}

interface PageProps {
  params: Params;
}

const generateStaticParams = (): Params[] => {
  const filenames = readdirSync(ARTICLES_DIR);
  return filenames.map((filename) => ({ slug: filename.replace(/\.md$/, "") }));
};

const generateMetadata = ({ params }: PageProps): Metadata => {
  const { slug } = params;
  const article = getArticle(slug);
  if (!article) {
    return {};
  }

  const { data } = article;
  const { title, description } = data
  return {
    title,
    openGraph: { description, title },
  };
};

const Article: FC<PageProps> = ({ params }) => {
  const { slug } = params;
  const article = getArticle(slug, true);
  if (!article) {
    return null;
  }

  const { data, content } = article;
  return (
    <>
      <NavBar />
      <article className="mx-auto max-w-4xl px-4 space-y-3 lg:space-y-6">
        <h1>{data.title}</h1>
        <CustomMarkdown>{content}</CustomMarkdown>
      </article>
    </>
  );
};

export default Article;

export { generateMetadata, generateStaticParams };
