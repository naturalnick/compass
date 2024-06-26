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
		this.coreValues = coreValues;
		this.customValues = customValues;
	}
}
