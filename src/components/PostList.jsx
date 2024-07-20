// src/components/PostList.jsx
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { categories } from "../constants";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let postsQuery = collection(db, "posts");

      const postsSnapshot = await getDocs(postsQuery);
      const postsList = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsList);
    };

    fetchPosts();
  }, []); // Make sure to properly handle dependencies

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="relative bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {post.imageUrl && (
            <div
              className="relative h-80"
              style={{
                backgroundImage: `url(${post.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute top-2 left-2 bg-green-600 bg-opacity-75 text-white text-xs px-2 py-1 rounded-br-lg">
                {post.categories.map((categoryId, index) => (
                  <React.Fragment key={categoryId}>
                    <span
                      className="cursor-pointer"
                      onClick={() => setFilter(categoryId)}
                    >
                      {categories.find((cat) => cat.id === categoryId).name}
                    </span>
                    {index < post.categories.length - 1 ? " | " : ""}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
          <div className="p-5">
            <h3 className="text-2xl capitalize font-semibold mb-2 text-slate-700">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-6">{post.excerpt}</p>
            <Link
              to={`/${post.slug}`}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
