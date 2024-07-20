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
        <section className="max-w-7xl mx-auto py-32">
          <h3 className="text-7xl  font-bold mb-4 text-slate-600 text-center">
            Latest <span className="text-green-600">Posts</span>
          </h3>
          <p className="text-2xl text-gray-700 mb-8 text-center">
            Get started with these essential tips and tricks to kickstart your
            gardening journey. Click on any image to learn more!
          </p>
          <PostList />
        </section>
      </main>
    </>
  );
};

export default Home;
