import { createSlice } from "@reduxjs/toolkit";
import { request } from "@src/core/request";
import * as api from "@src/api";
import { Toast } from "gatling-mobile";
import { fetchListType, ListType } from "../typings/test";
// import { useDispatch, useSelector } from "react-redux";

//初始值
const initialState: ListType = {
	list:{
		page_no: 0,
		data_list: null,
		has_next: false
	}
};

export const testListSlice = createSlice({
	name: "test_list",  //命名空间，name值会作为action type 的前缀
	initialState,
	//1.定义更新函数，2.组件中dispatch使用的actions函数
	reducers: { //内置了一个immutable.js插件，状态不可变
		receive(state, action) {
			const data_list =
				action.payload.page_no === 1
					? action.payload.data_list
					: state.list.data_list.concat(action.payload.data_list);
			state.list = { ...action.payload, data_list: data_list ? data_list : [], };
		}
	}
});
//快捷获取store
// export const selectCount = (state: RootState) => state.testList.list;

// 导出action函数,
export const { receive } = testListSlice.actions;

//定义异步action
export const getListAsync = (params: fetchListType = {}): RootThunkAction => async (dispatch, getState) => {
	const { apiParams, done } = params;
	const hasLoading = !getState().testList.list.data_list;
	const apiParam = { page_no: 1, page_size: 20, ...apiParams };
	try {
		hasLoading && Toast.loading(true);
		const result = await request(api.fetchList, {
			apiParam,
			errorLevel: hasLoading ? 2 : 1,
		});
		result.page_no = apiParam.page_no;
		dispatch(receive(result));
	} catch (e) {
		console.log(e);
	} finally {
		hasLoading && Toast.loading(false);
		done?.();
	}
};

//只是封装的请求
export const getList = async (params: fetchListType = {}, hasLoading = false): Promise<any> => {
	const { apiParams, done } = params;
	hasLoading && Toast.loading(true);
	const apiParam = { page_no: 1, page_size: 20, ...apiParams };
	try {
		const result = await request(api.fetchList, {
			apiParam,
			errorLevel: hasLoading ? 2 : 1,
		});
		result.page_no = apiParam.page_no;
	} catch (e) {
		console.log(e);
	} finally {
		hasLoading && Toast.loading(false);
		done?.();
	}
};