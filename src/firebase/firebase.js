import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCJzFa73zt5jcMfOlDmvO503zt-sn_y0aA",
  authDomain: "blog-bc3b2.firebaseapp.com",
  databaseURL: "https://blog-bc3b2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blog-bc3b2",
  storageBucket: "blog-bc3b2.appspot.com",
  messagingSenderId: "545078579099",
  appId: "1:545078579099:web:e3c1db5d2fb2e426541b3e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };