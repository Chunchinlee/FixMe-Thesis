// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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

const submit = document.getElementById('submit');
submit.addEventListener("click", function (event){
  event.defaultPrevented()
  
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredentials) =>{
    const user = userCredentials.user;
    alert("Account Created!")
  })
  .catch((error) =>{
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
})

