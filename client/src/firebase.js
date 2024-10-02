// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-site-8c249.firebaseapp.com",
  projectId: "mern-blog-site-8c249",
  storageBucket: "mern-blog-site-8c249.appspot.com",
  messagingSenderId: "168632992001",
  appId: "1:168632992001:web:42e9c4320cb308ffc2db00"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);