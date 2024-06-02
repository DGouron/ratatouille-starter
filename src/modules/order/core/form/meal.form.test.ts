import { MealForm } from "@ratatouille/modules/order/core/form/meal.form";
import { GuestFactory } from "@ratatouille/modules/order/core/model/guest.factory";
import { MealFactory } from "@ratatouille/modules/order/core/model/meal.factory";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { describe, expect, it } from "vitest";

const regularEntry = MealFactory.create({
	id: "entry-1",
	type: OrderingDomainModel.MealType.ENTRY,
});

const adultEntry = MealFactory.create({
	id: "entry-2",
	type: OrderingDomainModel.MealType.ENTRY,
	requiredAge: 18,
});

const regularMainCourse = MealFactory.create({
	id: "main-course-1",
	type: OrderingDomainModel.MealType.MAIN_COURSE,
});

const adultMainCourse = MealFactory.create({
	id: "main-course-2",
	type: OrderingDomainModel.MealType.MAIN_COURSE,
	requiredAge: 18,
});

const regularDessert = MealFactory.create({
	id: "dessert-1",
	type: OrderingDomainModel.MealType.DESSERT,
});

const adultDessert = MealFactory.create({
	id: "dessert-2",
	type: OrderingDomainModel.MealType.DESSERT,
	requiredAge: 18,
});

const regularDrink = MealFactory.create({
	id: "drink-1",
	type: OrderingDomainModel.MealType.DRINK,
});

const adultDrink = MealFactory.create({
	id: "drink-2",
	type: OrderingDomainModel.MealType.DRINK,
	requiredAge: 18,
});

const meals: OrderingDomainModel.Meal[] = [
	regularEntry,
	regularMainCourse,
	regularDessert,
	regularDrink,
	adultEntry,
	adultMainCourse,
	adultDessert,
	adultDrink,
];

const mealForm = new MealForm();
const adult = GuestFactory.create({ id: "1", age: 30 });
const child = GuestFactory.create({ id: "2", age: 3 });
describe("Selecting meals", () => {
	describe("selecting entries", () => {
		it("when there are no meals available, it should return an empty array", () => {
			const result = mealForm.getSelectableEntries([], adult);
			expect(result).toEqual([]);
		});
		it("when meals are available, it should return adult meals", () => {
			const result = mealForm.getSelectableEntries(meals, adult);
			expect(result).toEqual([regularEntry, adultEntry]);
		});
		it("when meals are available, it should return children-only meals", () => {
			const result = mealForm.getSelectableEntries(meals, child);
			expect(result).toEqual([regularEntry]);
		});
	});
});
