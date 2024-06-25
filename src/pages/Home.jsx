// src/pages/Home.jsx
import React from "react";
import Cover from "../components/Cover";
import PostList from "../components/PostList";
import Intro from "../components/Intro";
import QuickStartGuide from "../components/QuickStartGuide";

const Home = () => {
  return (
    <>
      <Cover />
      <main className="p-4 ">
        <Intro />
        <QuickStartGuide />
        <section className="max-w-7xl mx-auto py-20">
          <h2 className="text-2xl font-bold mb-4">Latest Blogs</h2>
          <PostList />
        </section>
      </main>
    </>
  );
};

export default Home;
