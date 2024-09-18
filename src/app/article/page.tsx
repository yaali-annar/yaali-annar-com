import type { FC } from "react";
import NavBar from "@/components/navbar";

import ArticlesContent from './content'
import { getArticles } from "./engine";

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
