class Dashboard {
    constructor() {
        this.logoutBtn = document.getElementById('logout-btn');
        this.initEventListeners();
    }

    initEventListeners() {
        // Logout button
        this.logoutBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogout();
        });
    }

    handleLogout() {
        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            // In a real app, you would make an API call here
            console.log('User logged out');
            // Redirect to home page
            window.location.href = 'index.html';
        }
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new Dashboard();
});