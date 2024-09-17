
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";

import matter from "gray-matter";
import { serialize } from 'next-mdx-remote/serialize'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

import { ARTICLES_DIR } from "@/constants/article";
import rehypeTocWithOptions from '@/components/custom-markdown/rehype-toc';
import components from '@/components/custom-markdown/components';

export interface ArticleData {
  title: string;
  description: string;
  tags?: string[];
}

export interface Article {
  slug: string;
  content: string;
  data: ArticleData
}

const pattern = /!include\s+"([^"]+)"/g;


const processIncludes = (content: string, base: string): string => {
  let result = content;
  let match = pattern.exec(result);

  while (match !== null) {
    const [directive, path] = match;
    const fullPath = join(base, `${path}.md`);
    match = pattern.exec(result);

    if (!existsSync(fullPath)) {
      continue;
    }

    const included = readFileSync(fullPath, "utf8");
    const processed = processIncludes(included, dirname(fullPath));
    result = result.replace(directive, processed);
  }

  return result;
};

const getArticle = (slug: string): Article | null => {
  try {
    const slugPath = join(ARTICLES_DIR, slug);
    const candidatePaths = [
      `${slugPath}.md`,
      `${slugPath}.mdx`,
      join(slugPath, "index.md"),
      join(slugPath, "index.mdx"),
    ]

    let path = '';

    for (const candidatePath of candidatePaths) {
      if (existsSync(candidatePath)) {
        path = candidatePath;
      }
    }

    if (!path) {
      console.error("No article found for slug:", slug);
      return null;
    }

    const contents = readFileSync(path, "utf8");
    const processed = processIncludes(contents, dirname(path));

    return { slug, ...matter(processed) } as unknown as Article;
  } catch (error) {
    console.error("Error reading article:", error);
    return null;
  }
};

const getArticles = (): Article[] => {
  try {
    const files = readdirSync(ARTICLES_DIR);
    const articles: Article[] = [];
    for (const file of files) {
      const article = getArticle(file.replace(/.mdx?/, ""));
      if (article) {
        articles.push(article);
      }
    }
    return articles;
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
};

export { getArticle, getArticles };
