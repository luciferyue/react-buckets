import http, { ApiParamsType, MethodType } from "@utils/http";
import platform from "gatling-utils/lib/platform";
import PageError from "@core/components/page-error";
import { Toast } from "gatling-mobile";

interface RequestType {
	(
		apiUrl: string,
		params?: ApiParamsType,
		opts?: {
			disposeError?: boolean,
			contentType?: string
			errorLevel?: number
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


const request: RequestType = async (apiUrl, params, opts = {}) => {
	const { disposeError, contentType, errorLevel } = {
		errorLevel: 1,//1:toast处理  2：页面级抛错处理
		disposeError: true,
		contentType: "application/json",
		...opts
	};
	const [method, url] = apiUrl.split(" ");
	try {
		const response = await http.request(method as MethodType, { apiParam: params, contentType, url });
		const { status, data } = response;

		if (status === 200) {
			const { code, msg } = data;
			if (code === 0) {
				// 业务正常
				return data.data;
			} else if (code === 1205310000) {
				//特殊未登录，默认要求后端response.status 直接返回401
				throw { response: { status: 401 } };
			} else {
				throw { code, msg, response };
			}
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