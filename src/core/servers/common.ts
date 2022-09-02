
import * as api from "@src/api";
import request from "../request";
import { configActions } from "../reducers/common.reducer";


//默认请求配置接口
export const fetchInit: RootAsyncAction<any> = () => async (dispatch) => {
	try {
		const res = await request(api.fetchInit);
		dispatch(configActions.receiveConfig(res));
	} catch (e) {
		console.log(e);
	}
};