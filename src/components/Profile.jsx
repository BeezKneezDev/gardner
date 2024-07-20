// src/pages/Profile.jsx

import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import PostList from "./PostList";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
    };

    fetchUserProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-4 flex flex-col max-w-7xl mx-auto">
      <section className="w-full md:pr-4">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={profile.photoURL}
            alt={profile.displayName}
            className="w-24 h-24 object-cover rounded-full"
          />
          <div>
            <h2 className="text-4xl font-bold text-green-700">
              {profile.displayName}
            </h2>
          </div>
          <Link
            to="/profile/edit"
            className="text-blue-500 hover:text-blue-700 ml-auto"
          >
            <FaEdit size={24} />
          </Link>
        </div>
        <div className="mb-6">
          <h3 className="text-3xl font-bold text-green-700 mb-4">
            User Details
          </h3>
          {profile.firstName ? (
            <>
              <p className="text-gray-700 mb-2">
                First Name: {profile.firstName}
              </p>
              <p className="text-gray-700 mb-2">
                Last Name: {profile.lastName}
              </p>
              <p className="text-gray-700 mb-2">
                Display Name: {profile.displayName}
              </p>
              <p className="text-gray-500">Region: {profile.region}</p>
              <p className="text-gray-500">
                Garden Level: {profile.gardenLevel}
              </p>
            </>
          ) : (
            <>
              <p className="text-red-500">
                Update your details to complete your profile before you can use
                the features.
              </p>
              <div className="mt-4">
                <Link
                  to="/update-profile"
                  className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Update Profile
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="mb-6">
          <h3 className="text-3xl font-bold text-green-700 mb-4">
            Liked Posts
          </h3>
          <PostList />
        </div>
        <div className="mb-6">
          <h3 className="text-3xl font-bold text-green-700 mb-4">
            Pinned Messages
          </h3>
          <p className="text-gray-700">No pinned messages yet.</p>
        </div>
        <div className="mb-6">
          <h3 className="text-3xl font-bold text-green-700 mb-4">Alerts</h3>
          <p className="text-gray-700">No alerts at this moment.</p>
        </div>
        <div className="mb-6">
          <h3 className="text-3xl font-bold text-green-700 mb-4">
            Garden Planner
          </h3>
          <p className="text-gray-700">No plans added yet.</p>
        </div>
        <div className="mb-6">
          <h3 className="text-3xl font-bold text-green-700 mb-4">Goals</h3>
          <p className="text-gray-700">No goals set yet.</p>
        </div>
        <div className="mb-6">
          <h3 className="text-3xl font-bold text-green-700 mb-4">
            User Stories
          </h3>
          <p className="text-gray-700">No stories uploaded yet.</p>
        </div>
      </section>
    </main>
  );
};

export default Profile;
