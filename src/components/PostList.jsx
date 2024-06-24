// src/components/PostList.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="mb-4 p-4 border rounded shadow">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="mt-2">{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
