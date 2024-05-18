import type { IIDProvider } from "@ratatouille/modules/core/id-provider";
import { GuestForm } from "@ratatouille/modules/order/core/form/guest.form";
import type { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { describe, expect, it } from "vitest";

class StubIDProvider implements IIDProvider {
	generate() {
		return "1";
	}
}

const EMPTY_INITIAL_STATE: OrderingDomainModel.Guest[] = [];
const STATE_WITH_ONE_GUEST: OrderingDomainModel.Guest[] = [
	{
		id: "1",
		firstName: "John",
		lastName: "Doe",
		age: 0,
	},
];
const STATE_WITH_TWO_GUESTS: OrderingDomainModel.Guest[] = [
	{
		id: "1",
		firstName: "John",
		lastName: "Doe",
		age: 0,
	},
	{
		id: "2",
		firstName: "John",
		lastName: "Doe",
		age: 0,
	},
];
const idProvider = new StubIDProvider();
const form = new GuestForm(idProvider);

describe("Add a guest", () => {
	it("should add a guest", () => {
		// Given
		// When
		// Then

		const state = form.addGuest(EMPTY_INITIAL_STATE);
		expect(state).toEqual([
			{
				id: "1",
				firstName: "John",
				lastName: "Doe",
				age: 0,
			},
		]);
	});

	it("should add a guest when there's already one", () => {
		const state = form.addGuest(STATE_WITH_ONE_GUEST);
		expect(state).toEqual([
			{
				id: "1",
				firstName: "John",
				lastName: "Doe",
				age: 0,
			},
			{
				id: "1",
				firstName: "John",
				lastName: "Doe",
				age: 0,
			},
		]);
	});
	it("should add a guest when there's already two", () => {
		const state = form.addGuest(STATE_WITH_TWO_GUESTS);
		expect(state).toEqual([
			{
				id: "1",
				firstName: "John",
				lastName: "Doe",
				age: 0,
			},
			{
				id: "2",
				firstName: "John",
				lastName: "Doe",
				age: 0,
			},
			{
				id: "1",
				firstName: "John",
				lastName: "Doe",
				age: 0,
			},
		]);
	});
});

describe("Removing a guest", () => {
	it("when there is no user, the remove should do nothing", () => {
		const state = form.removeGuest(EMPTY_INITIAL_STATE, "1");
		expect(state).toEqual([]);
	});
	it("when there is a user with ID 1, the user with ID 1 should be removed", () => {
		const state = form.removeGuest(STATE_WITH_ONE_GUEST, "1");
		expect(state).toEqual([]);
	});
	it("when there's two users, only the user with ID 1 should be removed", () => {
		const state = form.removeGuest(STATE_WITH_TWO_GUESTS, "1");
		expect(state).toEqual([
			{
				id: "2",
				firstName: "John",
				lastName: "Doe",
				age: 0,
			},
		]);
	});
});
