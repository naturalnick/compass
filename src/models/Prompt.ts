import { Timestamp } from "firebase/firestore";

export class Prompt {
	id: string;
	prompt: string;
	response: string;
	dateCreated: Timestamp;
	dateUpdated: Timestamp;

	constructor(id: string, prompt: string, response: string) {
		this.id = id;
		this.prompt = prompt;
		this.response = response;
		this.dateCreated = Timestamp.now();
		this.dateUpdated = Timestamp.now();
	}
}
