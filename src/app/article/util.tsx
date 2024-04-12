import { ARTICLES_DIR } from "@/constants/article";
import { readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

interface Article {
  slug: string;
  content: string;
  data: {
    title: string;
    description: string;
  };
}

const getArticle = (slug: string) => {
  const fullPath = join(ARTICLES_DIR, `${slug}.md`);
  const fileContents = readFileSync(fullPath, "utf8");
  return { slug, ...matter(fileContents) } as unknown as Article;
};

const getArticles = (): Article[] => {
  try {
    const files = readdirSync(ARTICLES_DIR);
    return files.map((file) => getArticle(file.replace(".md", "")));
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
};

export { getArticle, getArticles };
