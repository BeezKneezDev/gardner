// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-green-600 text-white p-4 flex justify-between items-center">
      <div className="text-3xl font-bold">
        <Link to="/">Beezkneez</Link>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/blog" className="hover:underline">Blog</Link></li>
          <li><Link to="/create-blog" className="hover:underline">Create Blog</Link></li>
          <li><Link to="/garden-tips" className="hover:underline">Garden Tips</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
