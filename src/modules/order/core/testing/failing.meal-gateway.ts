import type { IMealGateway } from "@ratatouille/modules/order/core/gateway/meal.gateway";
import type { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";

export class FailingMealGateway implements IMealGateway {
	constructor(private meals: OrderingDomainModel.Meal[] = []) {}
	async getMeals(): Promise<OrderingDomainModel.Meal[]> {
		throw new Error("Failing to fetch data");
	}
}
