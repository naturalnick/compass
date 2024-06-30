import { Timestamp } from "firebase/firestore";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export function formatDate(timestamp: Timestamp) {
	if (!timestamp) return "(Error retrieving date)";

	const today = new Date();
	const date = new Date(timestamp.toString());
	const sameYear = date.getFullYear() === today.getFullYear();
	const sameMonth = date.getMonth() === today.getMonth();
	const wasYesterday =
		sameYear && sameMonth && date.getDate() - today.getDate() === 1;
	// does not work if yesterday falls into another month - TODO

	if (date.toDateString() === today.toDateString()) return "Today";
	if (wasYesterday) return "Yesterday";

	const dateString = date.toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
	return dateString;
}

export function isValidLettersOnly(input: string): boolean {
	return /^[A-Za-z\s\-]+$/.test(input);
}

export function generateUniqueId() {
	return uuidv4().replace(/-/g, "").substring(0, 20); // Remove hyphens and trim to 20 characters
}

export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
	const passwordRegex =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	return passwordRegex.test(password);
}
