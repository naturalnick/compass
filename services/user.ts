import { db } from "@/firebaseConfig";
import { User } from "@/models/User";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { userConverter } from "./converter";

export async function addUser(user: User) {
	await setDoc(doc(db, "users", user.id).withConverter(userConverter), user);
}

export async function getUser(userId: string) {
	const userRef = doc(db, "users", userId).withConverter(userConverter);
	const userSnap = await getDoc(userRef);
	if (userSnap.exists()) {
		return userSnap.data();
	}
	return null;
}
