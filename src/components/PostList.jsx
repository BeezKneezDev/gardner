// src/components/PostList.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, 'posts');
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsList);
    };

    fetchPosts();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <div key={post.id} className="border p-4 rounded shadow">
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mb-4 rounded" />}
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <p className="text-gray-700">{post.excerpt}</p>
          <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline">Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
