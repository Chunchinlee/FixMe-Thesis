import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const auth = getAuth();
const database = getDatabase();

auth.onAuthStateChanged(async (user) => {
  if (user) {
    const uid = user.uid;
    const email = user.email;
    
    // Update the UI with user information
    document.getElementById('loggedUser').innerText = user.displayName || "User"; // Assuming you want to display displayName, if not, set a default
    document.getElementById('loggedEmail').innerText = email;

    // Fetch additional user data from the database if needed
    const userRef = ref(database, 'users/' + uid);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      // If you have a name in your database, you can set it here
      document.getElementById('loggedUser').innerText = userData.name || user.displayName || "User"; // Adjust based on your data structure
    }
  } else {
    // User is signed out
    window.location.href = 'Login.html'; // Redirect to login page or handle accordingly
  }
});
