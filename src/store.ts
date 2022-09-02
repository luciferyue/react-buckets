import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import commonReducer from "@src/core/reducers/common.reducer";
import testListReducer from "@src/modules/case/reducers/test.reducer";

// 创建store
const store = configureStore({
	reducer: {
		core: combineReducers({
			...commonReducer
		}),
		case: combineReducers({
			...testListReducer
		}),
	}
});

export default store;
