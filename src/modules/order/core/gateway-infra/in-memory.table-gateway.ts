import type { ITableGateway } from "@ratatouille/modules/order/core/gateway/table.gateway";
import type { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { TableFactory } from "@ratatouille/modules/order/core/model/table.factory";

export class InMemoryTableGateway implements ITableGateway {
	async getTables(): Promise<OrderingDomainModel.Table[]> {
		return [TableFactory.create({ id: "1", title: "VIP", capacity: 10 })];
	}
}
