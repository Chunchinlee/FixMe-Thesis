import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Ensure the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('email');
  const uid = urlParams.get('uid');

  if (window.location.pathname.includes('Student.html')) {
    document.getElementById('userEmail').textContent = email;

    const database = getDatabase();
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
});
