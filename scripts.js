document.addEventListener('DOMContentLoaded', () => {
    const animatedName = document.getElementById('animatedName');
    const nameText = animatedName.textContent;
    const downArrow = document.querySelector('.down-arrow');
    const contactButtons = document.querySelector('.header-content .contact-buttons');
    animatedName.textContent = '';
    let index = 0;

    // Create cursor span
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
            // Blink the cursor
            animatedName.classList.add('cursor-blink');
            setTimeout(() => {
                animatedName.classList.remove('cursor-blink');
                cursorSpan.style.display = 'none'; // Hide the cursor instead of removing it
                
                // Fade in contact buttons
                contactButtons.style.opacity = '1';
                
                // Fade in down arrow after a short delay
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

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lazy load images
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
