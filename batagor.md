---
layout: default
title: BATAGOR - Bagan Tabel Monitoring Fasilitator
---

<div class="max-w-5xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            BATAGOR
        </h1>
        <p class="text-xl text-gray-600">Bagan Tabel Monitoring Fasilitator</p>
        <div class="h-1 w-24 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto mt-4 rounded-full"></div>
    </div>

    <!-- Info dan Tombol Akses -->
    <div class="bg-white rounded-2xl shadow-xl p-8 mb-12 text-center">
        <p class="text-lg text-gray-700 mb-6">
            Akses ke sistem internal monitoring fasilitator, data OPD, dan pelaporan.
        </p>

        <!-- Tiga indikator dalam bentuk badge -->
        <div class="flex flex-wrap justify-center gap-4 mb-8">
            <span class="bg-red-100 text-red-600 px-6 py-2 rounded-full font-semibold shadow-sm">
                📊 Monitoring
            </span>
            <span class="bg-yellow-100 text-yellow-700 px-6 py-2 rounded-full font-semibold shadow-sm">
                🏢 Data OPD
            </span>
            <span class="bg-orange-100 text-orange-700 px-6 py-2 rounded-full font-semibold shadow-sm">
                📋 Pelaporan
            </span>
        </div>

        <!-- Tombol akses utama -->
        <a href="https://sites.google.com/view/batagor-prodamai" target="_blank" 
           class="inline-block bg-gradient-to-r from-red-600 to-yellow-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            <i class="fas fa-lock mr-2"></i> Akses BATAGOR
        </a>
    </div>

    <!-- Penjelasan singkat -->
    <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl shadow-md p-6 text-center hover-scale">
            <div class="text-3xl mb-3">📊</div>
            <h3 class="font-bold text-red-600 mb-2">Monitoring</h3>
            <p class="text-gray-600 text-sm">Pantau progress seluruh fasilitator secara real-time</p>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6 text-center hover-scale">
            <div class="text-3xl mb-3">🏢</div>
            <h3 class="font-bold text-yellow-600 mb-2">Data OPD</h3>
            <p class="text-gray-600 text-sm">Informasi khusus perangkat daerah</p>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6 text-center hover-scale">
            <div class="text-3xl mb-3">📋</div>
            <h3 class="font-bold text-orange-600 mb-2">Pelaporan</h3>
            <p class="text-gray-600 text-sm">Laporan bulanan dan arsip kegiatan</p>
        </div>
    </div>

    <!-- Footer informasi akses -->
    <div class="mt-12 text-center text-sm text-gray-500 border-t border-gray-200 pt-6">
        <p><i class="fas fa-info-circle mr-1 text-red-500"></i> Halaman ini berisi data internal. Akses terbatas untuk fasilitator dan OPD.</p>
        <p class="mt-2">Hubungi Admin: <a href="mailto:siomai@magelangkota.go.id" class="text-red-600 hover:underline">siomai@magelangkota.go.id</a> | (0293) 123456</p>
    </div>
</div>

<style>
.hover-scale {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-scale:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 30px -10px rgba(220,38,38,0.2);
}
</style>
