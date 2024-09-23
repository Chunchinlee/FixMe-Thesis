// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
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
const database = getDatabase();

// Reference to login button
const logindata = document.getElementById('logindata');

if (logindata) {
  logindata.addEventListener('click', (e) => {
    // Prevent form default submission if needed
    e.preventDefault();

    // Capture user input
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Sign in the user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update last login timestamp
        var lgDate = new Date();
        update(ref(database, 'users/' + user.uid), {
          last_login: lgDate,
        })
          .then(() => {
            alert('User Logged in Successfully');
          })
          .catch((error) => {
            alert('Error updating last login: ' + error.message);
          });
      })
      .catch((error) => {
        alert('Error signing in: ' + error.message);
      });
  });
} else {
  console.log('Login button not found');
}
