// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
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

submitData.addEventListener('click', (e) => {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Input validation: Ensure only numbers are allowed for the student number
  if (!/^\d+$/.test(email)) {  // Regex to check if the email field contains only numbers
    alert("Please enter a valid Student Number (numbers only).");
    return; // Stop the form submission if the input is not valid
  }

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    var lgDate = new Date();
    update(ref(database, 'Students/' + user.uid), {
      last_login: lgDate,
    })
      .then(() => {
        alert('User Logged in Successfully');
        window.location.href = 'Student.html';
      })
      .catch((error) => {
        alert(error.message);
      });
  })
  .catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage);
  });
  
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
});
