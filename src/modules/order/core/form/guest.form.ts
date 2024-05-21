import type { IIDProvider } from "@ratatouille/modules/core/id-provider";
import type { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";

export class GuestForm {
	constructor(private idProvider: IIDProvider) {}

	addGuest(state: OrderingDomainModel.Form) {
		return {
			...state,
			guests: [
				...state.guests,
				{
					id: this.idProvider.generate(),
					firstName: "John",
					lastName: "Doe",
					age: 0,
				},
			],
		};
	}
	removeGuest(state: OrderingDomainModel.Form, id: string) {
		return { ...state, guest: state.guests.filter((guest) => guest.id !== id) };
	}
}
