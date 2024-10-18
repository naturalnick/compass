import { Timestamp } from "firebase/firestore";

export class User {
	id: string;
	authId: string;
	email: string;
	dateCreated: Timestamp;
	dateUpdated: Timestamp;
	active: boolean;

	constructor(id: string, authId: string, email: string) {
		this.id = id;
		this.authId = authId;
		this.email = email;
		this.dateCreated = Timestamp.now();
		this.dateUpdated = Timestamp.now();
		this.active = true;
	}
}
