import type { IIDProvider } from "@ratatouille/modules/core/id-provider";
import type { ITableGateway } from "@ratatouille/modules/order/core/gateway/table.gateway";

export type Dependencies = {
	idProvider: IIDProvider;

	tableGateway: ITableGateway;
};
