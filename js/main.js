document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Smooth follow for outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effect for links
    const links = document.querySelectorAll('a, button, .work-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        link.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileBtn.classList.toggle('active');

        // Animate hamburger
        const spans = mobileBtn.querySelectorAll('span');
        if (navList.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileBtn.classList.remove('active');
            const spans = mobileBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        });
    });

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;

            const subject = `New Inquiry from ${name}`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

            window.location.href = `mailto:info@flobicreatives.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        });
    }

    // Services Modal Handler
    const servicesModal = document.getElementById('servicesModal');
    const viewAllServicesBtn = document.getElementById('viewAllServicesBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalContactBtn = document.getElementById('modalContactBtn');

    if (viewAllServicesBtn && servicesModal) {
        // Open modal
        viewAllServicesBtn.addEventListener('click', () => {
            servicesModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        // Close modal on close button click
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                servicesModal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            });
        }

        // Close modal when clicking on background
        servicesModal.addEventListener('click', (e) => {
            if (e.target === servicesModal) {
                servicesModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && servicesModal.classList.contains('active')) {
                servicesModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Modal contact button - close modal and scroll to contact
        if (modalContactBtn) {
            modalContactBtn.addEventListener('click', () => {
                servicesModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }

    const revealElements = document.querySelectorAll('.reveal-text, .reveal-text-delay, .service-card, .work-item, .blog-card, .section-title, .section-desc');
    revealElements.forEach(el => observer.observe(el));
});
