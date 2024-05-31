import { orderingSlice } from "@ratatouille/modules/order/core/store/ordering.slice";
import { extractError } from "@ratatouille/modules/shared/erros.utils";
import type { Dependencies } from "@ratatouille/modules/store/dependencies";
import type {
	AppDispatch,
	AppGetState,
} from "@ratatouille/modules/store/store";

export const fetchTables = async (
	dispatch: AppDispatch,
	_: AppGetState,
	dependencies: Dependencies,
) => {
	dispatch(orderingSlice.actions.handleTablesLoading());
	try {
		const tables = await dependencies.tableGateway.getTables();
		dispatch(orderingSlice.actions.storeTables(tables));
	} catch (e: unknown) {
		dispatch(orderingSlice.actions.handleTablesError(extractError(e)));
	}
};
