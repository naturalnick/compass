import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	onSnapshot,
	query,
	setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/firebaseConfig";
import { Prompt } from "../models/Prompt";
import { promptConverter } from "./converter";

export async function updatePrompt(
	compassId: string,
	promptId: string,
	prompt: string,
	response: string
) {
	const promptRef = doc(
		db,
		"compasses",
		compassId,
		"prompts",
		promptId
	).withConverter(promptConverter);

	if (response === "") {
		await deleteDoc(promptRef);
	} else {
		await setDoc(
			promptRef,
			{ prompt: prompt, response: response },
			{ merge: true }
		);
	}
}

export async function getPrompt(compassId: string, promptId: string) {
	const compassRef = doc(
		db,
		"compasses",
		compassId,
		"prompts",
		promptId
	).withConverter(promptConverter);
	const compassSnapshot = await getDoc(compassRef);
	if (compassSnapshot.exists()) {
		return compassSnapshot.data();
	}
	return null;
}

export function usePrompt(compassId: string, promptId: string) {
	const [prompt, setPrompt] = useState<Prompt | null | undefined>(undefined);

	useEffect(() => {
		async function loadPrompt() {
			const p = await getPrompt(compassId, promptId);
			setPrompt(p);
		}
		loadPrompt();
	}, [compassId, promptId]);

	return prompt;
}

export function usePrompts(compassId: string | undefined) {
	const [prompts, setPrompts] = useState<Prompt[] | undefined>(undefined);

	useEffect(() => {
		if (compassId === undefined) return;
		const q = query(
			collection(db, "compasses", compassId, "prompts").withConverter(
				promptConverter
			)
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const prompts: Prompt[] = [];
			querySnapshot.forEach((doc) => {
				prompts.push(doc.data());
			});

			setPrompts(prompts);
		});
		return () => unsubscribe();
	}, []);

	return prompts;
}
