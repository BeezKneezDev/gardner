// src/components/SignIn.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { signInWithGoogle } from "../firebase/auth";
import { useAuth } from "../context/AuthContext"; // Import the auth context

const SignIn = () => {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    if (currentUser) {
      navigate("/profile"); // Redirect using navigate
    }
  }, [currentUser, navigate]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/profile"); // Redirect using navigate
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Sign In</h1>
      <button
        onClick={handleSignIn}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Sign in with Google
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SignIn;
