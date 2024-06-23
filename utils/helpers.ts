import { Timestamp } from "firebase/firestore";

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
