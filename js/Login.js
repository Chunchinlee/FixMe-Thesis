import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Handle form submission for Log In
document.getElementById('Login').addEventListener('click', (e) => {
  e.preventDefault();  // Make sure to prevent default form submission
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const dt = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: dt,
      })
      alert('User Logged in!');
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
