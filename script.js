// Lazy loading for images (using intersection observer)
document.addEventListener('DOMContentLoaded', function() {
    let lazyImages = [].slice.call(document.querySelectorAll('img.lazyload'));

    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazyload');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

// Initialize GSAP for parallax scrolling effect
gsap.registerPlugin(ScrollTrigger);
gsap.to("#product-image", {
    scrollTrigger: {
        trigger: "#interactive-image",
        start: "top top",
        end: "bottom top",
        scrub: true,
    },
    y: "50%", // Image moves at 50% speed of scrolling
});

// Initialize Tippy.js for interactive tooltips on hotspots
tippy('.hotspot-link', {
    content: (reference) => reference.getAttribute('title'), // Dynamic tooltip content
    animation: 'scale',
    theme: 'light',
    duration: [300, 300],
    placement: 'top',
});
