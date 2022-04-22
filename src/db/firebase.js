// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJGEt_aAgVCah0QhZUOn_LOSpeqrFyskY",
  authDomain: "user-admin-app-74d26.firebaseapp.com",
  projectId: "user-admin-app-74d26",
  storageBucket: "user-admin-app-74d26.appspot.com",
  messagingSenderId: "688336500458",
  appId: "1:688336500458:web:a2ea6d186729c979b98993",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
