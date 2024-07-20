import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { uploadFileToStorage } from "../firebase/storage";
import { db, auth } from "../firebase/firebase";
import { getAuth, updateProfile } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const regions = [
  "Northland",
  "Auckland",
  "Waikato",
  "Bay of Plenty",
  "Gisborne",
  "Hawke's Bay",
  "Taranaki",
  "Manawatu-Wanganui",
  "Wellington",
  "Tasman",
  "Nelson",
  "Marlborough",
  "West Coast",
  "Canterbury",
  "Otago",
  "Southland",
];

const gardenLevels = ["Newbee", "Worker Bee", "BeezKneez"];

const UpdateProfile = () => {
  const [profile, setProfile] = useState({
    displayName: "",
    firstName: "",
    lastName: "",
    photoURL: "",
    region: "",
    gardenLevel: "",
  });
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoURL = profile.photoURL;
      if (newImage) {
        const path = `profileImages/${auth.currentUser.uid}/${newImage.name}`;
        photoURL = await uploadFileToStorage(newImage, path);
      }

      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        ...profile,
        photoURL,
      });

      // Update the display name and photo URL in Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: profile.displayName,
        photoURL,
      });

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-gray-700"
          >
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            value={profile.displayName}
            onChange={(e) =>
              setProfile({ ...profile, displayName: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="photoURL"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture
          </label>
          {profile.photoURL && (
            <img
              src={profile.photoURL}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full mb-2"
            />
          )}
          <input
            type="file"
            id="photoURL"
            onChange={(e) => setNewImage(e.target.files[0])}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            accept="image/*"
          />
        </div>
        <div>
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700"
          >
            Region
          </label>
          <select
            id="region"
            value={profile.region}
            onChange={(e) => setProfile({ ...profile, region: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Select your region</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="gardenLevel"
            className="block text-sm font-medium text-gray-700"
          >
            Garden Level
          </label>
          <select
            id="gardenLevel"
            value={profile.gardenLevel}
            onChange={(e) =>
              setProfile({ ...profile, gardenLevel: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Select your garden level</option>
            {gardenLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Profile
        </button>
      </form>
    </main>
  );
};

export default UpdateProfile;
