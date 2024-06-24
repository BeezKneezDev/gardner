// src/pages/Home.jsx
import React from 'react';
import Cover from '../components/Cover';
import PostList from '../components/PostList';

const Home = () => {
  return (
    <div>
      <Cover />
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4">Latest Blogs</h2>
        <PostList />
      </main>
    </div>
  );
};

export default Home;
