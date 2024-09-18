

import { readdirSync } from "node:fs";
import type { Metadata } from 'next'
import type { ParsedUrlQuery } from "node:querystring";
import type { ReactElement } from "react";

import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";

import components from "@/components/custom-markdown/components";
import NavBar from "@/components/navbar";
import { ARTICLES_DIR } from "@/constants/article";

import { getArticle, type ArticleData } from "../engine";
import { slugToComponent } from "../constants";

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface PageProps {
  params: Params
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

const mdxOptions = {
  remarkPlugins: [remarkMath, remarkGfm],
  rehypePlugins: [rehypeSlug, rehypeKatex],
}

const Article = async ({ params }: PageProps): Promise<ReactElement | null> => {
  const { slug } = params;
  const Component = slugToComponent[slug]

  if (Component !== undefined) {
    return (
      <>
        <NavBar />
        <article className="mx-auto max-w-4xl px-4 my-4">
          <Component />
        </article>
      </>
    );
  }

  const article = await getArticle(params?.slug || '');

  if (!article) {
    return null;
  }

  const { content, data } = article;


  return (
    <>
      <NavBar />
      <article className="mx-auto max-w-4xl px-4 my-4">
        <h1>{data.title}</h1>
        <MDXRemote source={content} options={{ mdxOptions }} components={components} />
      </article>
    </>
  );
};

export default Article;

export { generateMetadata, generateStaticParams };
