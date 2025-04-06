// Competition Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabNavItems = document.querySelectorAll('.competition-tabs .tab-nav li');
    const tabContents = document.querySelectorAll('.competition-tabs .tab-content');
    
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
    
    // Register button click
    const registerButtons = document.querySelectorAll('.competition-actions .btn-primary');
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Bạn đã đăng ký thành công cuộc thi này!');
        });
    });
});