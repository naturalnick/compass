import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBKcMhIzT2s-EAclaSyjMQ3fhBy6IXUlCM",
	authDomain: "icompass-75fb6.firebaseapp.com",
	projectId: "icompass-75fb6",
	storageBucket: "icompass-75fb6.appspot.com",
	messagingSenderId: "981049273251",
	appId: "1:981049273251:web:0c0b46b11f7d691c748816",
	measurementId: "G-M2VQ6NJWBS",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);