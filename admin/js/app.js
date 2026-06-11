import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// === FIREBASE CONFIGURATION ===
// GANTI DENGAN CONFIG FIREBASE PROYEK SIOMAI ANDA
const firebaseConfig = {
  apiKey: "AIzaSyDv9zylwxNutc2zV-0U2yXHa6ioT0usBVQ",
  authDomain: "siomaimagelang.firebaseapp.com",
  projectId: "siomaimagelang",
  storageBucket: "siomaimagelang.firebasestorage.app",
  messagingSenderId: "365880128921",
  appId: "1:365880128921:web:59dc3e4a19968300464f08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// === UI ELEMENTS ===
const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const editorForm = document.getElementById('editor-form');

// Initialize Quill Editor
const quill = new Quill('#editor-container', {
    theme: 'snow',
    placeholder: 'Tulis isi berita di sini...'
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

// === UPLOAD GAMBAR LOGIC ===
const imageInput = document.getElementById('post-image');
imageInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, 'berita/' + Date.now() + '_' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const statusEl = document.getElementById('upload-status');

    statusEl.textContent = 'Mengupload gambar...';

    uploadTask.on('state_changed', 
        (snapshot) => {}, 
        (error) => {
            statusEl.textContent = 'Upload gagal: ' + error.message;
        }, 
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            document.getElementById('post-image-url').value = downloadURL;
            document.getElementById('image-preview').src = downloadURL;
            document.getElementById('image-preview-container').classList.remove('hidden');
            statusEl.textContent = 'Upload berhasil!';
        }
    );
});

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
            // Edit
            await updateDoc(doc(db, "berita", id), data);
            alert("Berita berhasil diupdate!");
        } else {
            // Tambah
            data.createdAt = serverTimestamp();
            await addDoc(collection(db, "berita"), data);
            alert("Berita berhasil ditambahkan!");
        }
        editorForm.reset();
        quill.root.innerHTML = '';
        document.getElementById('image-preview-container').classList.add('hidden');
        document.getElementById('post-id').value = '';
        
        // Return to list
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

        // Attach event listeners for edit and delete
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

// Edit Berita Placeholder (Fetching logic simplified)
async function editBerita(id) {
    // Logic to fetch doc by ID, populate form and show 'tambah-berita' section
    alert('Fungsi Edit dipanggil untuk ID: ' + id + '\n(Untuk full implementation, baca Firestore & isi form)');
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
        <div class="mt-4">${content}</div>
    `;

    document.getElementById('preview-content').innerHTML = previewHTML;
    document.getElementById('preview-modal').classList.remove('hidden');
});

document.getElementById('close-preview').addEventListener('click', () => {
    document.getElementById('preview-modal').classList.add('hidden');
});

// Make loadBerita available globally if needed
window.loadBerita = loadBerita;
