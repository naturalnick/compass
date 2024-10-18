import { db } from "@/firebaseConfig";
import { User } from "@/models/User";
import { deleteUser, User as fUser } from "firebase/auth";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
	writeBatch,
} from "firebase/firestore";
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

export async function deleteUserAccount(user: fUser, userId: string) {
	try {
		//deactivate user doc
		const batch = writeBatch(db);
		const userRef = doc(db, "users", userId).withConverter(userConverter);
		batch.set(
			userRef,
			{
				active: false,
			},
			{ merge: true }
		);

		//delete user compasses
		const q = query(
			collection(db, "compasses"),
			where("userId", "==", userId)
		);
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			batch.delete(doc.ref);
		});

		await batch.commit();

		await deleteUser(user);
	} catch (error) {
		console.log(error);
	}
}
