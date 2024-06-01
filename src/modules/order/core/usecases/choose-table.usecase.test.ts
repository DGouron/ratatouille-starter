import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { chooseTable } from "@ratatouille/modules/order/core/usecases/choose-table.usecase";
import { createTestStore } from "@ratatouille/modules/testing/tests-environment";
import { describe, expect, it } from "vitest";

describe("Choose table", () => {
	it("should choose the table", () => {
		const store = createTestStore();

		store.dispatch(chooseTable("1"));
		expect(store.getState().ordering.form.tableId).toBe("1");
		expect(store.getState().ordering.step).toBe(OrderingDomainModel.Step.MEALS);
	});
});
