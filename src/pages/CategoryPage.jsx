// src/pages/CategoryPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import PostList from "../components/PostList";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const CategoryPage = () => {
  const query = useQuery();
  const category = query.get("category");
  const season = query.get("season");
  const gardenLevel = query.get("gardenLevel");

  console.log("Category:", category);
  console.log("Season:", season);
  console.log("Garden Level:", gardenLevel);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {category ? `${category} Posts` : "All Posts"}
      </h1>
      <PostList category={category} season={season} gardenLevel={gardenLevel} />
    </div>
  );
};

export default CategoryPage;
