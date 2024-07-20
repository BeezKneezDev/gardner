import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { uploadFileToStorage } from "../firebase/storage";
import slugify from "slugify";
import { categories as categoriesList } from "../constants"; // Rename import if needed

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]); // Renamed state variable

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadFileToStorage(image, `images/${image.name}`);
      }

      const slug = slugify(title, { lower: true });

      await addDoc(collection(db, "posts"), {
        title,
        excerpt,
        content,
        imageUrl,
        categories: selectedCategories, // Use new state variable for database
        slug,
        createdAt: new Date(),
      });

      setTitle("");
      setExcerpt("");
      setContent("");
      setImage(null);
      setSelectedCategories([]); // Reset new state variable

      alert("Blog post created successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <main className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
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
          <label
            htmlFor="excerpt"
            className="block text-sm font-medium text-gray-700"
          >
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            accept="image/*"
          />
        </div>
        <fieldset>
          <legend>Categories</legend>
          {categoriesList.map(
            (
              category // Use renamed constant array
            ) => (
              <div key={category.id}>
                <input
                  type="checkbox"
                  id={category.id}
                  value={category.id}
                  onChange={handleCategoryChange}
                  checked={selectedCategories.includes(category.id)} // Use new state variable
                />
                <label htmlFor={category.id}> {category.name}</label>
              </div>
            )
          )}
        </fieldset>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Post
        </button>
      </form>
    </main>
  );
};

export default CreateBlog;
