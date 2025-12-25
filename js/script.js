/* ========================================
   TOGGLE SIDEBAR
======================================== */

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const icon = document.getElementById('toggle-icon');
    
    sidebar.classList.toggle('collapsed');
    
    // Ganti icon panah
    if (sidebar.classList.contains('collapsed')) {
        // Panah ke kanan (collapsed state)
        icon.innerHTML = '<polyline points="9 18 15 12 9 6"></polyline>';
    } else {
        // Panah ke kiri (expanded state)
        icon.innerHTML = '<polyline points="15 18 9 12 15 6"></polyline>';
    }
}

/* ========================================
   SET ACTIVE MENU
======================================== */

function setActiveMenu() {
    // Ambil semua menu items
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Get current page URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    menuItems.forEach(item => {
        const itemHref = item.getAttribute('href').split('/').pop();
        
        // Remove active class dari semua
        item.classList.remove('active');
        
        // Hapus dot jika ada
        const existingDot = item.querySelector('.active-dot');
        if (existingDot) {
            existingDot.remove();
        }
        
        // Tambah active ke menu yang sesuai
        if (itemHref === currentPage) {
            item.classList.add('active');
            
            // Tambah dot kuning
            const dot = document.createElement('span');
            dot.className = 'active-dot';
            item.appendChild(dot);
        }
    });
}

/* ========================================
   SMOOTH SCROLL
======================================== */

function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

/* ========================================
   INIT WHEN PAGE LOADS
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Set active menu based on current page
    setActiveMenu();
    
    // Add click event untuk semua tryout items
    const tryoutItems = document.querySelectorAll('.tryout-item');
    tryoutItems.forEach(item => {
        item.addEventListener('click', function() {
            alert('Tryout item clicked!');
        });
    });
    
    // Add click event untuk stats cards
    const statsCards = document.querySelectorAll('.stats-card');
    statsCards.forEach(card => {
        card.addEventListener('click', function() {
            alert('Stats card clicked!');
        });
    });
});

/* ========================================
   RESPONSIVE SIDEBAR
======================================== */

// Auto collapse sidebar di mobile
function checkScreenSize() {
    const sidebar = document.getElementById('sidebar');
    
    if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
    }
}

// Check saat page load
window.addEventListener('load', checkScreenSize);

// Check saat window resize
window.addEventListener('resize', checkScreenSize);

/* ========================================
   NOTIFICATIONS
======================================== */

function showNotification(message) {
    // Bisa dikembangkan dengan toast notification
    alert(message);
}

/* ========================================
   UTILITY FUNCTIONS
======================================== */

// Format tanggal
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Format angka dengan separator
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
// Logout Function
function logout() {
    // Hapus semua data login
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    
    // Redirect ke login
    window.location.href = 'login.html';
}

// Load user data
function loadUserData() {
    const userName = localStorage.getItem('userName') || sessionStorage.getItem('userName');
    
    if (userName) {
        // Update nama user di sidebar
        const profileNameElements = document.querySelectorAll('.profile-name');
        profileNameElements.forEach(element => {
            element.textContent = userName;
        });
    }
}

// Call on page load
window.addEventListener('DOMContentLoaded', loadUserData);