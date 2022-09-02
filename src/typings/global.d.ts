/* eslint-disable @typescript-eslint/no-empty-interface */
import { ThunkAction } from "@reduxjs/toolkit";
import { RefObject } from "react";
import store from "../store";

export type RefType = RefObject<HTMLElement>;

declare global {
	interface Window {
		GATBridge: any;
		addHistoryListener: any;
	}
	interface location { }
	type RootState = ReturnType<typeof store.getState>;
	type RootDispatch = typeof store.dispatch;
	type RootThunkAction<S = void> = ThunkAction<S, RootState, unknown, any>;
	interface RootAsyncAction<T = unknown, S = void> {
		(payload?: T): RootThunkAction<Promise<S>>
	}
}
