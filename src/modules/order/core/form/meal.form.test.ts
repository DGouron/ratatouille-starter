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
		it.each([
			{
				meals: [],
				guest: adult,
				expected: [],
			},
			{
				meals,
				guest: adult,
				expected: [regularEntry, adultEntry],
			},
			{
				meals,
				guest: child,
				expected: [regularEntry],
			},
			{
				meals: [adultEntry],
				guest: child,
				expected: [],
			},
		])("should get selectable entries", ({ meals, guest, expected }) => {
			const result = mealForm.getSelectableEntries(meals, guest);
			expect(result).toEqual(expected);
		});

		it.each([
			{
				meals: [],
				guest: adult,
				expected: [],
			},
			{
				meals,
				guest: adult,
				expected: [regularMainCourse, adultMainCourse],
			},
			{
				meals,
				guest: child,
				expected: [regularMainCourse],
			},
			{
				meals: [adultMainCourse],
				guest: child,
				expected: [],
			},
		])("should get selectable main courses", ({ meals, guest, expected }) => {
			const result = mealForm.getSelectableMainCourses(meals, guest);
			expect(result).toEqual(expected);
		});

		it.each([
			{
				meals: [],
				guest: adult,
				expected: [],
			},
			{
				meals,
				guest: adult,
				expected: [regularDessert, adultDessert],
			},
			{
				meals,
				guest: child,
				expected: [regularDessert],
			},
			{
				meals: [adultDessert],
				guest: child,
				expected: [],
			},
		])("should get selectable dessert", ({ meals, guest, expected }) => {
			const result = mealForm.getSelectableDessert(meals, guest);
			expect(result).toEqual(expected);
		});

		it.each([
			{
				meals: [],
				guest: adult,
				expected: [],
			},
			{
				meals,
				guest: adult,
				expected: [regularDrink, adultDrink],
			},
			{
				meals,
				guest: child,
				expected: [regularDrink],
			},
			{
				meals: [adultDrink],
				guest: child,
				expected: [],
			},
		])("should get selectable drink", ({ meals, guest, expected }) => {
			const result = mealForm.getSelectableDrink(meals, guest);
			expect(result).toEqual(expected);
		});
	});
});
