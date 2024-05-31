export namespace OrderingDomainModel {
	export type Form = {
		guests: Guest[];
		organizerId: string | null;
	};
	export type Guest = {
		id: string;
		firstName: string;
		lastName: string;
		age: number;
	};
	export enum Step {
		GUEST = 0,
		TABLE = 1,
		MEALS = 2,
		SUMMARY = 3,
		RESERVED = 4,
	}
}
