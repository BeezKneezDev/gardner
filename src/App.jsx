// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Cover from './components/Cover';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import GardenTips from './pages/GardenTips';
import Contact from './pages/Contact';
import CreateBlog from './pages/CreateBlog';
import SinglePost from './pages/SinglePost';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/garden-tips" element={<GardenTips />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post/:id" element={<SinglePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
