import { initializeApp } from 'firebase/app';
import "firebase/auth";
import "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK7FDXv27kNYaKslOKZZKj2rNIjqdrgN8",
  authDomain: "fir-auth-a2274.firebaseapp.com",
  projectId: "fir-auth-a2274",
  storageBucket: "fir-auth-a2274.appspot.com",
  messagingSenderId: "952650278180",
  appId: "1:952650278180:web:67451c3f2d2b5f589a3fb1"
};

const app = initializeApp(firebaseConfig);

export { app };
