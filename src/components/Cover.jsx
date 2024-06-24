// src/components/Cover.jsx
import React from 'react';

const Cover = () => {
  return (
    <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to Beezkneez</h1>
        <h2 className="text-2xl md:text-3xl mb-4">Your Ultimate Gardening Blog</h2>
        <p className="max-w-xl mb-6">
          Discover the best gardening tips, plant care advice, and inspiration for your garden. Join our community of garden enthusiasts and make your garden flourish.
        </p>
        <a href="#blog" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
          Read Our Blog
        </a>
      </div>
    </section>
  );
};

export default Cover;
