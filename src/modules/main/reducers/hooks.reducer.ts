import { createSlice } from "@reduxjs/toolkit";
import { ListType } from "../typings/test";
// import { useDispatch, useSelector } from "react-redux";

//初始值
const initialState: ListType = {
	list:{
		page_no: 0,
		data_list: null,
		has_next: false
	}
};

export const hooksListSlice = createSlice({
	name: "hooks_list",  //命名空间，name值会作为action type 的前缀
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

// 导出action函数,
export const { receive } = hooksListSlice.actions;