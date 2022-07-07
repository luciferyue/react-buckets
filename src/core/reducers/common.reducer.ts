import { RootThunkAction } from "@src/store";
import { createSlice } from "@reduxjs/toolkit";
import { InitializedType } from "@core/typings";
import isPlainObject from "lodash/isPlainObject";
import * as api from "@src/api";
import { request } from "../request";

/**
 * initialize
 */
const initialState: InitializedType = {
	errorPage: {
		errorType: 0,
		errorMsg: "",
	},
	isInitialized: false,
};

export const commonSlice = createSlice({
	name: "test_list",  //命名空间，name值会作为action type 的前缀
	initialState,
	//1.定义更新函数，2.组件中dispatch使用的actions函数
	reducers: { //内置了一个immutable.js插件，状态不可变
		updateErrorPage(state, action) {
			if (isPlainObject(action.payload)) {
				state.errorPage = { ...action.payload };
			} else {
				state.errorPage = {
					errorType: action.payload,
					errorMsg: "",
				};
			}
		},
		updateInit(state, action) {
			state.isInitialized = action.payload;
		}
	}
});

// 导出action函数,
export const { updateErrorPage, updateInit } = commonSlice.actions;


//定义异步action
export const fetchInit = (): RootThunkAction => async (dispatch) => {
	try {
		await request(api.fetchInit, {
			errorLevel: 2,
		});
	} catch (e) {
		console.log(e);
	}
	dispatch(updateInit(true));
};