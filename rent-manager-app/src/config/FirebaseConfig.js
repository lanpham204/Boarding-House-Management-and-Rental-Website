// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBApR-cm8YHD5BLTqXtwBfBQ5CkLCYx2bw",
    authDomain: "chatapp-211f4.firebaseapp.com",
    projectId: "chatapp-211f4",
    storageBucket: "chatapp-211f4.appspot.com",
    messagingSenderId: "668139965224",
    appId: "1:668139965224:web:cbf7774a312b3a4429de1d",
    measurementId: "G-G9VNGEZ46S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);