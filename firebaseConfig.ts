import { getReactNativePersistence, initializeAuth } from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_API_KEY,
	authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
	storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.EXPO_PUBLIC_MESSANGING_SENDER_ID,
	appId: process.env.EXPO_PUBLIC_APP_ID,
	measurementId: process.env.EXPO_PUBLIC_MEASURMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const fAuth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { db, fAuth };
