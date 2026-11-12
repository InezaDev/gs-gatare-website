import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ==========================================
// 1. THREE.JS 3D BACKGROUND
// ==========================================
const canvas = document.getElementById('webgl-canvas');
if (canvas) {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create the 3D object (A complex geometric shape)
    const geometry = new THREE.IcosahedronGeometry(2.5, 1);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x28634d, // Deep green
        wireframe: true,
        emissive: 0xe4b85e, // Gold glow
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.6
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add a slightly larger outer wireframe
    const geometryOuter = new THREE.IcosahedronGeometry(3, 2);
    const materialOuter = new THREE.MeshBasicMaterial({ 
        color: 0xe4b85e, // Gold
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const outerSphere = new THREE.Mesh(geometryOuter, materialOuter);
    scene.add(outerSphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xe4b85e, 1, 100); // Gold light
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 6;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Animation Loop
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse tracking
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        // Rotate the main sphere
        sphere.rotation.y += 0.002;
        sphere.rotation.x += 0.001;
        
        // Rotate outer sphere in opposite direction
        outerSphere.rotation.y -= 0.001;
        outerSphere.rotation.x -= 0.002;

        // Gentle floating effect based on time
        sphere.position.y = Math.sin(elapsedTime * 0.5) * 0.2;
        outerSphere.position.y = Math.cos(elapsedTime * 0.5) * 0.2;

        // Apply mouse interaction smoothly
        sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y);
        sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
        
        outerSphere.rotation.y += 0.05 * (-targetX - outerSphere.rotation.y);
        outerSphere.rotation.x += 0.05 * (-targetY - outerSphere.rotation.x);

        renderer.render(scene, camera);
    }

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
}


// ==========================================
// 2. FIREBASE AUTHENTICATION
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
const provider = new GoogleAuthProvider();

const signInBtn = document.getElementById("signInBtn");
const dashboardBtn = document.getElementById("dashboardBtn");
const authModal = document.getElementById("authModal");
const dashModal = document.getElementById("dashboard");
const dashLogout = document.getElementById("dashLogout");
const closeAuthBtns = document.querySelectorAll("[data-close-modal]");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

if (signInBtn) {
  signInBtn.addEventListener("click", () => {
    authModal.classList.add("open");
    if (navLinks) navLinks.classList.remove("open");
  });
}

closeAuthBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    authModal.classList.remove("open");
  });
});

if (dashboardBtn) {
  dashboardBtn.addEventListener("click", () => {
    dashModal.classList.add("open");
    if (navLinks) navLinks.classList.remove("open");
  });
}

document.querySelectorAll("[data-close-dash]").forEach(btn => {
  btn.addEventListener("click", () => {
    dashModal.classList.remove("open");
  });
});

const googleSignInBtn = document.getElementById("googleSignInBtn");
if (googleSignInBtn) {
  googleSignInBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        document.getElementById("dashUserName").textContent = user.displayName;
        document.getElementById("studentName").textContent = user.displayName.split(" ")[0];
        authModal.classList.remove("open");
        dashModal.classList.add("open");
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
        alert("Login failed: " + error.message);
      });
  });
}

if (dashLogout) {
  dashLogout.addEventListener("click", () => {
    auth.signOut().then(() => {
      dashModal.classList.remove("open");
      alert("You have been logged out.");
    });
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (signInBtn) signInBtn.classList.add("hidden");
    if (dashboardBtn) dashboardBtn.classList.remove("hidden");
  } else {
    if (signInBtn) signInBtn.classList.remove("hidden");
    if (dashboardBtn) dashboardBtn.classList.add("hidden");
  }
});

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
