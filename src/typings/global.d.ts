/* eslint-disable @typescript-eslint/no-empty-interface */
import { ThunkAction } from "@reduxjs/toolkit";
import { RefObject } from "react";
import store from "../store";

export type RefType = RefObject<HTMLElement>;

declare global {
	interface Window {}
	interface location { }
	type RootState = ReturnType<typeof store.getState>;
	type RootDispatch = typeof store.dispatch;
	type RootThunkAction = ThunkAction<void, RootState, unknown, any>;
}
