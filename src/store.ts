// 创建store
import { configureStore } from "@reduxjs/toolkit";
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

export default store;
