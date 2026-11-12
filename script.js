import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ==========================================
// 1. FIREBASE CONFIGURATION
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyCk5pHtd2a9P74pVQUd_PIaHvaYVFzqrfw",
  authDomain: "gs-gatare-portal.firebaseapp.com",
  projectId: "gs-gatare-portal",
  storageBucket: "gs-gatare-portal.firebasestorage.app",
  messagingSenderId: "995142418810",
  appId: "1:995142418810:web:cf1cb0d971541a362cd6c3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// 🚨 CHANGE THIS TO YOUR GOOGLE EMAIL! 🚨
const ADMIN_EMAIL = "niyonshutiismael9@gmail.com"; 

// ==========================================
// 2. THREE.JS 3D BACKGROUND
// ==========================================
const canvas = document.getElementById('webgl-canvas');
if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.IcosahedronGeometry(2.5, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x28634d, wireframe: true, emissive: 0xe4b85e, emissiveIntensity: 0.4, transparent: true, opacity: 0.6 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const geometryOuter = new THREE.IcosahedronGeometry(3, 2);
    const materialOuter = new THREE.MeshBasicMaterial({ color: 0xe4b85e, wireframe: true, transparent: true, opacity: 0.15 });
    const outerSphere = new THREE.Mesh(geometryOuter, materialOuter);
    scene.add(outerSphere);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pointLight = new THREE.PointLight(0xe4b85e, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    camera.position.z = 6;

    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        targetX = mouseX * 0.001; targetY = mouseY * 0.001;
        sphere.rotation.y += 0.002; sphere.rotation.x += 0.001;
        outerSphere.rotation.y -= 0.001; outerSphere.rotation.x -= 0.002;
        sphere.position.y = Math.sin(elapsedTime * 0.5) * 0.2;
        outerSphere.position.y = Math.cos(elapsedTime * 0.5) * 0.2;
        sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y);
        sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
        renderer.render(scene, camera);
    }
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    animate();
}

// ==========================================
// 3. SCROLL ANIMATIONS
// ==========================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ==========================================
// 4. UI ELEMENTS & NAVIGATION
// ==========================================
const signInBtn = document.getElementById("signInBtn");
const dashboardBtn = document.getElementById("dashboardBtn");
const authModal = document.getElementById("authModal");
const dashModal = document.getElementById("dashboard");
const dashLogout = document.getElementById("dashLogout");
const googleSignInBtn = document.getElementById("googleSignInBtn");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));

if (signInBtn) {
  signInBtn.addEventListener("click", () => {
    authModal.classList.add("open");
    if (navLinks) navLinks.classList.remove("open");
  });
}

document.querySelectorAll("[data-close-modal]").forEach(btn => btn.addEventListener("click", () => authModal.classList.remove("open")));
document.querySelectorAll("[data-close-dash]").forEach(btn => btn.addEventListener("click", () => dashModal.classList.remove("open")));

if (dashboardBtn) {
  dashboardBtn.addEventListener("click", () => {
    dashModal.classList.add("open");
    if (navLinks) navLinks.classList.remove("open");
  });
}

// ==========================================
// 5. AUTHENTICATION & DASHBOARD LOGIC
// ==========================================
googleSignInBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider).catch(err => alert("Login failed: " + err.message));
});

dashLogout.addEventListener("click", () => signOut(auth));

onAuthStateChanged(auth, (user) => {
  if (user) {
    signInBtn.classList.add("hidden");
    dashboardBtn.classList.remove("hidden");
    document.getElementById("dashUserName").textContent = user.displayName;
    document.getElementById("studentName").textContent = user.displayName.split(" ")[0];

    // Check if Admin or Student
    if (user.email === ADMIN_EMAIL) {
      document.getElementById("adminView").classList.remove("hidden");
      document.getElementById("studentView").classList.add("hidden");
      loadAdminInquiries();
    } else {
      document.getElementById("adminView").classList.add("hidden");
      document.getElementById("studentView").classList.remove("hidden");
      loadAnnouncements();
    }
  } else {
    signInBtn.classList.remove("hidden");
    dashboardBtn.classList.add("hidden");
    dashModal.classList.remove("open");
    authModal.classList.remove("open");
  }
});

// ==========================================
// 6. FIRESTORE: PUBLIC FORMS & NEWS
// ==========================================
const inquiryForm = document.getElementById("inquiryForm");
if (inquiryForm) {
  inquiryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("submitInquiryBtn");
    btn.textContent = "Sending...";

    try {
      await addDoc(collection(db, "inquiries"), {
        name: document.getElementById("fullName").value,
        phone: document.getElementById("phone").value,
        program: document.getElementById("program").value,
        message: document.getElementById("message").value,
        date: serverTimestamp()
      });
      document.getElementById("formSuccess").classList.remove("hidden");
      inquiryForm.reset();
      setTimeout(() => document.getElementById("formSuccess").classList.add("hidden"), 4000);
    } catch (error) {
      alert("Error sending inquiry: " + error.message);
    }
    btn.textContent = "Send inquiry ↗";
  });
}

async function loadAnnouncements() {
  const newsGrid = document.getElementById("newsGrid");
  const studentNews = document.getElementById("studentAnnouncements");
  
  try {
    const q = query(collection(db, "announcements"), orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      if (newsGrid) newsGrid.innerHTML = "<p>No announcements yet.</p>";
      if (studentNews) studentNews.innerHTML = "<p>No announcements yet.</p>";
      return;
    }

    let publicHTML = "";
    let studentHTML = "";

    snapshot.forEach((doc) => {
      const data = doc.data();
      publicHTML += `
        <article class="news-card">
          <span class="news-label">${data.category.toUpperCase()}</span>
          <div class="news-date">NEW <small>UPDATE</small></div>
          <h3>${data.title}</h3>
          <p>${data.message}</p>
        </article>`;
      
      studentHTML += `
        <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
          <strong style="color: var(--navy);">${data.title}</strong>
          <p style="margin: 5px 0 0 0; font-size: 12px;">${data.message}</p>
        </div>`;
    });

    if (newsGrid) newsGrid.innerHTML = publicHTML;
    if (studentNews) studentNews.innerHTML = studentHTML;

  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

// ==========================================
// 7. FIRESTORE: ADMIN DASHBOARD LOGIC
// ==========================================
const addNewsForm = document.getElementById("addNewsForm");
if (addNewsForm) {
  addNewsForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("newsTitle").value;
    const category = document.getElementById("newsCategory").value;
    const message = document.getElementById("newsMessage").value;

    try {
      await addDoc(collection(db, "announcements"), {
        title: title,
        category: category,
        message: message,
        date: serverTimestamp()
      });
      document.getElementById("newsSuccess").classList.remove("hidden");
      addNewsForm.reset();
      loadAnnouncements(); // Refresh public view
      setTimeout(() => document.getElementById("newsSuccess").classList.add("hidden"), 4000);
    } catch (error) {
      alert("Error publishing news: " + error.message);
    }
  });
}

async function loadAdminInquiries() {
  const adminInquiries = document.getElementById("adminInquiries");
  if (!adminInquiries) return;
  
  try {
    const q = query(collection(db, "inquiries"), orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      adminInquiries.innerHTML = "<p>No inquiries yet.</p>";
      return;
    }

    let html = "";
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      html += `
        <div class="news-item-admin">
          <h4>${data.name} (${data.program})</h4>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Message:</strong> ${data.message}</p>
          <button class="delete-btn" onclick="deleteInquiry('${docSnap.id}')">Delete</button>
        </div>`;
    });
    adminInquiries.innerHTML = html;
  } catch (error) {
    console.error("Error loading inquiries:", error);
  }
}

// Global delete function for admin
window.deleteInquiry = async function(id) {
  if (confirm("Are you sure you want to delete this inquiry?")) {
    try {
      await deleteDoc(doc(db, "inquiries", id));
      loadAdminInquiries(); // Refresh list
    } catch (error) {
      alert("Error deleting: " + error.message);
    }
  }
};

// Initialize public news on page load
loadAnnouncements();

// Footer Year
document.getElementById("year").textContent = new Date().getFullYear();
