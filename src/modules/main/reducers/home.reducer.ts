import { createSlice } from "@reduxjs/toolkit";

interface counterSliceType {
	value: number;
	list: number[]
}

//初始值
const initialState: counterSliceType = {
	value: 0,
	list: []
};

export const counterSlice = createSlice({
	name: "counter",  //命名空间，name值会作为action type 的前缀
	initialState,
	//1.定义更新函数，2.组件中dispatch使用的actions函数
	reducers: { //内置了一个immutable.js插件，状态不可变
		add(state, action) {
			state.value = state.value + action.payload;
		},
		sub(state, action) {
			state.value = state.value - action.payload;
		},
		push(state) {
			state.list.push(new Date().getTime());
		},
		del(state) {
			state.list.splice(0, 1);
		}
	}
});
//快捷获取store
export const selectCount = (state: RootState): counterSliceType => state.counter;

// 导出action函数,
export const { add, sub, push, del } = counterSlice.actions;

//定义异步action
export const subAsync = (): RootThunkAction => async (dispatch) => {
	const res: any = await fetchCount();
	dispatch(sub(res.data));
};

function fetchCount(amount = 2) {
	return new Promise((resolve) =>
		setTimeout(() => resolve({ data: amount }), 1500)
	);
}