import { orderingSlice } from "@ratatouille/modules/order/core/store/ordering.slice";
import { extractError } from "@ratatouille/modules/shared/erros.utils";
import type { Dependencies } from "@ratatouille/modules/store/dependencies";
import type {
	AppDispatch,
	AppGetState,
} from "@ratatouille/modules/store/store";

export const fetchMeals = async (
	dispatch: AppDispatch,
	_: AppGetState,
	dependencies: Dependencies,
) => {
	try {
		dispatch(orderingSlice.actions.handleMealsLoading());
		const meals = await dependencies.mealGateway.getMeals();
		dispatch(orderingSlice.actions.storeMeals(meals));
	} catch (error: unknown) {
		const errorToHandle = extractError(error);
		dispatch(orderingSlice.actions.handleMealsError(errorToHandle));
	}
};
