export const extractError = (e: unknown): Error => {
	if (e instanceof Error) {
		return e;
	}
	return new Error("Unknown error");
};
