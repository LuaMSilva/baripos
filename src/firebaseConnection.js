// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBtS_9kzfu030vvEZwT1-5bf1uXw3cElY8",
  authDomain: "baripos.firebaseapp.com",
  projectId: "baripos",
  storageBucket: "baripos.firebasestorage.app",
  messagingSenderId: "492714163196",
  appId: "1:492714163196:web:f6de386a2c016d4780d079",
  measurementId: "G-LES8Y6FW0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export { db, auth };