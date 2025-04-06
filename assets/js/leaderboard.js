// Leaderboard Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabNavItems = document.querySelectorAll('.leaderboard-tabs .tab-nav li');
    const tabContents = document.querySelectorAll('.leaderboard-tabs .tab-content');
    
    tabNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabNavItems.forEach(navItem => navItem.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current tab and content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Pagination
    const pageItems = document.querySelectorAll('.pagination .page-item');
    pageItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('disabled')) return;
            
            pageItems.forEach(page => page.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, this would load the new page data
        });
    });
});