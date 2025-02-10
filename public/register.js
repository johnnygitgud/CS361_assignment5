// script.js

document.getElementById('add-user-form-ajax').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Display message on the page
    document.getElementById('register-message').innerText = 'You have successfully registered!';
    
    // Redirect to login page after a short delay
    setTimeout(function() {
        window.location.href = '/login';
    }, 2000); // 2 seconds delay
});
