// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK7FDXv27kNYaKslOKZZKj2rNIjqdrgN8",
  authDomain: "fir-auth-a2274.firebaseapp.com",
  projectId: "fir-auth-a2274",
  storageBucket: "fir-auth-a2274.appspot.com",
  messagingSenderId: "952650278180",
  appId: "1:952650278180:web:67451c3f2d2b5f589a3fb1"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };