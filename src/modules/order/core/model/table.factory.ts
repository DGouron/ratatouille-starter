import type { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class TableFactory {
	static create(
		data?: Partial<OrderingDomainModel.Table>,
	): OrderingDomainModel.Table {
		return {
			id: "1",
			title: "Table 1",
			capacity: 10,
			...data,
		};
	}
}
