// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
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

