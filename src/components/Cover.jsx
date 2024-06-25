// src/components/Cover.jsx
import React from "react";
import { Link } from "react-router-dom";

const Cover = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(/images/10.jpg)`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
          Welcome to Beezkneez Kiwi Gardener
        </h1>
        <p className="text-lg md:text-2xl text-white mb-8">
          Your Ultimate Guide to Beginner Gardening
        </p>
        <div className="flex space-x-4">
          <Link
            to="#featured-posts"
            className="bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </Link>
          <Link
            to="#featured-posts"
            className=" border border-white text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cover;
