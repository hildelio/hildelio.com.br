/* ================================================================
   HILDÉLIO — SCRIPTS
   ================================================================
   • Reveal on scroll (IntersectionObserver)
   • Navbar scroll behavior
   • Smooth anchor links
   • Testimonial carousel
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Reveal on Scroll ──────────────────────────────────────
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ── Navbar ────────────────────────────────────────────────
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        if (window.scrollY > 48) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ── Smooth Anchor Links ──────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ── Testimonial Carousel ─────────────────────────────────
    const slides = document.querySelector('.testimonial__slides');
    const dots = document.querySelectorAll('.testimonial__dot');
    let currentSlide = 0;
    const totalSlides = dots.length;
    let autoplayTimer;

    function goToSlide(index) {
        currentSlide = index;
        if (slides) {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        dots.forEach((dot, i) => {
            dot.classList.toggle('testimonial__dot--active', i === currentSlide);
        });
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % totalSlides);
    }

    function startAutoplay() {
        autoplayTimer = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayTimer);
        startAutoplay();
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetAutoplay();
        });
    });

    if (totalSlides > 0) {
        startAutoplay();
    }
});

// ── Globals for Modal & Copy ─────────────────────────────
window.openFaq = function(e) {
    if (e) e.preventDefault();
    document.getElementById('faqModal').showModal();
};

window.closeFaq = function() {
    document.getElementById('faqModal').close();
};

// Fechar modal ao clicar fora dele
const faqModal = document.getElementById('faqModal');
if (faqModal) {
    faqModal.addEventListener('click', (e) => {
        const dialogDimensions = faqModal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            faqModal.close();
        }
    });
}

window.copyEmail = function(e, btn) {
    // Permite que o mailto: funcione normalmente
    // E tenta copiar o email para a área de transferência silenciosamente
    navigator.clipboard.writeText('contato@hildelio.com.br').catch(err => {
        console.warn('Clipboard write failed:', err);
    });
};
