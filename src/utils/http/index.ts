import axios, { Axios, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import qs from "qs";
// import "./dev-tools";

export type ApiParamsType = {
	[key: string]: any
}

export type RequestHeaders = AxiosRequestHeaders;
export type RequestConfig = AxiosRequestConfig;
export type RequestDataType = { code: number, msg: string, data: any };

class HttpManager {
	instance: Axios = axios.create({
		timeout: 15000,
		headers: {
			accept: "application/json",
			platform: "browser",
			channel: "common",
			version: "1.0.0",
			"content-type": "application/json"
		}
	});

	//基础url
	baseUrl = "";

	//存放取消请求队列
	cancelMap = {};

	constructor() {
		this.instance.interceptors.response.use(function (response) {
			const { status, data } = response;
			if (status === 200) {
				return data;
			} else {
				return Promise.reject(response);
			}
		}, function (error) {
			// console.log("fail======", error);
			return Promise.reject(error);
		});
	}


	async request(url: string, params: ApiParamsType = {}, headers: AxiosRequestHeaders = {}): Promise<RequestDataType | any> {
		const CancelToken = axios.CancelToken;
		const { method, url: apiUrl } = this._urlProcessor(url);
		const requestConfig: AxiosRequestConfig = {
			method,
			headers: { timestamp: Math.round(new Date().getTime()), ...headers },
			withCredentials: true,
			cancelToken: new CancelToken((c) => this.cancelMap[url] = c)
		};

		if (method === "GET") {
			const paramsString = qs.stringify(params);
			requestConfig.url = paramsString ? `${apiUrl}?${paramsString}` : apiUrl;
		} else {
			requestConfig.data = params;
			requestConfig.url = apiUrl;
		}

		return this.instance.request(requestConfig).finally(() => {
			delete this.cancelMap[url];
		});
	}

	//并发请求
	async all(requests: Promise<any>[]): Promise<any[]> {
		return await axios.all(requests).then(axios.spread((...args) => args));
	}

	//判断请求是否取消
	isCancel(thrown) {
		return axios.isCancel(thrown);
	}

	//取消请求
	cancel(key) {
		this.cancelMap[key]?.();
		delete this.cancelMap[key];
	}

	//链接处理器
	_urlProcessor(url: string) {
		const [method, api] = url.split(" ");
		// const obj = {
		// 	method: method.toUpperCase() || "GET",
		// 	url: /^http(s):\/\/?/.test(api) ?
		// 		api
		// 		:
		// 		/\.json$/.test(api) ?
		// 			`../../mock_data/${api}`
		// 			:
		// 			`${this.baseUrl}${api}`
		// };
		const obj = {
			method: method.toUpperCase() || "GET",
			url: /^http(s):\/\/?/.test(api) ?
				api
				:
				`${this.baseUrl}${api}`
		};
		return obj;
	}
}

const http = new HttpManager();

export default http;
