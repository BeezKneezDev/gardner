// src/pages/SinglePost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDocs, deleteDoc, query, where, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const SinglePost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async (slug) => {
      try {
        const q = query(collection(db, 'posts'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const postDoc = querySnapshot.docs[0];
          const postData = postDoc.data();
          setPost(postData);
        } else {
          console.log('No matching documents.');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost(slug);
  }, [slug]); // Execute fetchPost when slug changes

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      await deleteDoc(doc(db, 'posts', slug));
      navigate('/');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <main className="p-4">
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mb-4 rounded" />}
      <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <p className="text-gray-500">Garden Level: {post.gardenLevel}</p>
      <p className="text-gray-500">Season: {post.season}</p>
      <p className="text-gray-500">Category: {post.customCategory}</p>
      <p className="text-gray-500">Published on {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}</p>
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete Post
      </button>
    </main>
  );
};

export default SinglePost;
