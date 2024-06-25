// src/pages/SinglePost.jsx
import { db } from "../firebase/firebase";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import {
  doc,
  limit,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  collection,
} from "firebase/firestore";

const SinglePost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([
    "Planting",
    "Recipes",
    "Tips",
    "New gardener",
    "1 - 2 years",
    "3+ years",
    "Summer",
    "Winter",
    "Spring",
    "Autumn",
  ]);

  useEffect(() => {
    const fetchPost = async (slug) => {
      try {
        const q = query(collection(db, "posts"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const postDoc = querySnapshot.docs[0];
          const postData = postDoc.data();
          setPost(postData);
        } else {
          console.log("No matching documents.");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentPosts = async () => {
      const recentPostsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        limit(3)
      );
      const querySnapshot = await getDocs(recentPostsQuery);
      const posts = querySnapshot.docs.map((doc) => doc.data());
      setRecentPosts(posts);
    };

    fetchPost(slug);
    fetchRecentPosts();
  }, [slug]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      await deleteDoc(doc(db, "posts", slug));
      navigate("/");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <main className="p-4 flex flex-col md:flex-row max-w-7xl mx-auto">
      <section className="w-full md:w-2/3 md:pr-4">
        <div
          className="relative h-96 bg-cover bg-center mb-6 rounded-lg shadow-lg"
          style={{ backgroundImage: `url(${post.imageUrl})` }}
        ></div>
        <h2 className="text-4xl font-bold text-green-700 mb-4">{post.title}</h2>
        <p className="text-gray-500 mb-4">
          {new Date(post.createdAt.seconds * 1000).toLocaleDateString()} |{" "}
          {post.gardenLevel} | {post.season} | {post.customCategory}
        </p>
        <p className="text-gray-700 mb-6">{post.content}</p>
        <div className="flex space-x-4 mb-8">
          <a href="#" className="text-blue-500 hover:text-blue-700">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700">
            <FaLinkedin size={24} />
          </a>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-green-700 mb-6">Comments</h3>
          <div className="mb-6">
            <p className="mb-2">
              <strong>John Doe:</strong> Great post! Learned a lot.
            </p>
            <p className="mb-2">
              <strong>Jane Smith:</strong> Can't wait to try these tips in my
              garden.
            </p>
          </div>
        </div>
      </section>
      <aside className="w-full md:w-1/3 md:pl-8">
        <section className="mb-8">
          <h3 className="text-3xl font-bold text-green-700 mb-4">
            Recent Posts
          </h3>
          {recentPosts.map((recentPost, index) => (
            <Link
              to={`/${recentPost.slug}`}
              key={index}
              className="flex items-center mb-4 hover:bg-gray-100 p-2 rounded transition duration-200"
            >
              {recentPost.imageUrl && (
                <img
                  src={recentPost.imageUrl}
                  alt={recentPost.title}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
              )}
              <div>
                <h4 className="text-xl font-semibold text-green-700">
                  {recentPost.title}
                </h4>
                <p className="text-gray-500">{recentPost.excerpt}</p>
              </div>
            </Link>
          ))}
        </section>
        <section className="mb-8">
          <h3 className="text-3xl font-bold text-green-700 mb-4">Categories</h3>
          <ul>
            {categories.map((category, index) => (
              <li key={index} className="mb-2">
                <Link
                  to="/"
                  className="flex justify-between items-center hover:bg-gray-100 p-2 rounded transition duration-200"
                >
                  <span className="text-gray-700">{category}</span>
                  <span className="text-gray-500">(count)</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-3xl font-bold text-green-700 mb-4">
            Newsletter Signup
          </h3>
          <p className="text-gray-700 mb-4">
            Join our newsletter to stay updated!
          </p>
          <input
            type="email"
            placeholder="Your email"
            className="block w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
            Sign Up
          </button>
        </section>
      </aside>
    </main>
  );
};

export default SinglePost;
