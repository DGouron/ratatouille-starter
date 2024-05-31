import { TableFactory } from "@ratatouille/modules/order/core/model/table.factory";
import { fetchTables } from "@ratatouille/modules/order/core/usecases/fetch-tables.usecase";
import { createTestStore } from "@ratatouille/modules/testing/tests-environment";

import { describe, expect, it } from "vitest";
describe("Fetch tables", () => {
	it("should fetch tables", async () => {
		const table = TableFactory.create({
			id: "1",
		});
		const listOfTables = [table];
		const store = createTestStore({
			dependencies: {
				tableGateway: {
					getTables: () => Promise.resolve(listOfTables),
				},
			},
		});
		await store.dispatch(fetchTables);

		expect(store.getState().ordering.availableTables.data).toEqual(
			listOfTables,
		);
	});
});
