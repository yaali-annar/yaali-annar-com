import { FC } from "react";
import Link from "next/link";
import NavBar from "@/components/navbar";
import { getArticles } from "@/utils/article";

const articles = getArticles();

const Articles: FC = () => {
  return (
    <>
      <NavBar />
      <main className="flex flex-col gap-4 lg:gap-8">
        <h1>Articles</h1>
        <div className="flex flex-col gap-4 lg:gap-8">
          {articles.map(({ data, slug }, index) => (
            <Link href={`/article/${slug}`} key={index}>
              <h2>{data.title}</h2>
              <p>{data.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default Articles;
