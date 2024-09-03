import { FC } from "react";
import { readdirSync } from "fs";

import type { Metadata } from "next";

import { ARTICLES_DIR } from "@/constants/article";
import CustomMarkdown from "@/components/custom-markdown";
import NavBar from "@/components/navbar";
import { getArticle } from "@/utils/article";

interface Params {
  slug: string;
}

interface PageProps {
  params: Params;
}

interface Article {
  content: string;
  data: {
    title: string;
    description: string;
  };
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
  const article = getArticle(slug);

  if (!article) {
    return null;
  }

  const { data, content } = article;
  return (
    <>
      <NavBar />
      <article className="mx-auto max-w-4xl px-4 my-4">
        <h1>{data.title}</h1>
        <CustomMarkdown>{content}</CustomMarkdown>
      </article>
    </>
  );
};

export default Article;

export { generateMetadata, generateStaticParams };
