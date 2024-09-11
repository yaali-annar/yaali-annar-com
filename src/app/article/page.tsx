import type { FC } from "react";
import Link from "next/link";
import NavBar from "@/components/navbar";
import { getArticles } from "@/utils/article";

import ArticlesContent from './content'

const articles = getArticles();

const Articles: FC = () => {
  return (
    <>
      <NavBar />
      <ArticlesContent {...{ articles }} />
    </>
  );
};

export default Articles;
