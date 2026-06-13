---
layout: default
title: Semua Artikel
---

<div align="center">
  <strong style="font-size: 2em;">SEMUA ARTIKEL</strong>
</div>

<div id="berita-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
    <div class="col-span-full text-center py-10 text-gray-500">
        <i class="fas fa-spinner fa-spin text-3xl mb-2 text-red-600"></i>
        <p>Memuat artikel terbaru...</p>
    </div>
</div>

<script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getFirestore, collection, query, where, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

    // Konfigurasi Firebase sesuai proyek Siomai Magelang
    const firebaseConfig = {
        apiKey: "AIzaSyDv9zylwxNutc2zV-0U2yXHa6ioT0usBVQ",
        authDomain: "siomaimagelang.firebaseapp.com",
        projectId: "siomaimagelang"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    async function loadBeritaUtama() {
        const gridContainer = document.getElementById('berita-grid');
        
        try {
            // Ambil data yang berstatus 'publish' dan urutkan dari yang terbaru
            const q = query(
                collection(db, "berita"), 
                where("status", "==", "publish"),
                orderBy("createdAt", "desc")
            );
            
            const querySnapshot = await getDocs(q);
            gridContainer.innerHTML = ''; // Kosongkan loading spinner

            if (querySnapshot.empty) {
                gridContainer.innerHTML = '<div class="col-span-full text-center py-10 text-gray-500">Belum ada artikel yang diterbitkan.</div>';
                return;
            }

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                
                // Format Tanggal agar rapi (Contoh: 13 Juni 2026)
                let tanggalFormatted = "Tanpa Tanggal";
                if (data.createdAt) {
                    const date = data.createdAt.toDate();
                    tanggalFormatted = date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                }

                // Bersihkan tag HTML dari isi tulisan untuk ringkasan teks (Excerpt)
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data.content;
                const teksMurni = tempDiv.textContent || tempDiv.innerText || "";
                const ringkasanText = teksMurni.split(" ").slice(0, 15).join(" ") + "...";

                // Atur Gambar (Jika tidak ada gambar, pakai gradasi warna)
                let komponenGambar = '';
                if (data.imageUrl) {
                    komponenGambar = `<img src="${data.imageUrl}" class="w-full h-48 object-cover">`;
                } else {
                    komponenGambar = `
                        <div class="w-full h-48 bg-gradient-to-r from-red-400 to-yellow-400 flex items-center justify-center">
                            <i class="fas fa-newspaper text-white text-4xl"></i>
                        </div>
                    `;
                }

                // Link untuk membaca artikel penuh (mengarahkan ke halaman detail bawa id berita)
                const urlBaca = `baca?id=${doc.id}`;

                // Susun struktur tampilan HTML (Sama persis dengan desain asli kamu)
                const kartuArtikel = `
                    <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover-scale">
                        ${komponenGambar}
                        <div class="p-6">
                            <h2 class="text-xl font-bold mb-2">
                                <a href="${urlBaca}" class="text-gray-800 hover:text-red-600">${data.title}</a>
                            </h2>
                            <p class="text-gray-500 text-sm">${tanggalFormatted}</p>
                            <p class="text-gray-600 mt-2">${ringkasanText}</p>
                            <a href="${urlBaca}" class="inline-block mt-4 text-red-600 font-semibold">Baca →</a>
                        </div>
                    </div>
                `;
                
                gridContainer.innerHTML += kartuArtikel;
            });

        } catch (error) {
            console.error("Error mengambil data: ", error);
            gridContainer.innerHTML = '<div class="col-span-full text-center py-10 text-red-500">Gagal memuat artikel. Cek koneksi atau Firebase Index.</div>';
        }
    }

    // Jalankan fungsi saat halaman dibuka
    window.addEventListener('DOMContentLoaded', loadBeritaUtama);
</script>
