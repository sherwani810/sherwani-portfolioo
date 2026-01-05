// Enhanced JavaScript for Shahrivan's portfolio
document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       Mobile Navigation Toggle
    ========================== */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    /* =========================
       Smooth Scrolling
    ========================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* =========================
       Portfolio Filter
    ========================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    /* =========================
       Contact Form (SAFE)
    ========================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Invalid email address.');
                return;
            }

            alert(`Thank you ${data.name}, I will contact you soon.`);
            contactForm.reset();
        });
    }

    /* =========================
       Skill Bars Animation
    ========================== */
    const skillsSection = document.querySelector('.skills');

    if (skillsSection && 'IntersectionObserver' in window) {
        const skillObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.skill-progress').forEach(bar => {
                        const finalWidth = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => bar.style.width = finalWidth, 200);
                    });
                }
            });
        }, { threshold: 0.4 });

        skillObserver.observe(skillsSection);
    }

    /* =========================
       Navbar Scroll Effect
    ========================== */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.style.background =
                window.scrollY > 50 ? 'rgba(255,255,255,0.95)' : 'white';
        });
    }

    /* =========================
       Portfolio / Project Fade-in
    ========================== */
    if ('IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        document.querySelectorAll('.portfolio-item, .project-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            fadeObserver.observe(el);
        });
    }

    /* =========================
       Footer Year Update
    ========================== */
    const footerText = document.querySelector('.footer-text p');
    if (footerText) {
        footerText.innerHTML = `&copy; ${new Date().getFullYear()} Shahrivan Sherwani. All rights reserved.`;
    }

    /* =========================
       Typing Effect (SAFE)
    ========================== */
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        function type() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i++);
                setTimeout(type, 150);
            }
        }
        type();
    }

    /* =========================
       Social Links Hover
    ========================== */
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('mouseenter', () => link.style.transform = 'translateY(-3px)');
        link.addEventListener('mouseleave', () => link.style.transform = 'translateY(0)');
    });

    /* =========================
       Print Portfolio Button
    ========================== */
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
        const printBtn = document.createElement('button');
        printBtn.innerHTML = '<i class="fas fa-print"></i> Print Portfolio';
        printBtn.className = 'btn btn-outline print-btn';
        printBtn.onclick = () => window.print();
        contactSection.appendChild(printBtn);
    }

});
