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

    // Typing effect
    const typingText = document.querySelector('.typing-text');
    const typingWords = ['FrontEnd Developer', 'Data Scientist', 'DataBase Manager',"Ai Engineer"];
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

    // Project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
    });

    // Handle image loading errors
    document.querySelectorAll('.project-image').forEach(img => {
        img.addEventListener('load', () => img.classList.add('loaded'));
        img.addEventListener('error', () => {
            img.src = 'https://via.placeholder.com/800x600?text=Project+Image';
            img.classList.add('loaded');
        });
    });

    // ✅ Contact Form using EmailJS
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
        return;
    }

            const submitButton = contactForm.querySelector('#submit-btn');
            const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Send using EmailJS
            emailjs.send("service_op9zsh5", "template_074ie32", {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'ra920453@gmail.com'
            }).then(() => {
                alert("Message sent successfully!");
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }).catch((error) => {
                console.error("EmailJS error:", error);
                alert("Something went wrong. Please try again later.");
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            });
        });
    }
});
