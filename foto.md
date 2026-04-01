---
layout: default
title: Dokumentasi Kegiatan
---

# Dokumentasi Kegiatan PRODAMAI

Dokumentasi kegiatan fasilitasi, sosialisasi, dan pelaksanaan program di berbagai kelurahan.

<!-- Filter Kategori -->
<div class="filter-buttons">
    <button class="filter-btn active" data-filter="all">Semua</button>
    <button class="filter-btn" data-filter="kegiatan">Kegiatan</button>
    <button class="filter-btn" data-filter="sosialisasi">Sosialisasi</button>
    <button class="filter-btn" data-filter="pelatihan">Pelatihan</button>
    <button class="filter-btn" data-filter="lainnya">Lainnya</button>
</div>

<!-- Grid Foto -->
<div id="photo-grid" class="photo-grid">
    {% for photo in site.data.photos %}
    <div class="photo-card" data-category="{{ photo.category | default: 'lainnya' }}">
        <img src="{{ site.baseurl }}/assets/images/dokumentasi/{{ photo.file }}" 
             alt="{{ photo.caption }}" 
             loading="lazy">
        <div class="photo-caption">{{ photo.caption }}</div>
    </div>
    {% endfor %}
</div>

<!-- Loading Indicator -->
<div id="loading" class="loading" style="display: none;">
    <div class="spinner"></div>
    <p>Memuat foto...</p>
</div>

<style>
/* Grid styling */
.photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}
.photo-card {
    background: white;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    transition: transform 0.2s, opacity 0.3s;
    cursor: pointer;
}
.photo-card:hover {
    transform: translateY(-2px);
}
.photo-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
}
.photo-caption {
    padding: 0.75rem;
    font-size: 0.8rem;
    text-align: center;
    color: #4b5563;
    background: #fff9f0;
    border-top: 1px solid #fde68a;
}

/* Filter buttons */
.filter-buttons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin: 2rem 0 1rem;
}
.filter-btn {
    background: white;
    border: 2px solid #f59e0b;
    color: #d97706;
    padding: 0.5rem 1.5rem;
    border-radius: 2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}
.filter-btn:hover {
    background: #fef3c7;
    transform: translateY(-2px);
}
.filter-btn.active {
    background: linear-gradient(135deg, #dc2626, #f59e0b);
    color: white;
    border-color: transparent;
}

/* Loading animation */
.loading {
    text-align: center;
    padding: 2rem;
}
.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #dc2626;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Lightbox (fullscreen modal) */
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.9);
    z-index: 1000;
    display: none;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.lightbox.active {
    display: flex;
}
.lightbox-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.lightbox-content img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
}
.lightbox-caption {
    color: white;
    text-align: center;
    margin-top: 1rem;
    font-size: 1rem;
    background: rgba(0,0,0,0.6);
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    max-width: 80vw;
}
.lightbox-close {
    position: absolute;
    top: 20px;
    right: 30px;
    color: white;
    font-size: 40px;
    cursor: pointer;
    z-index: 1001;
    transition: transform 0.2s;
}
.lightbox-close:hover {
    transform: scale(1.1);
}
.lightbox-prev,
.lightbox-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.5);
    color: white;
    font-size: 40px;
    padding: 0 15px;
    cursor: pointer;
    border-radius: 50%;
    transition: background 0.3s;
    z-index: 1001;
}
.lightbox-prev {
    left: 20px;
}
.lightbox-next {
    right: 20px;
}
.lightbox-prev:hover,
.lightbox-next:hover {
    background: rgba(0,0,0,0.8);
}
@media (max-width: 640px) {
    .lightbox-prev,
    .lightbox-next {
        font-size: 30px;
        padding: 0 10px;
    }
    .lightbox-close {
        font-size: 30px;
        top: 10px;
        right: 15px;
    }
}
</style>

<script>
    // Lightbox functionality
    document.addEventListener('DOMContentLoaded', function() {
        // Get all photo cards (initially)
        let allPhotoItems = [];
        let currentIndex = 0;
        let currentFilter = 'all';

        // Function to collect visible photo items (based on current filter)
        function getVisiblePhotoItems() {
            const cards = document.querySelectorAll('.photo-card');
            const items = [];
            cards.forEach((card, idx) => {
                if (card.style.display !== 'none') {
                    const img = card.querySelector('img');
                    const caption = card.querySelector('.photo-caption').innerText;
                    items.push({
                        src: img.src,
                        caption: caption,
                        element: card
                    });
                }
            });
            return items;
        }

        // Update lightbox content
        function updateLightbox(index) {
            const items = getVisiblePhotoItems();
            if (items.length === 0) return;
            if (index < 0) index = items.length - 1;
            if (index >= items.length) index = 0;
            currentIndex = index;
            const item = items[currentIndex];
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');
            lightboxImg.src = item.src;
            lightboxCaption.innerText = item.caption;
        }

        // Show lightbox for a specific photo (by its source)
        function showLightboxBySrc(src) {
            const items = getVisiblePhotoItems();
            const index = items.findIndex(item => item.src === src);
            if (index !== -1) {
                currentIndex = index;
                updateLightbox(currentIndex);
                document.getElementById('lightbox').classList.add('active');
            }
        }

        // Event: click on photo card
        function bindCardClick() {
            const cards = document.querySelectorAll('.photo-card');
            cards.forEach(card => {
                card.removeEventListener('click', card._lightboxHandler);
                const handler = function(e) {
                    // if click on card, get the image src
                    const img = this.querySelector('img');
                    if (img) {
                        showLightboxBySrc(img.src);
                    }
                };
                card.addEventListener('click', handler);
                card._lightboxHandler = handler;
            });
        }

        // Re-bind after filter
        function refreshLightbox() {
            bindCardClick();
        }

        // Filter logic
        const filterButtons = document.querySelectorAll('.filter-btn');
        const photoCards = document.querySelectorAll('.photo-card');
        const photoGrid = document.getElementById('photo-grid');
        const loadingDiv = document.getElementById('loading');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show loading
                loadingDiv.style.display = 'block';
                photoGrid.style.opacity = '0.5';
                
                setTimeout(() => {
                    const filter = this.getAttribute('data-filter');
                    currentFilter = filter;
                    
                    photoCards.forEach(card => {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                    
                    loadingDiv.style.display = 'none';
                    photoGrid.style.opacity = '1';
                    
                    // Re-attach click handlers for new visible cards
                    refreshLightbox();
                }, 200);
            });
        });

        // Lightbox DOM elements
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-close">&times;</div>
            <div class="lightbox-prev">&#10094;</div>
            <div class="lightbox-next">&#10095;</div>
            <div class="lightbox-content">
                <img id="lightbox-img" src="" alt="">
            </div>
            <div id="lightbox-caption" class="lightbox-caption"></div>
        `;
        document.body.appendChild(lightbox);

        // Lightbox event handlers
        const lightboxEl = document.getElementById('lightbox');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        const lightboxImg = document.getElementById('lightbox-img');

        function closeLightbox() {
            lightboxEl.classList.remove('active');
        }

        function nextImage() {
            const items = getVisiblePhotoItems();
            if (items.length === 0) return;
            currentIndex = (currentIndex + 1) % items.length;
            updateLightbox(currentIndex);
        }

        function prevImage() {
            const items = getVisiblePhotoItems();
            if (items.length === 0) return;
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateLightbox(currentIndex);
        }

        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', prevImage);
        nextBtn.addEventListener('click', nextImage);

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!lightboxEl.classList.contains('active')) return;
            if (e.key === 'ArrowLeft') {
                prevImage();
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                nextImage();
                e.preventDefault();
            } else if (e.key === 'Escape') {
                closeLightbox();
                e.preventDefault();
            }
        });

        // Click outside image to close? (optional: close if clicking on overlay)
        lightboxEl.addEventListener('click', function(e) {
            if (e.target === lightboxEl) {
                closeLightbox();
            }
        });

        // Initial binding
        refreshLightbox();
    });
</script>
