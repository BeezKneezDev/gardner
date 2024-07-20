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
  addDoc,
} from "firebase/firestore";
import { categories } from "../constants";

const SinglePost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        console.log("Slug is undefined, cannot fetch post.");
        return;
      }

      try {
        const q = query(collection(db, "posts"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const postDoc = querySnapshot.docs[0];
          setPost({ id: postDoc.id, ...postDoc.data() });
        } else {
          console.log("No matching documents.");
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
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

    fetchRecentPosts();
  }, []);

  const fetchComments = async (postId) => {
    console.log("Fetching comments for postId:", postId); // Check the postId value
    const commentsQuery = query(
      collection(db, "comments"),
      where("postId", "==", postId),
      orderBy("createdAt", "asc")
    );
    console.log("Using postId for comments query:", postId);

    const querySnapshot = await getDocs(commentsQuery);
    const fetchedComments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Comments fetched:", fetchedComments); // Check what comments are fetched
    setComments(fetchedComments);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!post || !post.id) {
      console.error("Post data is incomplete:", post);
      return; // Stop the function if post or post.id is undefined
    }
    const commentData = {
      postId: post.id,
      content: newComment,
      userId: "currentUserId", // Replace with actual user ID from auth
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "comments"), commentData);
      setNewComment("");
      fetchComments(post.id); // Re-fetch comments to display the new one
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  useEffect(() => {
    if (post) {
      fetchComments(post.id);
    }
  }, [post]); // Dependency on post ensures it runs after post is fetched and set

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
          {post.categories.map((categoryId, index) => (
            <React.Fragment key={categoryId}>
              {categories.find((cat) => cat.id === categoryId).name}

              {index < post.categories.length - 1 ? " | " : ""}
            </React.Fragment>
          ))}
        </p>
        <p className="text-gray-700 mb-6">{post.content}</p>

        <div>
          <h3 className="text-3xl font-bold text-green-700 mb-6">Comments</h3>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="mb-2">
                <strong>{comment.userId}</strong>: {comment.content}
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}

          <div>
            <h4>Add a Comment</h4>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                required
              ></textarea>
              <button type="submit">Post Comment</button>
            </form>
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
      </aside>
    </main>
  );
};

export default SinglePost;
