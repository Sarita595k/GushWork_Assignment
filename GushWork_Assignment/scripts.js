document.addEventListener('DOMContentLoaded', () => {
    const zoomContainer = document.getElementById('zoom-container');
    const mainImage = document.getElementById('main-product-image');
    const zoomResult = document.getElementById('zoom-result');
    const thumbs = document.querySelectorAll('.thumb');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentThumbIndex = 0;

    // --- CAROUSEL LOGIC ---
    function updateGallery(index) {
        // Handle Index Wrap-around
        if (index >= thumbs.length) index = 0;
        if (index < 0) index = thumbs.length - 1;

        // Remove active class from all
        thumbs.forEach(t => t.classList.remove('active'));

        currentThumbIndex = index;
        thumbs[currentThumbIndex].classList.add('active');

        // Update Main Image
        const newSrc = thumbs[currentThumbIndex].getAttribute('data-full');
        mainImage.src = newSrc;

        // IMPORTANT: Update the zoom background image too
        zoomResult.style.backgroundImage = `url(${newSrc})`;
    }

    // Thumbnails click
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => updateGallery(index));
    });

    // Arrow click (Using stopPropagation to prevent zoom triggering)
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents click from bubbling to container
        updateGallery(currentThumbIndex + 1);
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateGallery(currentThumbIndex - 1);
    });

    // --- ZOOM LOGIC ---
    zoomContainer.addEventListener('mousemove', (e) => {
        // If the mouse is over the button, we don't want to zoom
        if (e.target.closest('.nav-arrow')) {
            zoomContainer.classList.remove('zoomed');
            return;
        }

        zoomContainer.classList.add('zoomed');

        const rect = zoomContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        zoomResult.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
        zoomResult.style.backgroundImage = `url(${mainImage.src})`;
    });

    zoomContainer.addEventListener('mouseleave', () => {
        zoomContainer.classList.remove('zoomed');
    });
});

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;

        // Close all other FAQ items (Accordion effect)
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle the clicked item
        item.classList.toggle('active');
    });
});

const slider = document.getElementById('apps-slider');
const nextBtn = document.getElementById('app-next');
const prevBtn = document.getElementById('app-prev');

// Scroll amount: Width of one card + gap
const scrollAmount = 320;

nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});


const tabs = document.querySelectorAll('.tab-btn');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));

        tab.classList.add('active');

    });
});