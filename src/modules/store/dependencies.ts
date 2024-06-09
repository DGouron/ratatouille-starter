import type { IIDProvider } from "@ratatouille/modules/core/id-provider";
import type { IMealGateway } from "@ratatouille/modules/order/core/gateway/meal.gateway";
import type { ITableGateway } from "@ratatouille/modules/order/core/gateway/table.gateway";

export type Dependencies = {
	idProvider: IIDProvider;

	tableGateway: ITableGateway;

	mealGateway: IMealGateway;
};
