import { orderingSlice } from "@ratatouille/modules/order/core/store/ordering.slice";
import type {
	AppDispatch,
	AppGetState,
} from "@ratatouille/modules/store/store";

export const chooseTable =
	(tableId: string) => (dispatch: AppDispatch, _getState: AppGetState) => {
		dispatch(orderingSlice.actions.chooseTable(tableId));
	};
