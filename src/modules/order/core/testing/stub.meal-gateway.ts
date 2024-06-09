import type { IMealGateway } from "@ratatouille/modules/order/core/gateway/meal.gateway";
import type { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";

export class StubMealGateway implements IMealGateway {
	constructor(private meals: OrderingDomainModel.Meal[] = []) {}
	async getMeals(): Promise<OrderingDomainModel.Meal[]> {
		return this.meals;
	}
}
