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

// Add event listener to the submit button
document.getElementById('submitData').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Sign in the user
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Update last login date in the database
            update(ref(database, 'users/' + user.uid), {
                last_login: new Date().toISOString() // Store the date as a string in ISO format
            }).then(() => {
                // Redirect to Student page
                window.location.href = 'Student.html';
            }).catch((error) => {
                alert("Error updating last login: " + error.message);
            });
        })
        .catch((error) => {
            alert("Login error: " + error.message);
        });
});
