script.js
/* ============================================
   MedCare Hospital — Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Navbar Scroll Effect ----------
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ---------- Mobile Toggle ----------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        mobileToggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            mobileToggle.classList.remove('active');
        });
    });

    // ---------- Smooth Scroll for anchor links ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---------- Animated Counter ----------
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const animateCounters = () => {
        if (countersAnimated) return;

        const statsSection = document.getElementById('stats-bar');
        const rect = statsSection.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.85) {
            countersAnimated = true;

            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();

                const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easedProgress = easeOutQuart(progress);
                    const currentValue = Math.floor(easedProgress * target);

                    stat.textContent = formatNumber(currentValue);

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = formatNumber(target);
                    }
                };

                requestAnimationFrame(updateCounter);
            });
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000) {
            return num.toLocaleString() + '+';
        }
        return num + '+';
    };

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load

    // ---------- Testimonial Slider ----------
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const totalSlides = dots.length;
    let autoSlideTimer;

    const goToSlide = (index) => {
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    };

    const nextSlide = () => {
        goToSlide((currentSlide + 1) % totalSlides);
    };

    const prevSlide = () => {
        goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    };

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.getAttribute('data-index')));
            resetAutoSlide();
        });
    });

    const startAutoSlide = () => {
        autoSlideTimer = setInterval(nextSlide, 5000);
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    };

    startAutoSlide();

    // ---------- Scroll Reveal ----------
    const revealElements = document.querySelectorAll(
        '.service-card, .doctor-card, .about-feature, .stat-item, .contact-detail'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.88) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load

    // ---------- Hero Particles ----------
    const particlesContainer = document.getElementById('hero-particles');

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;

        Object.assign(particle.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: `rgba(${Math.random() > 0.5 ? '59,130,246' : '6,182,212'}, ${Math.random() * 0.15 + 0.05})`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `particleFloat ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
        });

        particlesContainer.appendChild(particle);
    }

    // Add particle animation keyframes
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);

    // ---------- Form Submission ----------
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const originalContent = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
            submitBtn.innerHTML = '<span>✓ Appointment Requested!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
            submitBtn.style.opacity = '1';

            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 3000);
        }, 1500);
    });

    // ---------- Active Nav Highlighting ----------
    const sections = document.querySelectorAll('section[id]');

    const highlightNav = () => {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav);
});
