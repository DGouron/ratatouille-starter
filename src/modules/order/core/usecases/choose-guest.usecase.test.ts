import { GuestFactory } from "@ratatouille/modules/order/core/model/guest.factory";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { chooseGuest } from "@ratatouille/modules/order/core/usecases/choose-guest.usecase";
import { createTestStore } from "@ratatouille/modules/testing/tests-environment";
import { describe, expect, it } from "vitest";

describe("Choose guest", () => {
	it("should choose a guest", async () => {
		const store = createTestStore();
		const form: OrderingDomainModel.Form = {
			guests: [GuestFactory.create({ id: "1", firstName: "Alice" })],
			organizerId: null,
		};

		await store.dispatch(chooseGuest(form));
		expect(store.getState().ordering.form).toEqual(form);
		expect(store.getState().ordering.step).toEqual(
			OrderingDomainModel.Step.TABLE,
		);
	});
});
