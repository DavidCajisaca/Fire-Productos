import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD4_lzdvTdQD6IeKYkUnazHOQoFcxlVnSo',
  authDomain: 'productos-43166.firebaseapp.com',
  projectId: 'productos-43166',
  storageBucket: 'productos-43166.firebasestorage.app',
  messagingSenderId: '1044689718578',
  appId: '1:1044689718578:web:9efe39af04a1c9a5ec5b2b',
  measurementId: 'G-WMJKYKF6WZ',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);