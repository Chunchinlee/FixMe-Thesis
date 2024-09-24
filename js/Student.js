// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
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
const database = getDatabase();

// Handle login and redirect to student.html
submitData.addEventListener('click', (e) => {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      var lgDate = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: lgDate,
      }).then(() => {
        // Redirect to student.html with email and user ID as URL parameters
        window.location.href = `student.html?email=${encodeURIComponent(email)}&uid=${user.uid}`;
      }).catch((error) => {
        alert(error.message);
      });
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Separate student.js functionality starts here

// Get URL parameters from student.html
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
const uid = urlParams.get('uid');

// If we're on the student.html page, execute the following logic
if (window.location.pathname.includes('student.html')) {
  document.getElementById('userEmail').textContent = email;

  get(ref(database, 'users/' + uid)).then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      document.getElementById('userName').textContent = userData.name;
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}
