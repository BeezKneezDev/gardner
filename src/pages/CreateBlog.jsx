// src/pages/CreateBlog.jsx
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/firebase';
import CategorySelect from '../components/CategorySelect';
import slugify from 'slugify';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [gardenLevel, setGardenLevel] = useState('new gardener');
  const [season, setSeason] = useState('summer');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Generate slug from title
      const slug = slugify(title, { lower: true });

      await addDoc(collection(db, 'posts'), {
        title,
        excerpt,
        content,
        imageUrl,
        gardenLevel,
        season,
        category,
        slug,
        createdAt: new Date(),
      });

      setTitle('');
      setExcerpt('');
      setContent('');
      setImage(null);
      setGardenLevel('');
      setSeason('');
      setCategory('');
      alert('Blog post created successfully!');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <main className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt</label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            accept="image/*"
          />
        </div>

        <CategorySelect
          label="Garden Level"
          id="gardenLevel"
          value={gardenLevel}
          onChange={(e) => setGardenLevel(e.target.value)}
          options={['Newbee', 'Worker Bee', 'Queen Bee']}
        />

        <CategorySelect
          label="Season"
          id="season"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          options={['Summer', 'Winter', 'Spring', 'Autumn']}
        />

        <CategorySelect
          label="Category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={['Planting', 'Recipes', 'Tips']}
        />

        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Create Post
        </button>
      </form>
    </main>
  );
};

export default CreateBlog;
