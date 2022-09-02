import axios from "axios";
import qs from "qs";
// import "./dev-tools";

type HeadersType = {
	Accept: string,
	platform: string,
	channel: string,
	version: string,
}

export type ApiParamsType = {
	[key: string]: any
}

export interface OptsType<T> {
	url: string,
	contentType: string,
	apiParam?: T
}

export type MethodType = "GET" | "POST";


class HttpManager {

	headers: HeadersType = {
		Accept: "application/json",
		platform: "browser",
		channel: "common",
		version: "1.0.0",
	};

	async request(method: MethodType = "GET", options: OptsType<ApiParamsType>) {
		const { url, apiParam, contentType } = options;
		let signParams = apiParam || {};

		let apiUrl = url;

		if (method === "GET") {
			const paramsString = qs.stringify(signParams);
			if (paramsString) {
				apiUrl = `${url}?${paramsString}`;
			}

			signParams = {};
		}

		return axios.request({
			method,
			headers: { ...this.headers, timestamp: Math.round(new Date().getTime()), "Content-Type": contentType || "application/json" },
			url: apiUrl,
			data: signParams,
			withCredentials: true,
		});
	}
}

const http = new HttpManager();

export default http;