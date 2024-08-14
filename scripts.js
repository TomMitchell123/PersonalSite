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

    // Remove the existing event listeners for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', smoothScroll);
    });

    // Add new event listeners only for specific links
    document.querySelector('.down-arrow').addEventListener('click', smoothScroll);
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    }

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
});
