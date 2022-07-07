/* eslint-disable @typescript-eslint/no-empty-interface */
import { RefObject } from "react";

export type RefType = RefObject<HTMLElement>;

declare global {
	interface Window {}
	interface location {}
}
