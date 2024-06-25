// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Header = () => {
  return (
    <header className=" text-white">
      <div className=" bg-green-600 ">
        <div className="flex justify-end mx-auto max-w-7xl py-3">
          <a href="#" className="text-white  mx-2">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-white  mx-2">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-white  mx-2">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
      <div className=" flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="text-3xl font-bold text-green-600">
          <Link to="/">Beezkneez</Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:underline text-green-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline text-green-600">
                About
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:underline text-green-600">
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/create-blog"
                className="hover:underline text-green-600"
              >
                Create Blog
              </Link>
            </li>
            <li>
              <Link
                to="/garden-tips"
                className="hover:underline text-green-600"
              >
                Garden Tips
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline text-green-600">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
