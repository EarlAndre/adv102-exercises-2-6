import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDudINvagSfjQIKiX_86L0u5c-ZmZv5kcs",
  authDomain: "carinadv-fd456.firebaseapp.com",
  projectId: "carinadv-fd456",
  storageBucket: "carinadv-fd456.firebasestorage.app",
  messagingSenderId: "1048459387507",
  appId: "1:1048459387507:web:f8b4892d0d5e0f79458006",
  measurementId: "G-SK3HZ001R7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };