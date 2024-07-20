import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";

const Blog = () => {
  const [filters, setFilters] = useState({});
  const [posts, setPosts] = useState([]);

  const handleSetFilter = (newFilter) => {
    // Directly set filters to the newFilter, discarding previous filters
    setFilters(newFilter);
    console.log("Setting filter with:", newFilter);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <PostList posts={posts} filters={filters} setFilter={handleSetFilter} />
    </div>
  );
};

export default Blog;
