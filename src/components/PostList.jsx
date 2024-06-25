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
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <div key={post.id} className="relative p-4 border rounded overflow-hidden">
            {post.imageUrl && (
              <div className="relative">
                <img src={post.imageUrl} alt={post.title} className="mb-4 rounded w-full" />
                <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-br">
                  {post.gardenLevel} | {post.season} | {post.category}
                </div>
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4">{post.excerpt}</p>
            <Link to={`/${post.slug}`} className="text-blue-500 hover:underline">Read More</Link>
          </div>
        ))}
      </div>
  );
};

export default PostList;
