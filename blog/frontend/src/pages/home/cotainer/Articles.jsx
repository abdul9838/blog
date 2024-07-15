import React from "react";
import ArticleCard from "../../../components/ArticleCard";

const Articles = () => {
  return (
    <section>
      <div className=" flex justify-between gap-y-4 flex-wrap">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>

      <div className="flex justify-center mt-8 font-bold text-sm">
        <button
          href=""
          className="flex items-center text-primary border-2 border-primary py-2 px-6 gap-2 rounded-md"
        >
          <span>More articles</span>
          <svg
            className="w-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Articles;
