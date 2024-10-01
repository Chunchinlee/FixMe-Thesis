// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Your web app's Firebase configuration
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

// Ensure submitData button exists
const submitData = document.getElementById('submitData');

console.log(submitData); // Debugging: check if the button is being selected
if (submitData) {
  console.log('Button found!');
} else {
  console.log('Button not found!');
}

submitData.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default form submission
  console.log('Button clicked'); // Debugging: check if the click event is triggered

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var username = document.getElementById('username').value;

  // Create a new user with the provided email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Set the user data in the Realtime Database, including the role as 'student'
      set(ref(database, 'users/' + user.uid), {
        username: username,
        email: email,
        password: password,  // You should not store passwords in the database; this is for example purposes
        role: 'student'  // Assign the 'student' role
      })
        .then(() => {
          alert('User Created Successfully');
        })
        .catch((error) => {
          alert(error.message);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error.message);
    });
});
