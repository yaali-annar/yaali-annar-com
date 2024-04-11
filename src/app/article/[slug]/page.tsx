import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { FC, useEffect } from "react";

import type { Metadata, ResolvingMetadata } from "next";
import MarkdownWithLatex from "@/components/markdown-with-latex";
import ArticleComponent from "./component";

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

const articlesDirectory = join(process.cwd(), "src", "articles");

const generateStaticParams = () => {
  const filenames = readdirSync(articlesDirectory);
  return filenames.map((filename) => ({ slug: filename.replace(/\.md$/, "") }));
};

const getStaticProps = (slug: string) => {
  const fullPath = join(articlesDirectory, `${slug}.md`);
  const fileContents = readFileSync(fullPath, "utf8");
  return matter(fileContents) as unknown as Article;
};

const generateMetadata = ({ params }: PageProps): Metadata => {
  const { slug } = params;
  const { data } = getStaticProps(slug);
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
  const { data, content } = getStaticProps(slug);
  return (
    <ArticleComponent {...{ content }} title={data.title}></ArticleComponent>
  );
};

export default Article;

export { generateMetadata, generateStaticParams };
