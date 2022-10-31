// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuU3pDXq_Wbt_FZxIOfwR6qCVRgIlu1NY",
  authDomain: "petmenow-53992.firebaseapp.com",
  projectId: "petmenow-53992",
  storageBucket: "petmenow-53992.appspot.com",
  messagingSenderId: "877532035108",
  appId: "1:877532035108:web:759094317957fa804cc0b1",
  measurementId: "G-N4EJRFQZK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();