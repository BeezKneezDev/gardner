import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="p-6 bg-gray-800 text-white text-center">
      <div className="mb-6">
        <Link to="/about" className="text-gray-400 hover:text-yellow-500 mx-4">
          About
        </Link>
        <Link
          to="/contact"
          className="text-gray-400 hover:text-yellow-500 mx-4"
        >
          Contact
        </Link>
        <Link
          to="/privacy-policy"
          className="text-gray-400 hover:text-yellow-500 mx-4"
        >
          Privacy Policy
        </Link>
      </div>
      <div className="flex justify-center mb-4">
        <a href="#" className="text-gray-400 hover:text-yellow-500 mx-2">
          <FaFacebook size={24} />
        </a>
        <a href="#" className="text-gray-400 hover:text-yellow-500 mx-2">
          <FaTwitter size={24} />
        </a>
        <a href="#" className="text-gray-400 hover:text-yellow-500 mx-2">
          <FaLinkedin size={24} />
        </a>
      </div>
      <div className="text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Beezkneez Kiwi Gardener. All rights
        reserved.
      </div>
    </footer>
  );
}

export default Footer;
