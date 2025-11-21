document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const body = document.body;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });

    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const currentTheme = localStorage.getItem('theme') || 
        (prefersDarkScheme.matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });

    // Typing effect (only if element exists)
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const typingWords = ['FrontEnd Developer', 'Data Scientist', 'DataBase Manager', 'Ai Engineer'];
        let wordIndex = 0, charIndex = 0, isDeleting = false, typingDelay = 100;

        function typeEffect() {
            const currentWord = typingWords[wordIndex];
            const currentChar = currentWord.substring(0, charIndex);
            typingText.textContent = currentChar;

            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                typingDelay = 100;
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                typingDelay = 50;
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) wordIndex = (wordIndex + 1) % typingWords.length;
                typingDelay = 1000;
            }

            setTimeout(typeEffect, typingDelay);
        }

        typeEffect();
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = level;
                skillObserver.unobserve(entry.target);
            }
        });
    });
    skillBars.forEach(bar => skillObserver.observe(bar));

    // Projects navigation buttons (horizontal carousel)
    const projectsGrid = document.querySelector('.projects-grid');
    const prevBtn = document.getElementById('projects-prev');
    const nextBtn = document.getElementById('projects-next');

    if (projectsGrid && prevBtn && nextBtn) {
        const cards = Array.from(projectsGrid.querySelectorAll('.project-card'));
        let currentIndex = 0;

        const scrollToCard = (index) => {
            if (!cards.length) return;
            const clampedIndex = Math.max(0, Math.min(cards.length - 1, index));
            const card = cards[clampedIndex];
            card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            currentIndex = clampedIndex;
        };

        // Ensure we start at the first card
        scrollToCard(0);

        prevBtn.addEventListener('click', () => {
            scrollToCard(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            scrollToCard(currentIndex + 1);
        });
    }

    // Handle image loading errors
    document.querySelectorAll('.project-image').forEach(img => {
        img.addEventListener('load', () => img.classList.add('loaded'));
        img.addEventListener('error', () => {
            img.src = 'https://via.placeholder.com/800x600?text=Project+Image';
            img.classList.add('loaded');
        });
    });

    // Ensure FormSubmit redirects to the correct thanks.html on current origin
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            const nextField = contactForm.querySelector('input[name="_next"]');
            if (nextField) {
                nextField.value = `${window.location.origin}/thanks.html`;
            }
        });
    }
});
