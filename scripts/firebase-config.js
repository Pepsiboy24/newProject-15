// Firebase configuration


// const firebaseConfig = {
//   apiKey: "AIzaSyDUMMY_API_KEY", // Replace with your actual API key
//   authDomain: "your-project.firebaseapp.com", // Replace with your actual auth domain
//   databaseURL: "https://your-project-default-rtdb.firebaseio.com", // Replace with your actual database URL
//   projectId: "your-project", // Replace with your actual project ID
//   storageBucket: "your-project.appspot.com", // Replace with your actual storage bucket
//   messagingSenderId: "123456789", // Replace with your actual messaging sender ID
//   appId: "1:123456789:web:abcdef" // Replace with your actual app ID
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // Get a reference to the database
// const database = firebase.database();


import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCap2oaoa7E4mugwjpwsmTnWZfMTggvAxE",
  authDomain: "events-581de.firebaseapp.com",
  projectId: "events-581de",
  storageBucket: "events-581de.firebasestorage.app",
  messagingSenderId: "595844837268",
  appId: "1:595844837268:web:fad8d9fbcb17b16d996981",
  measurementId: "G-R9QEJ8KGTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = firebase.database();
// const analytics = getAnalytics(app);