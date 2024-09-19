// JavaScript for "Get Code" button functionality
document.getElementById('getCodeBtn').addEventListener('click', function() {
    alert("Code has been sent!");
    // Logic to send code (could be an email, SMS, etc.) would go here
  });
  
  // Function to validate password
  function validatePassword(password) {
    // Regular expression to check if password starts with uppercase and has at least one special character
    const passwordPattern = /^[A-Z](?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
    return passwordPattern.test(password);
  }
  
  // Event listener for form submission
  document.getElementById('recoveryForm').addEventListener('submit', function(event) {
    const password = document.getElementById('passwordInput').value;
    if (!validatePassword(password)) {
      event.preventDefault(); // Prevent form submission
      alert("Password must start with an uppercase letter and contain at least one special character.");
    }
  });
  