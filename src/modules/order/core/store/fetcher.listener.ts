import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { orderingSlice } from "@ratatouille/modules/order/core/store/ordering.slice";
import { fetchMeals } from "@ratatouille/modules/order/core/usecases/fetch-meals.usecase";
import { fetchTables } from "@ratatouille/modules/order/core/usecases/fetch-tables.usecase";
import type { ListenerMiddlewareInstance } from "@reduxjs/toolkit";

export const registerFetcherListeners = (
	listener: ListenerMiddlewareInstance,
) => {
	listener.startListening({
		actionCreator: orderingSlice.actions.setStep,
		effect: (action, api) => {
			switch (action.payload) {
				case OrderingDomainModel.Step.TABLE:
					api.dispatch(fetchTables as any);
					break;
				case OrderingDomainModel.Step.MEALS:
					api.dispatch(fetchMeals as any);
					break;
			}
		},
	});
};
