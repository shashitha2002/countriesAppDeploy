// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Add this import
//import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw3P-p7G3P5g9JmN7JidDyvvP5Vjey6w4",
  authDomain: "countriesapp-e623c.firebaseapp.com",
  projectId: "countriesapp-e623c",
  storageBucket: "countriesapp-e623c.firebasestorage.app",
  messagingSenderId: "545769538591",
  appId: "1:545769538591:web:69b91d9fe314877d00c12a",
  measurementId: "G-NW3EV2ZN8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);  // Add this line to export auth