import { app } from "@ratatouille/modules/app/main";
import { useDependencies } from "@ratatouille/modules/app/react/DependenciesProvider";
import { SystemIDProvider } from "@ratatouille/modules/core/system.id-provider";
import { GuestForm } from "@ratatouille/modules/order/core/form/guest.form";
import type { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { useRef, useState } from "react";

export const useGuestsSection = () => {
	function addGuest() {
		const newState = guestForm.current.addGuest(guests);
		setGuests(newState);
	}
	function removeGuest(id: string) {
		setGuests((guests) => guests.filter((guest) => guest.id !== id));
	}
	function updateGuest(id: string, key: string, value: any) {}
	function changeOrganizer() {}
	function onNext() {}
	function isSubmittable() {
		return false;
	}
	const { idProvider} = useDependencies();
	const guestForm = useRef(new GuestForm(idProvider));
	const [guests, setGuests] = useState<OrderingDomainModel.Guest[]>([]);

	return {
		addGuest,
		removeGuest,
		updateGuest,
		changeOrganizer,
		onNext,
		isSubmittable: isSubmittable(),
		guests,
	};
};
