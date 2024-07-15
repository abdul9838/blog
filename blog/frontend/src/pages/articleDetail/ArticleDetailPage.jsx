import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../../components/MainLayout";
import { images } from "../../constants";
import BreadCrumbs from "../../components/BreadCrumbs";
import CommentsContainer from "../../components/comments/CommentsContainer";
import SuggestedPosts from "../home/cotainer/SuggestedPosts";

const ArticleDetailPage = () => {
  const breadCrumbsData = [
    { name: "Home", link: "/" },
    { name: "Blog", link: "/blog" },
    { name: "Article title", link: `/blog/1` },
  ];

  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={breadCrumbsData} />
          <img className="rounded-xl w-full" src={images.post1} />
          <div className="mt-4 flex gap-2">
            <Link
              to={`/blog?category=`}
              className="text-primary text-sm font-roboto inline-block md:text-base"
            >
              name
            </Link>
          </div>
          <h1 className="text-3xl font-bold my-5 font-roboto mt-4 text-dark-hard md:text-[26px]">
            Help children get better education
          </h1>
          <div className="w-full flex flex-col gap-y-4 text-dark-light text-lg font-roboto">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
              odio mollitia, reiciendis sint repellat voluptatem fugiat
              recusandae praesentium neque esse saepe quidem temporibus
              doloribus accusamus unde totam exercitationem odit similique!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
              odio mollitia, reiciendis sint repellat voluptatem fugiat
              recusandae praesentium neque esse saepe quidem temporibus
              doloribus accusamus unde totam exercitationem odit similique!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
              odio mollitia, reiciendis sint repellat voluptatem fugiat
              recusandae praesentium neque esse saepe quidem temporibus
              doloribus accusamus unde totam exercitationem odit similique!
            </p>
          </div>
          <CommentsContainer className="mt-10" loggedInUserId="a" />
        </article>
        <div>
          <SuggestedPosts
            header="Latest Article"
            className="mt-8 lg:mt-0 lg:max-w-xs"
          />
        </div>
      </section>
    </MainLayout>
  );
};

export default ArticleDetailPage;
