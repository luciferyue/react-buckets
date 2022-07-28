import platform from "gatling-utils/lib/platform";
import http from "@utils/http";
import { Toast } from "gatling-mobile";
import PageError from "@core/components/page-error";
// import { updateErrorPage } from "./reducers/common.reducer";

interface ParamsType {
	errorLevel?: number;
	disposeError?: boolean;
	apiParam?: unknown;
	dispatch?: any;
	contentType?: string;
}

interface ErrorType {
	code: number;
	msg: string;
	response?: {
		status: number;
	};
	timeout?: boolean;
}

export const request = async (apiUrl: string, params?: ParamsType): Promise<any> => {
	const [type, url] = apiUrl.split(" ");
	const opts: ParamsType = {
		errorLevel: 1, //1:toast处理  2：页面级抛错处理
		disposeError: true,
		apiParam: null, //接口参数
		...params,
	};
	try {
		const response: any = await http.request(type === "POST" ? "POST" : "GET", { ...opts, url });
		const { status, data } = response;
		if (status === 200) {
			const { code, msg } = data;
			if (code === 0) {
				// 业务正常
				return data.data;
			} else if (code === 1167500005) {
				//未登录
				throw {
					response: {
						status: 401,
					},
				};
			} else {
				throw { code, msg };
			}
		}
	} catch (err) {
		disposeError(err, opts);
		throw err;
	}
};

/**
 *
 * @param err 通用果错误处理
 * @param opts
 */
export function disposeError(err: ErrorType, opts: ParamsType): any {
	const { errorLevel, disposeError } = opts;
	//服务器异常
	if (err.response && err.response.status) {
		if (err.response.status === 401) {
			disposeLoginFailure();
		} else {
			if (errorLevel === 1) {
				showToast("出错了");
			} else {
				// dispatch(updateErrorPage(1));
				PageError.showPageError(1);
			}
		}
	}

	//网络异常
	if (err.timeout) {
		if (errorLevel === 1) {
			showToast("网络异常");
		} else {
			// dispatch(updateErrorPage(2));
			PageError.showPageError(2);
		}
	}

	//业务异常
	if (errorLevel === 1) {
		if (disposeError) {
			showToast(err.msg);
		}
	} else {
		// dispatch(updateErrorPage({ errorType: 2, errorMsg: err.msg }));
		PageError.showPageError({ errorType: 2, errorMsg: err.msg });
	}
}

function disposeLoginFailure() {
	if (platform.isNativeApp()) {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		GATBridge && GATBridge.call("nativeAuthorizationFailure", { need_refresh_page: "2" }, function () {});
	} else {
		window.location.href = `${PASSPORT_URL}?redirect_url=${encodeURIComponent(window.location.href)}`;
	}
}

// toast
export function showToast(msg: string, cb?: () => void): void {
	Toast.show({
		content: msg,
		onClose: cb,
	});
}
