import React from "react";
import MainLayout from "../../components/MainLayout";
import Hero from "./cotainer/Hero";
import Articles from "./cotainer/Articles";
import CTA from "./cotainer/CTA";

const HomePage = () => {
  return (
    <MainLayout>
      <div className="lg:px-24 px-5">
        <Hero />
        <Articles />
      </div>
      <CTA />
    </MainLayout>
  );
};

export default HomePage;
