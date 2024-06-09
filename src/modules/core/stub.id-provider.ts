import type { IIDProvider } from "@ratatouille/modules/core/id-provider";

export class StubIDProvider implements IIDProvider {
	generate() {
		return "1";
	}
}
