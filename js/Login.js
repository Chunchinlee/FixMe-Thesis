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

submitData.addEventListener('click', (e) => {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    var lgDate = new Date();

    update(ref(database, 'users/' + user.uid), {
      last_login: lgDate,
    })
    .then(() => {
      alert('User Logged in Successfully');
      displayUserInfo(user.uid, user.email); // Fetch and display user info
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

function displayUserInfo(uid, email) {
  const usernameRef = ref(database, 'users/' + uid + '/username'); // Adjust path if necessary
  get(usernameRef).then((snapshot) => {
    if (snapshot.exists()) {
      const username = snapshot.val();
      document.getElementById('loggedUser').textContent = username;
      document.getElementById('loggedEmail').textContent = email;
      window.location.href = 'Student.html'; // Redirect after displaying info
    } else {
      console.log("No username available.");
    }
  }).catch((error) => {
    console.error(error);
  });
}
