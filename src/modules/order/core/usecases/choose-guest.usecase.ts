import type { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { orderingActions } from "@ratatouille/modules/order/core/store/ordering.slice";
import type {
	AppDispatch,
	AppGetState,
} from "@ratatouille/modules/store/store";

export const chooseGuest =
	(form: OrderingDomainModel.Form) =>
	(dispatch: AppDispatch, _getState: AppGetState) => {
		dispatch(orderingActions.chooseGuests(form));
	};
