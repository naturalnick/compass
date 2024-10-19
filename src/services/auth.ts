import {
	createUserWithEmailAndPassword,
	User as fUser,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

import { User } from "@/src/models/User";
import { FirebaseError } from "firebase/app";
import { addUser } from "./user";

export function useFirebaseAuth() {
	const [user, setUser] = useState<fUser | null>();
	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setUser(user);
		});
		return () => {
			unsubscribe();
		};
	}, []);
	return user;
}

export async function signInUser(email: string, password: string) {
	const auth = getAuth();
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		throw "Error signing in. Please check your email and password and try again.";
	}
}

export async function signUpUser(
	userId: string,
	email: string,
	password: string
) {
	try {
		const auth = getAuth();
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		const newUser = new User(userId, userCredential.user.uid, email);
		await addUser(newUser);
	} catch (error) {
		console.error(error);
		throw "Error signing up. Please check your email and password and try again.";
	}
}

export async function signOutUser() {
	const auth = getAuth();
	await signOut(auth);
}
