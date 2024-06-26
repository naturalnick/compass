import { Compass } from "@/models/Compass";
import { Prompt } from "@/models/Prompt";

import {
	Timestamp,
	type QueryDocumentSnapshot,
	type SnapshotOptions,
} from "firebase/firestore";

const createFirestoreConverter = <T extends { dateUpdated: Timestamp }>() => {
	return {
		toFirestore: (item: T) => {
			return {
				...item,
				dateUpdated: Timestamp.now(),
			};
		},
		fromFirestore: (
			snapshot: QueryDocumentSnapshot<T>,
			options?: SnapshotOptions
		) => {
			const data = snapshot.data(options);
			return {
				...data,
				id: snapshot.id,
				dateUpdated: data.dateUpdated?.toDate(),
			};
		},
	};
};

export const compassConverter = createFirestoreConverter<Compass>();
export const promptConverter = createFirestoreConverter<Prompt>();
