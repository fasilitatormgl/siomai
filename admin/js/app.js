import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// === FIREBASE CONFIGURATION ===
const firebaseConfig = {
  apiKey: "AIzaSyDv9zylwxNutc2zV-0U2yXHa6ioT0usBVQ",
  authDomain: "siomaimagelang.firebaseapp.com",
  projectId: "siomaimagelang",
  // Firebase Storage dihapus dari konfigurasi karena kita pakai yang gratis dari ImgBB
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// === CONFIGURATION IMGBB (GRATIS) ===
// Masukkan API KEY yang Anda dapatkan dari api.imgbb.com di bawah ini:
const IMGBB_API_KEY = "751653229ba1e85aa3bfc49f03e2d5cb"; 

// Fungsi Pembantu untuk Upload ke ImgBB
async function uploadToImgBB(file) {
    if (IMGBB_API_KEY === "PASTE_API_KEY_IMGBB_MU_DI_SINI") {
        throw new Error("API Key ImgBB belum dimasukkan di file app.js!");
    }
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    if (result.success) {
        return result.data.url; // Mengembalikan URL gambar langsung
    } else {
        throw new Error(result.error.message || "Gagal upload ke ImgBB");
    }
}

// === UI ELEMENTS ===
const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const editorForm = document.getElementById('editor-form');

// === CUSTOM IMAGE HANDLER FOR QUILL (Inline Image via ImgBB) ===
const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
        const file = input.files[0];
        if (!file) return;

        const uploadStatusEl = document.getElementById('upload-status');
        if (uploadStatusEl) uploadStatusEl.textContent = 'Menyisipkan gambar ke dalam postingan...';

        try {
            // Upload ke ImgBB gratisan
            const downloadURL = await uploadToImgBB(file);
            
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', downloadURL);
            quill.setSelection(range.index + 1);
            
            if (uploadStatusEl) uploadStatusEl.textContent = 'Gambar berhasil disisipkan!';
            setTimeout(() => { if (uploadStatusEl) uploadStatusEl.textContent = ''; }, 3000);

        } catch (error) {
            alert('Gagal menyisipkan gambar: ' + error.message);
            if (uploadStatusEl) uploadStatusEl.textContent = '';
        }
    };
};

// === INITIALIZE QUILL EDITOR WITH FULL TOOLBAR ===
const toolbarOptions = [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],        
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],          
    [{ 'align': [] }],
    ['link', 'image'], 
    ['clean']                                         
];

const quill = new Quill('#editor-container', {
    theme: 'snow',
    placeholder: 'Tulis isi berita di sini...',
    modules: {
        toolbar: {
            container: toolbarOptions,
            handlers: {
                image: imageHandler 
            }
        }
    }
});

// === AUTHENTICATION LOGIC ===
onAuthStateChanged(auth, (user) => {
    if (user) {
        loginScreen.classList.add('hidden');
        dashboardScreen.classList.remove('hidden');
        loadBerita();
    } else {
        loginScreen.classList.remove('hidden');
        dashboardScreen.classList.add('hidden');
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');
    
    try {
        await signInWithEmailAndPassword(auth, email, password);
        errorEl.classList.add('hidden');
    } catch (error) {
        errorEl.textContent = "Login Gagal: Periksa email & password!";
        errorEl.classList.remove('hidden');
    }
});

logoutBtn.addEventListener('click', () => {
    signOut(auth);
});

// === FITUR LIHAT / SEMBUNYIKAN PASSWORD ===
const togglePasswordBtn = document.getElementById('toggle-password');
const passwordInput = document.getElementById('login-password');

if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordBtn.textContent = type === 'password' ? 'Lihat' : 'Sembunyikan';
    });
}

// === UPLOAD GAMBAR COVER LOGIC (Via ImgBB) ===
const imageInput = document.getElementById('post-image');
if (imageInput) {
    imageInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const statusEl = document.getElementById('upload-status');
        statusEl.textContent = 'Mengupload gambar cover ke ImgBB...';

        try {
            // Upload ke ImgBB gratisan
            const downloadURL = await uploadToImgBB(file);
            
            document.getElementById('post-image-url').value = downloadURL;
            document.getElementById('image-preview').src = downloadURL;
            document.getElementById('image-preview-container').classList.remove('hidden');
            statusEl.textContent = 'Upload cover berhasil!';
        } catch (error) {
            statusEl.textContent = 'Upload gagal: ' + error.message;
        }
    });
}

// === CRUD BERITA ===
editorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('post-id').value;
    const title = document.getElementById('post-title').value;
    const category = document.getElementById('post-category').value;
    const status = document.getElementById('post-status').value;
    const imageUrl = document.getElementById('post-image-url').value;
    const content = quill.root.innerHTML; 

    const data = {
        title, category, status, imageUrl, content,
        updatedAt: serverTimestamp()
    };

    try {
        if (id) {
            await updateDoc(doc(db, "berita", id), data);
            alert("Berita berhasil diupdate!");
        } else {
            data.createdAt = serverTimestamp();
            await addDoc(collection(db, "berita"), data);
            alert("Berita berhasil ditambahkan!");
        }
        editorForm.reset();
        quill.root.innerHTML = '';
        document.getElementById('image-preview-container').classList.add('hidden');
        document.getElementById('post-id').value = '';
        
        document.querySelectorAll('.section').forEach(el => el.classList.add('hidden'));
        document.getElementById('list-berita').classList.remove('hidden');
        loadBerita();

    } catch (error) {
        alert("Terjadi kesalahan saat menyimpan: " + error.message);
    }
});

// Load Data Berita
async function loadBerita() {
    const tbody = document.getElementById('berita-table-body');
    tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4">Memuat data...</td></tr>';
    
    try {
        const querySnapshot = await getDocs(collection(db, "berita"));
        tbody.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const tr = document.createElement('tr');
            
            let statusClass = data.status === 'publish' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
            
            tr.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">${data.title}</td>
                <td class="px-6 py-4 whitespace-nowrap capitalize">${data.category}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
                        ${data.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-indigo-600 hover:text-indigo-900 mr-3 edit-btn" data-id="${doc.id}">Edit</button>
                    <button class="text-red-600 hover:text-red-900 delete-btn" data-id="${doc.id}">Hapus</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => editBerita(e.target.dataset.id));
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => deleteBerita(e.target.dataset.id));
        });

    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-red-500">Gagal memuat data</td></tr>';
    }
}

// Edit Berita Full Implementation
async function editBerita(id) {
    try {
        const snap = await getDocs(collection(db, "berita"));
        let currentData = null;
        
        snap.forEach((doc) => {
            if(doc.id === id) currentData = doc.data();
        });

        if(!currentData) return alert("Data tidak ditemukan!");

        document.getElementById('post-id').value = id;
        document.getElementById('post-title').value = currentData.title;
        document.getElementById('post-category').value = currentData.category;
        document.getElementById('post-status').value = currentData.status;
        
        quill.root.innerHTML = currentData.content;

        if (currentData.imageUrl) {
            document.getElementById('post-image-url').value = currentData.imageUrl;
            document.getElementById('image-preview').src = currentData.imageUrl;
            document.getElementById('image-preview-container').classList.remove('hidden');
        } else {
            document.getElementById('image-preview-container').classList.add('hidden');
        }

        document.querySelectorAll('.section').forEach(el => el.classList.add('hidden'));
        document.getElementById('tambah-berita').classList.remove('hidden');

    } catch (error) {
        alert("Gagal memuat data edit: " + error.message);
    }
}

// Delete Berita
async function deleteBerita(id) {
    if(confirm('Yakin ingin menghapus berita ini?')) {
        await deleteDoc(doc(db, "berita", id));
        loadBerita();
    }
}

// === PREVIEW ===
document.getElementById('btn-preview').addEventListener('click', () => {
    const title = document.getElementById('post-title').value;
    const content = quill.root.innerHTML;
    const img = document.getElementById('post-image-url').value;

    const previewHTML = `
        <h1 class="text-3xl font-bold mb-4">${title}</h1>
        ${img ? `<img src="${img}" class="w-full h-64 object-cover mb-4 rounded">` : ''}
        <div class="mt-4 prose max-w-none">${content}</div>
    `;

    document.getElementById('preview-content').innerHTML = previewHTML;
    document.getElementById('preview-modal').classList.remove('hidden');
});

document.getElementById('close-preview').addEventListener('click', () => {
    document.getElementById('preview-modal').classList.add('hidden');
});

window.loadBerita = loadBerita;
