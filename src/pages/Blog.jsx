// src/pages/Blog.jsx
import React from 'react';
import PostList from '../components/PostList';

const Blog = () => {
  return (
    <main className="p-4">
      <h2>Blog</h2>
      <PostList />
    </main>
  );
};

export default Blog;
