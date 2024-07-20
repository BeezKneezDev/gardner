// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import GardenTips from "./pages/GardenTips";
import Contact from "./pages/Contact";
import CreateBlog from "./pages/CreateBlog";
import SinglePost from "./pages/SinglePost";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Home />} />
            <Route path="/:slug" element={<SinglePost />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/garden-tips" element={<GardenTips />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/posts" element={<CategoryPage />} />{" "}
            {/* Add the new category page route */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<UpdateProfile />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
