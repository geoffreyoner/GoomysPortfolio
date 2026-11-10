import { projects } from './projects.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    renderProjects();
    initScrollObserver();
    initScrollProgress();
});

function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const render = (theme) => {
        const isDark = theme === 'dark';
        toggle.textContent = isDark ? '[ Dark ]' : '[ Light ]';
        toggle.setAttribute('aria-pressed', String(isDark));
        toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    };

    render(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

    toggle.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

        document.documentElement.classList.add('theme-transition');
        document.documentElement.setAttribute('data-theme', next);
        render(next);

        try {
            localStorage.setItem('theme', next);
        } catch (error) {
        }

        setTimeout(() => document.documentElement.classList.remove('theme-transition'), 350);
    });
}

function initMobileNav() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.getElementById('primary-nav');
    if (!menuBtn || !navLinks) return;

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

    const setOpen = (open) => {
        menuBtn.setAttribute('aria-expanded', String(open));
        navLinks.classList.toggle('show', open);

        if (isMobile()) {
            if (open) navLinks.removeAttribute('inert');
            else navLinks.setAttribute('inert', '');
        } else {
            navLinks.removeAttribute('inert');
        }
    };

    setOpen(false);

    menuBtn.addEventListener('click', () => {
        setOpen(menuBtn.getAttribute('aria-expanded') !== 'true');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
            setOpen(false);
            menuBtn.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (!isMobile()) {
            navLinks.classList.remove('show');
            menuBtn.setAttribute('aria-expanded', 'false');
            navLinks.removeAttribute('inert');
        }
    });
}

function renderProjects() {
    const list = document.getElementById('projects-list');
    if (!list) return;

    // shortcut: projects come from trusted static data; escape values if they ever become user/API input
    list.innerHTML = projects.map((project, index) => {
        const number = String(index + 1).padStart(2, '0');
        const tech = project.technologies.map((item) => `<li>${item}</li>`).join('');
        const links = [
            project.repositoryUrl
                ? `<a href="${project.repositoryUrl}" target="_blank" rel="noopener noreferrer" aria-label="Code for ${project.title}">Code <span aria-hidden="true">↗</span></a>`
                : '',
            project.demoUrl
                ? `<a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" aria-label="Live demo of ${project.title}">Live <span aria-hidden="true">↗</span></a>`
                : ''
        ].join('');

        return `
            <li class="project-row">
                <span class="project-index" aria-hidden="true">${number}</span>
                <div class="project-body">
                    <div class="project-top">
                        <h3 class="project-title">${project.title}</h3>
                        <span class="project-category">${project.category}</span>
                    </div>
                    <p class="project-desc">${project.description}</p>
                    <ul class="project-tech" aria-label="Technologies">${tech}</ul>
                </div>
                <div class="project-links">${links}</div>
            </li>
        `;
    }).join('');
}

function initScrollObserver() {
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach((el) => revealObserver.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add('visible'));
    }

    const sections = document.querySelectorAll('main section[id]');
    const links = document.querySelectorAll('.nav-link');
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach((section) => navObserver.observe(section));
}

function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    const update = () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const current = window.scrollY || doc.scrollTop || 0;
        bar.style.width = (max > 0 ? (current / max) * 100 : 0) + '%';
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
}
