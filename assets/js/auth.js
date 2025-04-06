// Login functionality
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // In a real app, you would validate and make an API call
        if (email && password) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'home.html';
        } else {
            alert('Vui lòng nhập email và mật khẩu');
        }
    });
}

// Registration functionality
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Simple validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Mật khẩu không khớp');
            return;
        }
        
        if (password.length < 6) {
            alert('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }
        
        // In a real app, you would make an API call to register the user
        localStorage.setItem('isLoggedIn', 'true');
        alert('Đăng ký thành công! Bạn sẽ được chuyển đến trang chủ.');
        window.location.href = 'home.html';
    });
}