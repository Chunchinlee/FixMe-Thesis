// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
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

// Event listener for submitData button
const submitData = document.getElementById('submitData');
submitData.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default form submission

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      // Fetch user data from the database
      get(ref(database, 'users/' + user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          // Populate the HTML elements with the user's data
          document.getElementById('userName').textContent = userData.username;
          document.getElementById('loggedUser').textContent = userData.username;
          document.getElementById('loggedEmail').textContent = userData.email;

          // Optionally update the last login date
          var lgDate = new Date();
          update(ref(database, 'users/' + user.uid), {
            last_login: lgDate,
          });
        } else {
          console.log("No user data available");
        }
      }).catch((error) => {
        console.error(error);
      });

      alert('User Logged in Successfully');
      window.location.assign('../Student.html');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// Logout functionality
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
  signOut(auth).then(() => {
    alert('User signed out successfully');
    window.location.assign('../login.html'); // Redirect to login page
  }).catch((error) => {
    console.error('Sign-out error:', error);
  });
});
