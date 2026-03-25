---
layout: default
title: Dokumentasi Kegiatan
---

# Dokumentasi Kegiatan PRODAMAI

Dokumentasi kegiatan fasilitasi, sosialisasi, dan pelaksanaan program di berbagai kelurahan.

<div class="photo-grid">
    {% for photo in site.data.photos %}
    <div class="photo-card">
        <img src="{{ site.baseurl }}/assets/images/dokumentasi/{{ photo.file }}" 
             alt="{{ photo.caption }}" 
             loading="lazy">
        <div class="photo-caption">{{ photo.caption }}</div>
    </div>
    {% endfor %}
</div>

<style>
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
    transition: transform 0.2s;
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
@media (max-width: 640px) {
    .photo-grid {
        grid-template-columns: 1fr;
    }
}
</style>
