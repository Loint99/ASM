// Settings Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const settingsMenuItems = document.querySelectorAll('.settings-menu li');
    const settingsContents = document.querySelectorAll('.settings-content');
    
    settingsMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all items and contents
            settingsMenuItems.forEach(menuItem => menuItem.classList.remove('active'));
            settingsContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current item and content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Avatar upload
    const avatarInput = document.getElementById('avatarInput');
    const avatarPreview = document.getElementById('avatarPreview');
    const changeAvatar = document.getElementById('changeAvatar');
    const removeAvatar = document.getElementById('removeAvatar');
    
    if (changeAvatar && avatarInput && avatarPreview) {
        changeAvatar.addEventListener('click', function() {
            avatarInput.click();
        });
        
        avatarInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    avatarPreview.src = e.target.result;
                }
                
                reader.readAsDataURL(file);
            }
        });
    }
    
    if (removeAvatar) {
        removeAvatar.addEventListener('click', function() {
            if (avatarPreview) {
                avatarPreview.src = 'assets/images/default-avatar.jpg';
            }
            if (avatarInput) {
                avatarInput.value = '';
            }
        });
    }
    
    // Password strength indicator
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthBars = document.querySelectorAll('.strength-bar');
            const strengthText = document.querySelector('.strength-text');
            
            let strength = 0;
            
            // Check password length
            if (password.length > 0) strength += 1;
            if (password.length >= 8) strength += 1;
            
            // Check for mixed case
            if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
            
            // Check for numbers
            if (/\d/.test(password)) strength += 1;
            
            // Check for special chars
            if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
            
            // Update UI
            strengthBars.forEach((bar, index) => {
                if (index < strength) {
                    bar.style.backgroundColor = getStrengthColor(strength);
                } else {
                    bar.style.backgroundColor = '#eee';
                }
            });
            
            if (strengthText) {
                strengthText.textContent = getStrengthText(strength);
                strengthText.style.color = getStrengthColor(strength);
            }
        });
        
        function getStrengthColor(strength) {
            switch (strength) {
                case 1: return '#e74c3c'; // Weak
                case 2: return '#f39c12'; // Moderate
                case 3: return '#3498db'; // Good
                case 4: 
                case 5: return '#2ecc71'; // Strong
                default: return '#eee';
            }
        }
        
        function getStrengthText(strength) {
            switch (strength) {
                case 0: return '';
                case 1: return 'Mật khẩu yếu';
                case 2: return 'Mật khẩu trung bình';
                case 3: return 'Mật khẩu khá';
                case 4: 
                case 5: return 'Mật khẩu mạnh';
                default: return '';
            }
        }
    }
    
    // Form submissions
    const forms = document.querySelectorAll('.settings-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Cài đặt đã được lưu thành công!');
        });
    });
});