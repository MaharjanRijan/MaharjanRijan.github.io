const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; 
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    if (window.scrollY > 50) {
        if (isDarkMode) {
            navbar.style.background = 'rgba(31, 41, 55, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    } else {
        if (isDarkMode) {
            navbar.style.background = 'rgba(31, 41, 55, 0.95)';
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollTopBtn.classList.add('scroll-top-btn');
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    font-size: 18px;
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
`;
document.body.appendChild(scrollTopBtn);
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.classList.add('dark-mode-toggle');
darkModeToggle.style.cssText = `
    position: fixed;
    top: 50%;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #1f2937;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 999;
    font-size: 18px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%);
`;
document.body.appendChild(darkModeToggle);
darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    const isDark = document.documentElement.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', isDark);
    const navbar = document.querySelector('.navbar');
    if (isDark) {
        navbar.style.background = window.scrollY > 50 ? 'rgba(31, 41, 55, 0.98)' : 'rgba(31, 41, 55, 0.95)';
    } else {
        navbar.style.background = window.scrollY > 50 ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)';
    }
});
if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: #2563eb;
    z-index: 10000;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);


    const sections = document.querySelectorAll('section, .highlight-item, .skill-item, .project-card, .education-item, .experience-item');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            subtitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    setTimeout(typeWriter, 1000);
    
    const style = document.createElement('style');
    style.textContent = `
        html.dark-mode {
            --primary-color: #3b82f6;
            --primary-dark: #2563eb;
            --secondary-color: #fbbf24;
            --accent-color: #10b981;
            --text-primary: #f9fafb;
            --text-secondary: #d1d5db;
            --text-light: #9ca3af;
            --background-primary: #111827;
            --background-secondary: #1f2937;
            --background-dark: #0f172a;
            --border-color: #374151;
            --shadow-light: 0 1px 3px rgba(0, 0, 0, 0.3);
            --shadow-medium: 0 4px 6px rgba(0, 0, 0, 0.3);
            --shadow-large: 0 10px 25px rgba(0, 0, 0, 0.4);
        }
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        html.dark-mode .hero {
            background: #1e40af;
        }
        html.dark-mode .navbar {
            background: rgba(31, 41, 55, 0.95);
            border-bottom-color: #374151;
        }
        html.dark-mode .nav-link {
            color: #f9fafb;
        }
        html.dark-mode .nav-link:hover {
            background-color: rgba(59, 130, 246, 0.1);
            color: #60a5fa;
        }
        html.dark-mode .nav-link.active {
            color: #60a5fa;
        }
        html.dark-mode .logo {
            color: #f9fafb;
        }
        html.dark-mode .disclaimer {
            background: #374151;
            color: #d1d5db;
        }
        html.dark-mode .disclaimer a {
            color: #fbbf24;
        }
        html.dark-mode .resume-preview {
            background: #1f2937;
            border-color: #3b82f6;
        }
        html.dark-mode .resume-preview h3 {
            color: #60a5fa;
        }
        html.dark-mode .resume-highlights .highlight-item {
                    background: #3b82f6;
        }
        html.dark-mode .highlight-item {
            background: #1f2937;
            color: #f9fafb;
        }
        html.dark-mode .highlight-item h3 {
            color: #f9fafb;
        }
        html.dark-mode .highlight-item p {
            color: #d1d5db;
        }
        html.dark-mode .highlight-item i {
            color: #60a5fa;
        }
        html.dark-mode .skill-item {
            background: #1f2937;
            color: #f9fafb;
        }
        html.dark-mode .skill-item:hover {
            background: #374151;
            border-color: #60a5fa;
        }
        html.dark-mode .skill-item span {
            color: #f9fafb;
        }
        html.dark-mode .skill-item i {
            color: #60a5fa;
        }
        html.dark-mode .section-title {
            color: #f9fafb;
        }
        html.dark-mode h2 {
            color: #f9fafb;
        }
        html.dark-mode h3 {
            color: #f9fafb;
        }
        html.dark-mode .education-degree {
            color: #f9fafb;
        }
        html.dark-mode .category-title {
            color: #f9fafb;
        }
        html.dark-mode .learning-notes h3 {
            color: #1e40af;
        }
        html.dark-mode .hero-subtitle {
            color: #d1d5db;
        }
    `;
    document.head.appendChild(style);
});