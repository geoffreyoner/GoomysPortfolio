import { projects } from './projects.js';

document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initTheme();
    initGreeting();
    initMobileNav();
    initScrollObserver();
    renderProjects();
});

/* --- Lenis Smooth Scroll --- */
function initLenis() {
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    lenis.scrollTo(targetElement);
                }
            });
        });
    }
}

/* --- Theme Switcher --- */
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }

    themeBtn.addEventListener('click', () => {
        document.documentElement.classList.add('theme-transition');

        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }

        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 500);
    });
}

/* --- Multilingual Typing Greeting --- */
function initGreeting() {
    const greetings = [
        "Hello!", "Halo!", "Hallo!", "こんにちは", 
        "안녕하세요", "Bonjour!", "Hola!", "Ciao!", "Olá!", "你好"
    ];
    let currentIndex = 0;
    let isDeleting = false;
    let currentText = '';
    let typingSpeed = 150;
    
    const greetingEl = document.getElementById('multilingual-greeting');
    
    function typeEffect() {
        if (document.hidden) {
            setTimeout(typeEffect, 1000);
            return;
        }

        const fullText = greetings[currentIndex];

        if (isDeleting) {
            currentText = fullText.substring(0, currentText.length - 1);
            typingSpeed = 50;
        } else {
            currentText = fullText.substring(0, currentText.length + 1);
            typingSpeed = 150;
        }

        greetingEl.textContent = currentText;

        if (!isDeleting && currentText === fullText) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % greetings.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}

/* --- Mobile Navigation & Active State --- */
function initMobileNav() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    menuBtn.addEventListener('click', () => {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('show');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

/* --- Scroll Animations (Intersection Observer) --- */
function initScrollObserver() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    const sections = document.querySelectorAll('section');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(sec => navObserver.observe(sec));
}

/* --- Project Renderer --- */
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    
    grid.innerHTML = projects.map(proj => `
        <div class="brutal-card project-card">
            <div class="project-header">
                <h3 class="project-title">${proj.title}</h3>
                <span class="project-category">${proj.category}</span>
            </div>
            <p class="project-desc">${proj.description}</p>
            <div class="tags">
                ${proj.technologies.map(tech => `<span class="brutal-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                ${proj.repositoryUrl ? `<a href="${proj.repositoryUrl}" target="_blank" rel="noopener noreferrer" class="brutal-btn icon-btn" aria-label="GitHub Repository">Code</a>` : ''}
                ${proj.demoUrl ? `<a href="${proj.demoUrl}" target="_blank" rel="noopener noreferrer" class="brutal-btn primary">Live Demo</a>` : ''}
            </div>
        </div>
    `).join('');
}