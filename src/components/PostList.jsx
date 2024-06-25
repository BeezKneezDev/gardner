// src/components/PostList.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsList);
    };

    fetchPosts();
  }, []);

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="relative p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {post.imageUrl && (
            <div className="relative">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="mb-4 rounded-lg w-full object-cover h-60"
              />
              <div className="absolute top-0 left-0 bg-green-600 bg-opacity-75 text-white text-xs px-2 py-1 rounded-br-lg">
                {post.gardenLevel} | {post.season} | {post.category}
              </div>
            </div>
          )}
          <h3 className="text-2xl font-semibold text-green-700 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
          <Link
            to={`/${post.slug}`}
            className="text-green-500 hover:text-green-700 font-medium"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
