import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Paste your Firebase Web App config from Firebase Console -> Project Settings
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Set to true once you fill firebaseConfig and create a Firestore database
export const FIREBASE_ENABLED = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let db = null;

if (FIREBASE_ENABLED) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export async function saveAdmissionToCloud(admission) {
  if (!FIREBASE_ENABLED || !db) return { synced: false };
  await setDoc(doc(db, "admissions", admission.id), {
    ...admission,
    createdAt: serverTimestamp()
  });
  return { synced: true };
}

export async function lookupAdmissionFromCloud(id) {
  if (!FIREBASE_ENABLED || !db) return null;
  const snap = await getDoc(doc(db, "admissions", id.trim().toUpperCase()));
  return snap.exists() ? snap.data() : null;
}

export async function approveAdmissionInCloud(admissionId, studentRecord) {
  if (!FIREBASE_ENABLED || !db) return { synced: false };
  await updateDoc(doc(db, "admissions", admissionId), {
    status: "Approved",
    approvedAt: serverTimestamp()
  });
  await setDoc(doc(db, "students", studentRecord.regNo), {
    ...studentRecord,
    createdAt: serverTimestamp()
  });
  return { synced: true };
}

export async function saveStudentMarkInCloud(regNo, subject, score) {
  if (!FIREBASE_ENABLED || !db) return { synced: false };
  await updateDoc(doc(db, "students", regNo), {
    [`marks.${subject}`]: score,
    updatedAt: serverTimestamp()
  });
  return { synced: true };
}

export async function seedInitialCloudData(admissions, students) {
  if (!FIREBASE_ENABLED || !db) return;
  const existingApps = await getDocs(collection(db, "admissions"));
  if (existingApps.empty) {
    for (const item of admissions) {
      await setDoc(doc(db, "admissions", item.id), item);
    }
  }
  const existingStudents = await getDocs(collection(db, "students"));
  if (existingStudents.empty) {
    for (const st of students) {
      await setDoc(doc(db, "students", st.regNo), st);
    }
  }
}

export function subscribeToSchoolData(onDataChange) {
  if (!FIREBASE_ENABLED || !db) return () => {};

  const unsubAdmissions = onSnapshot(collection(db, "admissions"), (snap) => {
    const list = snap.docs.map((d) => d.data());
    if (list.length) onDataChange({ admissions: list });
  });

  const unsubStudents = onSnapshot(collection(db, "students"), (snap) => {
    const list = snap.docs.map((d) => d.data());
    if (list.length) onDataChange({ students: list });
  });

  return () => {
    unsubAdmissions();
    unsubStudents();
  };
}
