import http, { ApiParamsType } from "@utils/http";
import { AxiosRequestHeaders } from "axios";
import platform from "gatling-utils/lib/platform";
import PageError from "@core/components/page-error";
import { Toast } from "gatling-mobile";

interface RequestType {
	(
		apiUrl: string,
		opts?: {
			apiParam?: ApiParamsType;
			disposeError?: boolean;
			errorLevel?: number;
			headers?: AxiosRequestHeaders;
		}
	):  Promise<any>
}

interface DisposeErrorHandleType {
	(
		err: {
			response?: {
				status?: number
			},
			timeout?: boolean,
			message?: string,
			msg?: string
		},
		disposeError: boolean,
		errorLevel?: number
	): any
}


const request: RequestType = async (apiUrl, opts = {}) => {
	const { disposeError, errorLevel, apiParam, headers } = {
		errorLevel: 1,//1:toast处理  2：页面级抛错处理
		disposeError: true,
		...opts
	};
	try {
		const res = await http.request(apiUrl, apiParam, headers);
		const { code, data } = res;
		if (code === 0) {
			// 业务正常
			return data;
		} else if (code === 1205310000) {
			//未登录
			throw { response: { status: 401 } };
		}
	} catch (err) {
		throw await disposeErrorHandle(err, disposeError, errorLevel);
	}
};


const disposeErrorHandle: DisposeErrorHandleType = async (err, disposeError, errorLevel = 1) => {
	if (err.response && err.response.status !== 200) {
		if (err.response.status === 401) {
			if (platform.isNativeApp()) {
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				window.GATBridge && window.GATBridge.call("nativeAuthorizationFailure", { need_refresh_page: "2" }, function () { });
			} else {
				window.location.href = `${PASSPORT_URL}?redirect_url=${encodeURIComponent(window.location.href)} `;
			}

		} else {
			if (errorLevel === 1) {
				Toast.show("出错了");
			} else {
				PageError.showPageError(1);
				// dispatch(errorStatusActions.update({ type: 1 }));
			}
		}
	}

	//网络异常
	if (err.timeout || err.message === "Network Error") {
		if (errorLevel === 1) {
			Toast.show("网络异常");
		} else {
			PageError.showPageError(2);
		}
	}


	//业务异常
	if (errorLevel === 1) {
		if (disposeError) {
			Toast.show(err.msg || "出错了");
		}
	} else {
		PageError.showPageError({ type: 1, msg: err.msg });
	}

	//不需要处理的时候抛出异常
	return err;
};


export default request;