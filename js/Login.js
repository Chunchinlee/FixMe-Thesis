// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ0PlYIIMJOHh2xueY5XdG4hdLu9aQAu0",
  authDomain: "fixme-a1b21.firebaseapp.com",
  databaseURL: "https://fixme-a1b21-default-rtdb.firebaseio.com",
  projectId: "fixme-a1b21",
  storageBucket: "fixme-a1b21.appspot.com",
  messagingSenderId: "522121216989",
  appId: "1:522121216989:web:4834570c0400d50e856c34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");
const message = document.getElementById("message");
const userName = document.getElementById("userName");

signInButton.style.display ="none";
message.style.display = "none";
const userSignIn = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);  // Add this to log the error for debugging
    });
}

const userSignOut = async () => {
  signOut(auth)
    .then(() => {
      alert("You have signed out successfully!");
    })
    .catch((error) => {
      console.log(error);  // Add this to log the error for debugging
    });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    signOutButton.style.display = "block"; // Show sign-out button
    message.style.display = "block";
    userName.innerHTML = user.displayName;
  } else {
    signOutButton.style.display = "none"; // Hide sign-out button
    message.style.display = "none";
  }
});

signInButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSigOut);



