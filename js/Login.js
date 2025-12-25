// Login Handler
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Demo login - ganti dengan API call yang sebenarnya
    // Untuk demo, email: admin@iris.com, password: admin123
    
    if (email === 'admin@iris.com' && password === 'admin123') {
        // Simpan status login
        if (rememberMe) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', 'Graynaldo Fahrul');
        } else {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userEmail', email);
            sessionStorage.setItem('userName', 'Graynaldo Fahrul');
        }
        
        // Redirect ke dashboard
        window.location.href = 'index.html';
    } else {
        alert('Email atau password salah!\n\nDemo Account:\nEmail: admin@iris.com\nPassword: admin123');
    }
}

// Check if already logged in
window.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true') {
        // Jika sudah login, redirect ke dashboard
        window.location.href = 'index.html';
    }
});