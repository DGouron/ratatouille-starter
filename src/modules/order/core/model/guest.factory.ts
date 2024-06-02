import type { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class GuestFactory {
	static create(data?: Partial<OrderingDomainModel.Guest>) {
		return {
			id: data?.id ?? "",
			firstName: data?.firstName ?? "",
			lastName: data?.lastName ?? "",
			age: data?.age ?? 24,
			meals: {
				entry: null,
				mainCourse: null,
				dessert: null,
				drink: null,
			},
			...data,
		};
	}
}
