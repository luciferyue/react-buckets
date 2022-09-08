import { Toast } from "gatling-mobile";
import request from "@src/core/request";
import * as api from "@src/api";
import { fetchListType } from "../typings/test";
import { testListActions } from "../reducers/test.reducer";
import { ListType } from "../typings/test";

//定义异步action
export const getListAsync: RootAsyncAction<fetchListType, ListType> = (params = {}) => async (dispatch, getState) => {
	console.log("action===> 第一种请求");
	const { apiParams, done } = params;
	const hasLoading = !getState().case.testList.data_list;
	const apiParam = { page_no: 1, page_size: 20, ...apiParams };
	try {
		hasLoading && Toast.loading(true);
		const result = await request(api.fetchList, {
			apiParam,
			errorLevel: 2,
		});
		result.page_no = apiParam.page_no;
		dispatch(testListActions.receive(result));
		return result;
	} catch (e) {
		console.log(e);
	} finally {
		hasLoading && Toast.loading(false);
		done?.();
	}
};

//只是封装的请求
export const getList = async (params: fetchListType = {}, hasLoading = false): Promise<ListType> => {
	console.log("action===> 第二种请求");
	const { apiParams, done } = params;
	hasLoading && Toast.loading(true);
	const apiParam = { page_no: 1, page_size: 20, ...apiParams };
	try {
		const result: any = await request(api.fetchList2, {
			apiParam,
			errorLevel: 2,
		});
		result.page_no = apiParam.page_no;
		return result;
	} catch (e) {
		console.log(e);
	} finally {
		hasLoading && Toast.loading(false);
		done?.();
	}
};