// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIdtGXqHGTxjtYXzYZlBzs_lGLluQoq7I",
  authDomain: "project2-24fd7.firebaseapp.com",
  projectId: "project2-24fd7",
  storageBucket: "project2-24fd7.appspot.com", // Make sure this is accurate, check for any typo
  messagingSenderId: "412854624126",
  appId: "1:412854624126:web:8391e214b1095397665d2f",
  measurementId: "G-JRE7PPLYMP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Export the necessary services
export { auth, googleProvider, facebookProvider };
export default app;
