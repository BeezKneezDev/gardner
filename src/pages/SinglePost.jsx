// src/pages/SinglePost.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = doc(db, 'posts', id);
      const postSnapshot = await getDoc(postDoc);
      if (postSnapshot.exists()) {
        setPost({ id: postSnapshot.id, ...postSnapshot.data() });
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-4">
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mb-4 rounded" />}
      <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <p className="text-gray-500">Published on {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}</p>
    </main>
  );
};

export default SinglePost;
