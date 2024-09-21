import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBm7TqL8lbSVmHoYUY5Kn1Uj1sfZSlYWwA",
  authDomain: "bag-qr-code.firebaseapp.com",
  projectId: "bag-qr-code",
  storageBucket: "bag-qr-code.appspot.com",
  messagingSenderId: "410332278802",
  appId: "1:410332278802:web:66aabb95f4966191a0a8cb",
  measurementId: "G-ZZEWYRSW1X"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
