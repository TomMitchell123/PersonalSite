document.addEventListener('DOMContentLoaded', () => {
    const animatedName = document.getElementById('animatedName');
    const nameText = animatedName.textContent;
    const downArrow = document.querySelector('.down-arrow');
    const contactButtons = document.querySelector('.header-content .contact-buttons');
    animatedName.textContent = '';
    let index = 0;

    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor';
    animatedName.appendChild(cursorSpan);

    const typeEffect = () => {
        if (index < nameText.length) {
            const span = document.createElement('span');
            span.textContent = nameText[index] === ' ' ? '\u00A0' : nameText[index];
            animatedName.insertBefore(span, cursorSpan);
            index++;
            setTimeout(typeEffect, 75);
        } else {
            animatedName.classList.add('cursor-blink');
            setTimeout(() => {
                animatedName.classList.remove('cursor-blink');
                cursorSpan.style.display = 'none';
                contactButtons.style.opacity = '1';
                setTimeout(() => {
                    downArrow.style.opacity = '1';
                }, 500);
            }, 1300);
        }
    };

    typeEffect();

    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                if (entry.target.classList.contains('skills')) {
                    entry.target.querySelectorAll('.skill-level').forEach(skill => {
                        skill.style.width = skill.style.width;
                    });
                }
            }
        });
    }, {
        threshold: 0.5
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    const scrollIndicator = document.querySelector('.scroll-indicator');

    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollIndicator.style.width = `${scrollPercentage}%`;
    });

    downArrow.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => lazyLoadObserver.observe(img));

    // Add this to your existing DOMContentLoaded event listener
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
        },
        retina_detect: true
    });

    // Add this after your name animation
    const tagline = "Software Engineer | Data Scientist | Problem Solver ";
    let taglineIndex = 0;

    function typeTagline() {
        if (taglineIndex < tagline.length) {
            document.getElementById("tagline").innerHTML += tagline.charAt(taglineIndex);
            taglineIndex++;
            setTimeout(typeTagline, 50);
        }
    }

    // Call this function after the name animation is complete
    typeTagline();
});



