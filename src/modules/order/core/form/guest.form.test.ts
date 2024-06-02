import type { IIDProvider } from "@ratatouille/modules/core/id-provider";
import { GuestForm } from "@ratatouille/modules/order/core/form/guest.form";
import { GuestFactory } from "@ratatouille/modules/order/core/model/guest.factory";
import type { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { describe, expect, it } from "vitest";

class StubIDProvider implements IIDProvider {
	generate() {
		return "1";
	}
}

const johnDoe = GuestFactory.create({
	id: "1",
	firstName: "John",
	lastName: "Doe",
	age: 24,
});

const janeDoe = GuestFactory.create({
	id: "2",
	firstName: "Jane",
	lastName: "Doe",
	age: 24,
});

const EMPTY_INITIAL_STATE: OrderingDomainModel.Form = {
	guests: [],
	organizerId: null,
	tableId: null,
};
const STATE_WITH_ONE_GUEST: OrderingDomainModel.Form = {
	guests: [johnDoe],
	organizerId: null,
	tableId: null,
};
const STATE_WITH_TWO_GUESTS: OrderingDomainModel.Form = {
	guests: [johnDoe, janeDoe],
	organizerId: null,
	tableId: null,
};
const idProvider = new StubIDProvider();
const form = new GuestForm(idProvider);

describe("Add a guest", () => {
	it("should add a guest", () => {
		// Given
		// When
		// Then

		const state = form.addGuest(EMPTY_INITIAL_STATE);
		expect(state.guests).toEqual([
			{
				id: "1",
				firstName: "John",
				lastName: "Doe",
				age: 0,
				meals: {
					entry: null,
					mainCourse: null,
					dessert: null,
					drink: null,
				},
			},
		]);
	});

	it("should add a guest when there's already one", () => {
		const state = form.addGuest(STATE_WITH_ONE_GUEST);
		expect(state.guests).toEqual([
			{
				id: "1",
				firstName: "John",
				lastName: "Doe",
				age: 24,
				meals: {
					entry: null,
					mainCourse: null,
					dessert: null,
					drink: null,
				},
			},
			{
				id: "1",
				firstName: "John",
				lastName: "Doe",
				age: 0,
				meals: {
					entry: null,
					mainCourse: null,
					dessert: null,
					drink: null,
				},
			},
		]);
	});
	it("should add a guest when there's already two", () => {
		const state = form.addGuest(STATE_WITH_TWO_GUESTS);
		expect(state.guests).toEqual([
			{
				id: "1",
				firstName: "John",
				lastName: "Doe",
				age: 24,
				meals: {
					entry: null,
					mainCourse: null,
					dessert: null,
					drink: null,
				},
			},
			{
				id: "2",
				firstName: "Jane",
				lastName: "Doe",
				age: 24,
				meals: {
					entry: null,
					mainCourse: null,
					dessert: null,
					drink: null,
				},
			},
			{
				id: "1",
				firstName: "John",
				lastName: "Doe",
				age: 0,
				meals: {
					entry: null,
					mainCourse: null,
					dessert: null,
					drink: null,
				},
			},
		]);
	});
});

describe("Removing a guest", () => {
	it("when there is no user, the remove should do nothing", () => {
		const state = form.removeGuest(EMPTY_INITIAL_STATE, "1");
		expect(state.guests).toEqual([]);
	});
	it("when there is a user with ID 1, the user with ID 1 should be removed", () => {
		const state = form.removeGuest(STATE_WITH_ONE_GUEST, "1");
		expect(state.guests).toEqual([]);
	});
	it("when there's two users, only the user with ID 1 should be removed", () => {
		const state = form.removeGuest(STATE_WITH_TWO_GUESTS, "1");
		expect(state.guests).toEqual([
			{
				id: "2",
				firstName: "Jane",
				lastName: "Doe",
				age: 24,
				meals: {
					entry: null,
					mainCourse: null,
					dessert: null,
					drink: null,
				},
			},
		]);
	});
	it("when  I remove an organizer, it should set the organizerId to null", () => {
		const stateWithOrganizer = {
			...STATE_WITH_ONE_GUEST,
			organizerId: "1",
		};
		const state = form.removeGuest(stateWithOrganizer, "1");
		expect(state.organizerId).toEqual(null);
	});
});

describe("Add an organizer", () => {
	it("set organizer ID when the user does not exist", () => {
		const state = form.changeOrganizer(EMPTY_INITIAL_STATE, "1");
		expect(state.organizerId).toEqual(null);
	});
	it("set organizer ID when the user exists", () => {
		const state = form.changeOrganizer(STATE_WITH_ONE_GUEST, "1");
		expect(state.organizerId).toEqual("1");
	});
});

describe("Is Submittable", () => {
	it("when no guest is an organizer, it should not be submittable", () => {
		const isSubmittable = form.isSubmittable(EMPTY_INITIAL_STATE);
		expect(isSubmittable).toEqual(false);
	});
	it("when a guest is an organizer, it should be submittable", () => {
		const withOrganizerState = {
			...STATE_WITH_ONE_GUEST,
			organizerId: "1",
		};
		const isSubmittable = form.isSubmittable(withOrganizerState);
		expect(isSubmittable).toEqual(true);
	});
	it.each([{ age: 0 }, { firstName: "" }, { lastName: "" }])(
		"when the guest has an invalid %s, it should not be submittable",
		(invalidField) => {
			const withOrganizerState = {
				...STATE_WITH_ONE_GUEST,
				organizerId: "1",
				guests: [{ ...johnDoe, ...invalidField }],
			};
			const isSubmittable = form.isSubmittable(withOrganizerState);
			expect(isSubmittable).toEqual(false);
		},
	);
});

describe("Update a guest", () => {
	it.each([
		{ key: "firstName" as keyof OrderingDomainModel.Guest, value: "Jane" },
		{ key: "lastName" as keyof OrderingDomainModel.Guest, value: "Doe" },
		{ key: "age" as keyof OrderingDomainModel.Guest, value: 18 },
	])("should change the %s of the guest", ({ key, value }) => {
		const state = form.updateGuest(STATE_WITH_ONE_GUEST, "1", key, value);
		expect(state.guests[0][key]).toEqual(value);
	});

	it("should do nothing when the guest does not exist", () => {
		const state = form.updateGuest(
			EMPTY_INITIAL_STATE,
			"1",
			"firstName",
			"Jane",
		);
		expect(state.guests).toEqual([]);
	});
});
