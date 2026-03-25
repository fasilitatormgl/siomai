---
layout: default
title: Rekap Realisasi PRODAMAI
---

# Rekap Realisasi Program PRODAMAI

Program Pemberdayaan Masyarakat (PRODAMAI) terus bergerak di 17 kelurahan dan 1.030 RT di Kota Magelang. Berikut adalah data yang sedang dalam proses pendampingan.

<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-number">17</div>
        <div class="stat-label">Kelurahan</div>
    </div>
    <div class="stat-card">
        <div class="stat-number">1.030</div>
        <div class="stat-label">RT</div>
    </div>
    <div class="stat-card">
        <div class="stat-number">70</div>
        <div class="stat-label">Fasilitator</div>
    </div>
    <div class="stat-card">
        <div class="stat-number">🔥</div>
        <div class="stat-label">Progres Aktif</div>
    </div>
</div>

## 📊 Monitoring per Kelurahan

Berikut adalah link akses spreadsheet realisasi setiap kelurahan. Klik tombol untuk membuka workbook yang berisi data per RW.

<div class="kelurahan-grid">
    <!-- Kelurahan 1 -->
    <div class="kelurahan-card">
        <h3><i class="fas fa-map-marker-alt"></i> Kelurahan A</h3>
        <p>Total RT: xx</p>
        <div class="progress-status">
            <div class="progress-bar-animate"></div>
            <span class="progress-text">⏳ Sedang berjalan</span>
        </div>
        <a href="https://docs.google.com/spreadsheets/d/1LINK_A/edit" target="_blank" class="btn-spreadsheet">Buka Spreadsheet <i class="fas fa-external-link-alt"></i></a>
    </div>
    <!-- Kelurahan 2 -->
    <div class="kelurahan-card">
        <h3><i class="fas fa-map-marker-alt"></i> Kelurahan B</h3>
        <p>Total RT: xx</p>
        <div class="progress-status">
            <div class="progress-bar-animate"></div>
            <span class="progress-text">⏳ Sedang berjalan</span>
        </div>
        <a href="https://docs.google.com/spreadsheets/d/1LINK_B/edit" target="_blank" class="btn-spreadsheet">Buka Spreadsheet <i class="fas fa-external-link-alt"></i></a>
    </div>
    <!-- ... tambahkan hingga 17 kelurahan dengan pola yang sama -->
</div>

<p class="text-center mt-8 text-gray-500">*Data diperbarui secara berkala oleh fasilitator. Klik spreadsheet untuk melihat detail per RW.</p>

## 🗺️ Struktur Data

Setiap workbook kelurahan terdiri dari beberapa sheet sesuai jumlah RW. Data meliputi partisipasi masyarakat, realisasi anggaran, dan capaian kegiatan. Program masih berjalan, sehingga angka akan terus bertambah.

---

<style>
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}
.stat-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    transition: transform 0.3s;
}
.stat-card:hover {
    transform: translateY(-5px);
}
.stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #dc2626, #f59e0b);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}
.stat-label {
    color: #4b5563;
    font-size: 0.9rem;
    margin-top: 0.5rem;
}
.kelurahan-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}
.kelurahan-card {
    background: white;
    border-radius: 1rem;
    padding: 1.2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    transition: all 0.3s;
    border-left: 4px solid #f59e0b;
}
.kelurahan-card:hover {
    box-shadow: 0 10px 20px -5px rgba(220,38,38,0.2);
    transform: translateY(-3px);
}
.kelurahan-card h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #dc2626;
}
.kelurahan-card p {
    margin: 0.3rem 0;
    font-size: 0.9rem;
    color: #4b5563;
}
.progress-status {
    margin: 0.8rem 0;
}
.progress-bar-animate {
    width: 100%;
    height: 6px;
    background-color: #fef3c7;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
}
.progress-bar-animate::after {
    content: "";
    display: block;
    width: 30%;
    height: 100%;
    background: linear-gradient(90deg, #dc2626, #f59e0b);
    border-radius: 3px;
    animation: moving 1.5s ease-in-out infinite;
}
@keyframes moving {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(400%); }
}
.progress-text {
    display: inline-block;
    font-size: 0.75rem;
    color: #d97706;
    margin-top: 0.3rem;
}
.btn-spreadsheet {
    display: inline-block;
    margin-top: 0.8rem;
    background: linear-gradient(135deg, #dc2626, #f59e0b);
    color: white;
    padding: 0.4rem 1rem;
    border-radius: 30px;
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s;
}
.btn-spreadsheet:hover {
    background: linear-gradient(135deg, #b91c1c, #d97706);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
@media (max-width: 640px) {
    .kelurahan-grid {
        grid-template-columns: 1fr;
    }
}
</style>
