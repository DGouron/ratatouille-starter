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

describe("Assigning Meals", () => {
	const form: OrderingDomainModel.Form = {
		guests: [adult, child],
		organizerId: adult.id,
		tableId: "1",
	};

	describe("assigning entries", () => {
		it.each([
			{
				guestId: adult.id,
				mealId: null,
				expected: null,
			},
			{
				guestId: adult.id,
				mealId: adultEntry.id,
				expected: adultEntry.id,
			},
		])("should assign entry", ({ guestId, mealId, expected }) => {
			const result = mealForm.assignEntry(form, guestId, mealId);
			expect(result.guests[0].meals.entry).toEqual(expected);
		});

		it("should assign the adultEntry as an entry of an unexisting guest", () => {
			const result = mealForm.assignEntry(form, "non-existent", adultEntry.id);
			expect(result).toBe(form);
		});
	});

	describe("assigning main courses", () => {
		it.each([
			{
				guestId: adult.id,
				mealId: null,
				expected: null,
			},
			{
				guestId: adult.id,
				mealId: adultMainCourse.id,
				expected: adultMainCourse.id,
			},
		])("should assign a main course", ({ guestId, mealId, expected }) => {
			const result = mealForm.assignMainCourse(form, guestId, mealId);
			expect(result.guests[0].meals.mainCourse).toEqual(expected);
		});

		it("should assign the adultMainCourse as a main course of an unexisting guest", () => {
			const result = mealForm.assignMainCourse(
				form,
				"non-existent",
				adultMainCourse.id,
			);
			expect(result).toBe(form);
		});
	});

	describe("assigning dessert", () => {
		it.each([
			{
				guestId: adult.id,
				mealId: null,
				expected: null,
			},
			{
				guestId: adult.id,
				mealId: adultDessert.id,
				expected: adultDessert.id,
			},
		])("should assign a dessert", ({ guestId, mealId, expected }) => {
			const result = mealForm.assignDessert(form, guestId, mealId);
			expect(result.guests[0].meals.dessert).toEqual(expected);
		});

		it("should assign the dessert as a main course of an unexisting guest", () => {
			const result = mealForm.assignDessert(
				form,
				"non-existent",
				adultDessert.id,
			);
			expect(result).toBe(form);
		});
	});

	describe("assigning drink", () => {
		it.each([
			{
				guestId: adult.id,
				mealId: null,
				expected: null,
			},
			{
				guestId: adult.id,
				mealId: adultDessert.id,
				expected: adultDessert.id,
			},
		])("should assign a drink", ({ guestId, mealId, expected }) => {
			const result = mealForm.assignDrink(form, guestId, mealId);
			expect(result.guests[0].meals.drink).toEqual(expected);
		});

		it("should assign the dessert as a main course of an unexisting guest", () => {
			const result = mealForm.assignDrink(form, "non-existent", adultDrink.id);
			expect(result).toBe(form);
		});
	});
});

const unsubmittableForm: OrderingDomainModel.Form = {
	guests: [
		GuestFactory.create({
			meals: {
				entry: null,
				mainCourse: null,
				dessert: null,
				drink: null,
			},
		}),
	],
	organizerId: adult.id,
	tableId: "1",
};

const submittableForm: OrderingDomainModel.Form = {
	guests: [
		GuestFactory.create({
			meals: {
				entry: null,
				mainCourse: regularMainCourse.id,
				dessert: null,
				drink: null,
			},
		}),
	],
	organizerId: adult.id,
	tableId: "1",
};

describe("Is submittable", () => {
	it.each([
		{
			form: unsubmittableForm,
			expected: false,
		},
		{
			form: submittableForm,
			expected: true,
		},
	])("should check if the form is submittable", ({ form, expected }) => {
		const result = mealForm.isSubmittable(form);
		expect(result).toEqual(expected);
	});
});
