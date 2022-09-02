import { createSlice } from "@reduxjs/toolkit";
import { ListType } from "../typings/test";

//初始值
const initialState: ListType = {
	page_no: 0,
	data_list: null,
	has_next: false
};

//slice
export const testListSlice = createSlice({
	name: "test_list",  //命名空间，name值会作为action type 的前缀
	initialState,
	//1.定义更新函数，2.组件中dispatch使用的actions函数
	reducers: { //内置了一个immutable.js插件，状态不可变
		receive(state, action) {
			const data_list =
				action.payload.page_no === 1
					? action.payload.data_list
					: state.data_list.concat(action.payload.data_list);
			return { ...action.payload, data_list: data_list ? data_list : [] };
		}
	}
});

//快捷获取store
// export const selectCount = (state: RootState) => state.testList.list;

// 导出action函数,
export const testListActions = testListSlice.actions;

//默认
export default {
	testList: testListSlice.reducer,
};