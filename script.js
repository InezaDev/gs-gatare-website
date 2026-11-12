import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCk5pHtd2a9P74pVQUd_PIaHvaYVFzqrfw",
  authDomain: "gs-gatare-portal.firebaseapp.com",
  projectId: "gs-gatare-portal",
  storageBucket: "gs-gatare-portal.firebasestorage.app",
  messagingSenderId: "995142418810",
  appId: "1:995142418810:web:cf1cb0d971541a362cd6c3"
};
// ------------------------------------------

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// --- 2. WEBSITE UI LOGIC ---
const signInBtn = document.getElementById("signInBtn");
const dashboardBtn = document.getElementById("dashboardBtn");
const authModal = document.getElementById("authModal");
const dashModal = document.getElementById("dashboard");
const dashLogout = document.getElementById("dashLogout");
const closeAuthBtns = document.querySelectorAll("[data-close-modal]");

// Open Sign-In Modal
if (signInBtn) {
  signInBtn.addEventListener("click", () => {
    authModal.classList.add("open");
  });
}

// Close Sign-In Modal
closeAuthBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    authModal.classList.remove("open");
  });
});

// Open Dashboard
if (dashboardBtn) {
  dashboardBtn.addEventListener("click", () => {
    dashModal.classList.add("open");
  });
}

// Close Dashboard
document.querySelectorAll("[data-close-dash]").forEach(btn => {
  btn.addEventListener("click", () => {
    dashModal.classList.remove("open");
  });
});

// --- 3. GOOGLE SIGN-IN LOGIC ---
const googleSignInBtn = document.getElementById("googleSignInBtn");
if (googleSignInBtn) {
  googleSignInBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Logged in successfully:", user.displayName);
        
        // Update Dashboard UI
        document.getElementById("dashUserName").textContent = user.displayName;
        document.getElementById("studentName").textContent = user.displayName.split(" ")[0];
        document.getElementById("dashRoleBadge").textContent = "Student";
        
        // Show Dashboard, Hide Modal
        authModal.classList.remove("open");
        dashModal.classList.add("open");
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
        alert("Login failed: " + error.message);
      });
  });
}

// --- 4. LOGOUT LOGIC ---
if (dashLogout) {
  dashLogout.addEventListener("click", () => {
    auth.signOut().then(() => {
      dashModal.classList.remove("open");
      alert("You have been logged out.");
    });
  });
}

// --- 5. KEEP TRACK OF USER STATE ---
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    if (signInBtn) signInBtn.classList.add("hidden");
    if (dashboardBtn) dashboardBtn.classList.remove("hidden");
  } else {
    // User is signed out
    if (signInBtn) signInBtn.classList.remove("hidden");
    if (dashboardBtn) dashboardBtn.classList.add("hidden");
  }
});

// --- 6. FOOTER YEAR ---
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
