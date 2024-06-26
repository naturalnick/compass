import { Timestamp } from "firebase/firestore";

export class Prompt {
	id: string;
	prompt: string;
	response: string;
	dateCreated: Timestamp;
	dateUpdated: Timestamp;

	constructor(
		id: string,
		prompt: string,
		response: string,
		dateCreated: Timestamp,
		dateUpdated: Timestamp
	) {
		this.id = id;
		this.prompt = prompt;
		this.response = response;
		this.dateCreated = dateCreated;
		this.dateUpdated = dateUpdated;
	}
}
