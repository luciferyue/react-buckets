import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
	name: "config",
	initialState: null,
	reducers: {
		receiveConfig: (_, action) => action.payload
	},
});

export const configActions = configSlice.actions;

export default {
	config: configSlice.reducer,
};