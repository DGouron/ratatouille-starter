import { GuestForm } from "@ratatouille/modules/order/core/form/guest.form";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { describe, expect, it } from "vitest";

describe("Add a guest", () => {
	it("should add a guest", () => {
		// Given
		// When
		// Then
		const form = new GuestForm();
		const initialState: OrderingDomainModel.Guest[] = [];
		const state = form.addGuest(initialState);
		expect(state).toEqual([
			{
				id: "1",
				firstName: "John",
				lastName: "Doe",
				age: 0,
			},
		]);
	});
});
