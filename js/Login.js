// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
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
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      if (!user.emailVerified) {
        sendEmailVerification(user)
          .then(() => {
            alert('Verification email sent! Check your inbox.');
          })
          .catch((error) => {
            alert('Error sending verification email: ' + error.message);
          });
      }

      const lgDate = new Date().toISOString();
      update(ref(database, 'users/' + user.uid), {
        last_login: lgDate,
      })
      .then(() => {
        alert('User Logged in Successfully');
      })
      .catch((error) => {
        alert(error.message);
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
