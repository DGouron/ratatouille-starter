import { IIDProvider } from "@ratatouille/modules/core/id-provider";
import { nanoid } from "@reduxjs/toolkit";

export class SystemIDProvider implements IIDProvider {
	generate() {
		return nanoid();
	}
}