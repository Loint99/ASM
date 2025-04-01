document.addEventListener('DOMContentLoaded', function() {
    // ====== Mobile Menu Toggle ======
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Toggle body overflow when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // ====== Smooth Scroll ======
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Desktop navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
            history.pushState(null, null, target);
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Mobile navigation
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
            history.pushState(null, null, target);
            
            // Update active state
            document.querySelectorAll('.mobile-nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // ====== Modal Functionality ======
    const modalOverlay = document.getElementById('modalOverlay');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const loginButtons = document.querySelectorAll('.login-btn');
    const signupButtons = document.querySelectorAll('.signup-btn');
    const closeButtons = document.querySelectorAll('.modal-close');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');

    // Open Login Modal
    loginButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalOverlay.classList.add('active');
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Open Signup Modal
    signupButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalOverlay.classList.add('active');
            signupModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Modals
    function closeModal() {
        modalOverlay.classList.remove('active');
        loginModal.classList.remove('active');
        signupModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    modalOverlay.addEventListener('click', closeModal);

    // Switch between Login and Signup
    if (showSignup) {
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
            setTimeout(() => {
                modalOverlay.classList.add('active');
                signupModal.classList.add('active');
            }, 300);
        });
    }

    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
            setTimeout(() => {
                modalOverlay.classList.add('active');
                loginModal.classList.add('active');
            }, 300);
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // ====== Active Link on Scroll ======
    function updateActiveLink() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - headerHeight;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.getAttribute('id');
                
                // Update desktop nav
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
                
                // Update mobile nav
                document.querySelectorAll('.mobile-nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Initial check
    updateActiveLink();

    // Update on scroll
    window.addEventListener('scroll', updateActiveLink);

    // ====== Form Submission ======
    document.getElementById('loginForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your login logic here
        alert('Đăng nhập thành công!');
        closeModal();
    });

    document.getElementById('signupForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your signup logic here
        alert('Đăng ký thành công!');
        closeModal();
    });
});