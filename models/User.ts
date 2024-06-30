import { Timestamp } from "firebase/firestore";

export class User {
	id: string;
	email: string;
	dateCreated: Timestamp;
	dateUpdated: Timestamp;

	constructor(id: string, email: string) {
		this.id = id;
		this.email = email;
		this.dateCreated = Timestamp.now();
		this.dateUpdated = Timestamp.now();
	}
}
