/**
 * CodeLean Education - Main JavaScript File
 * Version: 1.1.0
 * Author: CodeLean Team
 */

// Cache DOM elements
const DOM = {
    header: null,
    footer: null,
    hamburger: null,
    navMenu: null,
    userDropdown: null,
    dropdownMenu: null,
    logoutBtn: null,
    logoLink: null
  };
  
  // HTML cache
  const htmlCache = {};
  
  // App state
  const state = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    userData: JSON.parse(localStorage.getItem('userData')) || null
  };
  
  /**
   * Initialize the application
   */
  function init() {
    cacheDOM();
    bindEvents();
    loadTemplates();
    checkAuthState();
    checkProtectedPages();
  }
  
  /**
   * Cache DOM elements
   */
  function cacheDOM() {
    DOM.hamburger = document.querySelector('.hamburger');
    DOM.navMenu = document.querySelector('.nav-menu'); 
    DOM.userDropdown = document.querySelector('.user-dropdown');
    DOM.dropdownMenu = document.querySelector('.dropdown-menu');
    DOM.logoutBtn = document.getElementById('logout');
    DOM.logoLink = document.getElementById('logo-link');
  }
  
  /**
   * Bind event listeners
   */
  function bindEvents() {
    if (DOM.hamburger) {
      DOM.hamburger.addEventListener('click', toggleMobileMenu);
    }
  
    if (DOM.userDropdown) {
      DOM.userDropdown.addEventListener('click', toggleUserDropdown);
    }
  
    if (DOM.logoutBtn) {
      DOM.logoutBtn.addEventListener('click', handleLogout);
    }
  
    if (DOM.logoLink) {
      DOM.logoLink.addEventListener('click', handleLogoClick); // Sửa từ logoutBtn thành logoLink
    }
  
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.user-dropdown') && DOM.dropdownMenu) {
        DOM.dropdownMenu.classList.remove('active');
      }
    });
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', smoothScroll);
    });
  
    document.querySelectorAll('.course-card').forEach(card => {
      card.addEventListener('mouseenter', handleCourseCardHover);
      card.addEventListener('mouseleave', handleCourseCardLeave);
    });
  }
  
  /**
   * Load HTML templates (header, footer)
   */
  function loadTemplates() {
    loadHTML('header', 'layout/header.html');
    loadHTML('footer', 'layout/footer.html');
  }
  
  /**
   * Load HTML content dynamically
   * @param {string} id - Element ID
   * @param {string} file - File path
   */
  function loadHTML(id, file) {
    if (htmlCache[file]) {
      document.getElementById(id).innerHTML = htmlCache[file];
      if (id === 'header') initHeaderEvents();
      return;
    }
  
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(data => {
        htmlCache[file] = data;
        document.getElementById(id).innerHTML = data;
        if (id === 'header') initHeaderEvents();
      })
      .catch(error => {
        console.error(`Error loading ${file}:`, error);
        if (id === 'header') document.getElementById(id).innerHTML = '<div>Header failed to load</div>';
        if (id === 'footer') document.getElementById(id).innerHTML = '<div>Footer failed to load</div>';
      });
  }
  
  /**
   * Initialize header events after loading
   */
  function initHeaderEvents() {
    cacheDOM();
    bindEvents();
    checkAuthState();
  }
  
  /**
   * Toggle mobile menu
   */
  function toggleMobileMenu() {
    DOM.hamburger.classList.toggle('active');
    DOM.navMenu.classList.toggle('active');
  }
  
  /**
   * Toggle user dropdown
   * @param {Event} e - Click event
   */
  function toggleUserDropdown(e) {
    e.preventDefault();
    DOM.dropdownMenu.classList.toggle('active');
  }
  
  /**
   * Handle logout
   * @param {Event} e - Click event
   */
  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    window.location.href = '/index.html';
  }
  
  /**
   * Handle logo click
   * @param {Event} e - Click event
   */
  function handleLogoClick(e) {
    e.preventDefault();
    window.location.href = state.isLoggedIn ? '/home.html' : '/index.html';
  }
  
  /**
   * Check authentication state
   */
  function checkAuthState() {
    if (state.isLoggedIn) {
      document.body.classList.add('logged-in');
      updateUserUI();
    } else {
      document.body.classList.remove('logged-in');
    }
  }
  
  /**
   * Update user UI elements
   */
  function updateUserUI() {
    if (state.userData) {
      const usernameElements = document.querySelectorAll('.username');
      const avatarElements = document.querySelectorAll('.user-avatar');
      
      usernameElements.forEach(el => {
        el.textContent = state.userData.name || 'User';
      });
      
      if (state.userData.avatar) {
        avatarElements.forEach(el => {
          el.src = state.userData.avatar;
        });
      }
    }
  }
  
  /**
   * Check protected pages
   */
  function checkProtectedPages() {
    const protectedPages = ['/home.html', '/profile.html', '/settings.html'];
    const currentPage = window.location.pathname.split('/').pop();
  
    if (state.isLoggedIn && currentPage === 'index.html') {
      window.location.href = '/home.html';
    }
  
    if (!state.isLoggedIn && protectedPages.includes(currentPage)) {
      window.location.href = '/index.html';
    }
  }
  
  /**
   * Smooth scroll to target
   * @param {Event} e - Click event
   */
  function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
  
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      if (history.pushState) {
        history.pushState(null, null, targetId);
      } else {
        location.hash = targetId;
      }
    }
  }
  
  /**
   * Handle course card hover
   */
  function handleCourseCardHover() {
    const img = this.querySelector('.course-image img');
    if (img) {
      img.style.transform = 'scale(1.05)';
    }
  }
  
  /**
   * Handle course card leave
   */
  function handleCourseCardLeave() {
    const img = this.querySelector('.course-image img');
    if (img) {
      img.style.transform = 'scale(1)';
    }
  }
  
  // Initialize the app when DOM is loaded
  document.addEventListener('DOMContentLoaded', init);
  
  // Export for testing purposes (if needed)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      init,
      cacheDOM,
      bindEvents,
      loadHTML,
      toggleMobileMenu,
      toggleUserDropdown,
      handleLogout,
      checkAuthState,
      smoothScroll
    };
  }
