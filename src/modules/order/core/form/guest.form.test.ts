import { IIDProvider } from "@ratatouille/modules/core/id-provider";
import { GuestForm } from "@ratatouille/modules/order/core/form/guest.form";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { describe, expect, it } from "vitest";


class StubIDProvider implements IIDProvider {
	generate() {
		return "1";
	}
}

const idProvider = new StubIDProvider();

describe("Add a guest", () => {
	it("should add a guest", () => {
		// Given
		// When
		// Then
		const form = new GuestForm(idProvider);
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

	it("should add a guest when there's already one", () => {
		const form = new GuestForm(idProvider);
		const initialState: OrderingDomainModel.Guest[] = [{
			id: "1",
			firstName: "John",
			lastName: "Doe",
			age: 0,
		}];
		const state = form.addGuest(initialState);
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
		const form = new GuestForm(idProvider);
		const initialState: OrderingDomainModel.Guest[] = [{
			id: "1",
			firstName: "John",
			lastName: "Doe",
			age: 0,
		}, {
			id: "1",
			firstName: "John",
			lastName: "Doe",
			age: 0,
		}];
		const state = form.addGuest(initialState);
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
			{
				id: "1",
				firstName: "John",
				lastName: "Doe",
				age: 0,
			},
		]);
	});
});
