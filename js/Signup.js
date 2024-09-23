// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, setDoc, doc, update } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
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

// Initialize Firebasef
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display="block";
  setTimeout(function(){
    messageDiv.style.opacity=0;
  },5000);
}

const SignUp = document.getElementById('addstudent');
SignUp.addEventListener('click', (event) =>{
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const username = document.getElementById('username').value;
  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
     const userData = {
      email: email,
      username: username,
      password: password  
     };
     showMessage('Account Created Successfully', 'signUpMessage');
     const docRef = doc (db, "Students", users.uid);
     setDoc(docRef, userData)
     .then(() =>{
      window.location.href='Login.htmk';
     })
     .catch((error) =>{
      console.error("Error Writting Document", error)

     })
  })
  .catch((error) =>{
    const errorCode = error.code;
    if(errorCode == 'auth/email-already-in-use'){
      showMessage('Email Already Exist!', 'signUpMessage');
    }
    else{
      showMessage('Unable to Create User!', 'signUpMessage')
    }
  })
})
