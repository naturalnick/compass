import { Timestamp } from "firebase/firestore";

export enum CompassType {
	personal = "personal",
	business = "business",
	family = "family",
}

export class Compass {
	id?: string;
	userId: string;
	title: string;
	type: CompassType;
	statement: string;
	dateCreated: Timestamp;
	dateUpdated: Timestamp;
	prompts: Prompt[];
	promptIndex: number;
	coreValues: string[];
	customValues: string[];

	constructor(
		id: string,
		userId: string,
		title: string,
		type: CompassType,
		statement: string,
		dateCreated: Timestamp,
		dateUpdated: Timestamp,
		prompts: Prompt[],
		promptIndex: number,
		coreValues: string[],
		customValues: string[]
	) {
		this.id = id;
		this.userId = userId;
		this.title = title;
		this.type = type;
		this.statement = statement;
		this.dateCreated = dateCreated;
		this.dateUpdated = dateUpdated;
		this.prompts = prompts;
		this.promptIndex = promptIndex;
		this.coreValues = coreValues;
		this.customValues = customValues;
	}
}

class Prompt {
	prompt: string;
	tips: string;
	response?: string;

	constructor(prompt: string, tips: string, response: string) {
		this.prompt = prompt;
		this.tips = tips;
		this.response = response;
	}
}
