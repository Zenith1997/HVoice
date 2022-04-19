import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK7FDXv27kNYaKslOKZZKj2rNIjqdrgN8",
  authDomain: "fir-auth-a2274.firebaseapp.com",
  projectId: "fir-auth-a2274",
  storageBucket: "fir-auth-a2274.appspot.com",
  messagingSenderId: "952650278180",
  appId: "1:952650278180:web:67451c3f2d2b5f589a3fb1"
};

initializeApp(firebaseConfig);

const auth = getAuth();

const storage = getStorage()

export { auth, storage };
