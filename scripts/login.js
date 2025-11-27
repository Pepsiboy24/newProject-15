// 1. Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 2. Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCap2oaoa7E4mugwjpwsmTnWZfMTggvAxE",
  authDomain: "events-581de.firebaseapp.com",
  projectId: "events-581de",
  storageBucket: "events-581de.firebasestorage.app",
  messagingSenderId: "595844837268",
  appId: "1:595844837268:web:fad8d9fbcb17b16d996981",
  measurementId: "G-R9QEJ8KGTJ",
  databaseURL: "https://events-581de-default-rtdb.europe-west1.firebasedatabase.app"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 4. Handle the Login
const loginForm = document.getElementById('login-form');
const submitBtn = document.getElementById('submit-btn')
const errorDisplay = document.getElementById('error-message');

submitBtn.addEventListener('click', (e) => {
    console.log("click")
    // e.preventDefault(); // Stop page from reloading

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            console.log("Logged in as:", user.email);
            
            // Redirect to your dashboard
            window.location.href = "./admin-dashboard.html";
        })
        .catch((error) => {
            // Handle Errors
            console.error(error.code, error.message);
            errorDisplay.innerText = "Error: " + error.message;
        });
});

// 5. (Optional but recommended) Check if user is already logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, maybe redirect them straight to dashboard?
    console.log("User is already active:", user.uid);
  } else {
    // User is signed out
    console.log("No user signed in");
  }
});