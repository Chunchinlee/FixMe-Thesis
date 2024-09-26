// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getDatabase, ref, update, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

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
const db = getDatabase(app);

const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");

// User Sign-In
const userSignIn = async() => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      
      // Store user data in Firebase Realtime Database
      const userRef = ref(db, 'users/' + user.uid);
      update(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        isVerified: false // Set isVerified to false initially
      });

      console.log("User signed in:", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error during sign in:", errorCode, errorMessage);
    });
}

// User Sign-Out
const userSigOut = async() => {
  signOut(auth)
    .then(() => {
      alert("You have signed out successfully!");
    })
    .catch((error) => {
      console.error("Error during sign out:", error);
    });
}

// Check for Auth State Change
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, now check if the user is verified
    const userRef = ref(db, 'users/' + user.uid);
    
    // Retrieve user data from Firebase
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        
        if (userData.isVerified) {
          alert("Welcome, " + userData.displayName + "!");
          // Allow access to the site
        } else {
          alert("Your account is not verified. Please contact support.");
          userSigOut(); // Sign the user out if not verified
        }
      } else {
        console.log("No user data available");
      }
    }).catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }
});

signInButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSigOut);
