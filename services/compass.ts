import { Compass, CompassType } from "@/models/Compass";
import {
	QueryDocumentSnapshot,
	Timestamp,
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	query,
	serverTimestamp,
	setDoc,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
	businessPrompts,
	familyPrompts,
	personalPrompts,
} from "../constants/prompts";
import { db } from "../firebaseConfig";
import { compassConverter } from "./converter";

export async function addCompass(userId: string, type: CompassType) {
	const newDoc = await addDoc(
		collection(db, "compasses").withConverter(compassConverter),
		{
			userId: userId,
			type: type,
			title: getDefaultCompassTitle(type),
			statement: "",
			dateCreated: Timestamp.now(),
			dateUpdated: Timestamp.now(),
			prompts: getPrompts(type),
			promptIndex: 0,
			coreValues: [],
			customValues: [],
		}
	);

	return newDoc.id;
}

export function useCompasses(userId: string) {
	const [compasses, setCompasses] = useState<Compass[] | undefined>(
		undefined
	);

	useEffect(() => {
		const q = query(
			collection(db, "compasses").withConverter(compassConverter),
			where("userId", "==", userId)
		);

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const compasses: Compass[] = [];
			querySnapshot.forEach((doc) => {
				compasses.push(doc.data());
			});

			setCompasses(compasses);
		});

		return () => unsubscribe();
	}, []);

	return compasses;
}

export function useCompass(compassId: string | undefined) {
	const [compass, setCompass] = useState<Compass | null | undefined>(
		undefined
	);

	if (compassId === undefined) return null;

	useEffect(() => {
		const unsubscribe = onSnapshot(
			doc(db, "compasses", compassId).withConverter(compassConverter),
			(doc) => {
				if (doc.exists()) setCompass(doc.data());
				else setCompass(null);
			},
			(error) => {
				console.log(error);
				setCompass(null);
			}
		);
		return () => unsubscribe();
	}, []);

	return compass;
}

function getDefaultCompassTitle(type: CompassType) {
	switch (type) {
		case CompassType.personal:
			return "My Compass";
		case CompassType.business:
			return "Company Compass";
		case CompassType.family:
			return "Family Compass";
	}
}

function getPrompts(type: CompassType) {
	switch (type) {
		case CompassType.personal:
			return personalPrompts;
		case CompassType.business:
			return businessPrompts;
		case CompassType.family:
			return familyPrompts;
	}
}
