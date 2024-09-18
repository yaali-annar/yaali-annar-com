
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import matter from "gray-matter";

import { ARTICLES_DIR } from "@/constants/article";
import type { Article, ArticleData } from "./types";

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
    const exists = existsSync(slugPath);
    const path = exists ? join(slugPath, "index.md") : `${slugPath}.md`;
    const contents = readFileSync(path, "utf8");
    const processed = processIncludes(contents, dirname(path));
    const { content, data } = matter(processed);
    return { content, data: data as ArticleData, slug };
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
      const article = getArticle(file.replace(".md", ""));
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