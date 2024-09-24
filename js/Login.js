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

const userSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user);
    } catch (error) {
        console.error('Error during sign in:', error.message);
    }
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        alert("You have Signed in!");
    } else {
        // Handle signed out state if needed
    }
});

signInButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSignIn)