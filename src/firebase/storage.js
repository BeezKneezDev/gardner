// src/firebase/storage.js

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase'; // Ensure you import 'storage' correctly from firebase.js

export const uploadFileToStorage = async (file, path) => {
  const storageRef = ref(storage, path);

  try {
    // Upload file to Firebase Storage
    await uploadBytes(storageRef, file);

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file to Firebase Storage:", error);
    throw error;
  }
};
