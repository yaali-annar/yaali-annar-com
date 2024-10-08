"use client"

import { useMemo, useState, type FC } from "react";
import Link from "next/link";

import { classNames, kebabToProperName } from "@/utils/string";

import type { Article } from "./types";
import { createAccessibleProps } from "@/utils/function";

interface ArticlesProps {
  articles: Article[]
}

const ArticlesContent: FC<ArticlesProps> = ({ articles }) => {
  const [selectedTag, setSelectedTag] = useState('');

  const tags = useMemo(() => {
    const allTags = articles.flatMap(({ data }) => data.tags || [])
    return Array.from(new Set(allTags))
  }, [articles])

  const filteredArticles = useMemo(() => articles.filter(({ data }) => {
    if (!data.tags || !selectedTag) {
      return true;
    }
    return data.tags.includes(selectedTag)
  }), [articles, selectedTag])

  return (
    <main className="space-y-4 lg:space-y-8">
      <div className="space-y-2">
        <h1>Articles</h1>
        <div className="flex gap-2">Tags:
          {tags.map(tag => (
            <span
              {...createAccessibleProps(() => setSelectedTag(tag))}
              className={classNames(
                'cursor-pointer', {
                "text-black bg-yellow-400 px-2 rounded-full": tag === selectedTag,
                'border border-yellow-400 px-2 rounded-full': tag !== selectedTag
              })}
              key={tag} >
              {kebabToProperName(tag)}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:gap-8">
        {filteredArticles.map(({ data, slug }) => (
          <Link href={`/article/${slug}`} key={slug}>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ArticlesContent;
