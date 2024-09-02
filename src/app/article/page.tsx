import { FC } from "react";
import Link from "next/link";
import NavBar from "@/components/navbar";
import { getArticles } from "@/utils/article";

const articles = getArticles();

const Articles: FC = () => {
  return (
    <>
      <NavBar />
      <main className="py-4 lg:py-8">
        <h1 className="mb-2 lg:mb-4">Articles</h1>
        {articles.map(({ data, slug }, index) => (
          <Link href={`/article/${slug}`} className="mb-2 lg:mb-4" key={index}>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </Link>
        ))}
      </main>
    </>
  );
};

export default Articles;
