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

// Toggle password visibility
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const toggleIcon = document.querySelector('.toggle-password');
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  toggleIcon.textContent = type === 'password' ? '👁️' : '🙈'; // Change icon based on state
}

// Event listener for the "Log In" button
document.getElementById('submitData').addEventListener('click', (e) => {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Input validation: Ensure only numbers are allowed for the student number
  if (!/^\d+$/.test(email)) {
    alert("Please enter a valid Student Number (numbers only).");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
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
      alert(error.message);
    });
});
