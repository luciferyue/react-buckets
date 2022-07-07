// 创建store
import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { commonSlice } from "@src/core/reducers/common.reducer";
import { counterSlice } from "@src/modules/main/reducers/home.reducer";
import { testListSlice } from "@src/modules/main/reducers/test.reducer";
import { hooksListSlice } from "@src/modules/main/reducers/hooks.reducer";

const store = configureStore({
	reducer: {
		common: commonSlice.reducer,
		counter: counterSlice.reducer,
		testList: testListSlice.reducer,
		hooksList: hooksListSlice.reducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootThunkAction = ThunkAction<void, RootState, unknown, any>

export default store;
