import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: "AIzaSyCAbxYmsHUEYSqvA1XuGGLRv3msNhQB-_c",
  authDomain: "outside-a307c.firebaseapp.com",
  projectId: "outside-a307c",
  storageBucket: "outside-a307c.firebasestorage.app",
  messagingSenderId: "596355509768",
  appId: "1:596355509768:web:806b0546547827e35dabbd",
  measurementId: "G-NSHKGBDVN4"
};
const app = initializeApp(firebaseConfig);


const firestore = getFirestore(app);

export {  firestore };