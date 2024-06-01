import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { orderingSlice } from "@ratatouille/modules/order/core/store/ordering.slice";
import { chooseTable } from "@ratatouille/modules/order/core/usecases/choose-table.usecase";
import {
	type AppState,
	useAppDispatch,
} from "@ratatouille/modules/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export const useTable = () => {
	function assignTable(tableId: string) {
		setAssignedTableId(tableId);
	}
	function onNext() {
		dispatch(chooseTable(assignedTableId!));
	}
	function onPrevious() {
		dispatch(orderingSlice.actions.setStep(OrderingDomainModel.Step.GUEST));
	}
	function isSubmittable() {
		return assignedTableId !== null;
	}

	const dispatch = useAppDispatch();
	const [assignedTableId, setAssignedTableId] = useState<string | null>(null);
	const availableTables: OrderingDomainModel.Table[] = useSelector(
		(state: AppState) => state.ordering.availableTables.data,
	);
	return {
		assignTable,
		onNext,
		onPrevious,
		isSubmittable: isSubmittable(),
		assignedTableId,
		availableTables,
	};
};
