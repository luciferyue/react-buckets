import axios from "axios";
import qs from "qs";
import { sign } from "./sign";
import "./dev-tools";

type Channel = "common" | "wechat";
type PlatformName = "browser" | "wechat" | "giveapp" | "wxwork" | "oldapp";

type HeaderParams = {
	channel: Channel;
	platform: PlatformName;
	version: string;
	Accept: string;
	"Access-Control-Allow-Origin": string;
	"Content-Type"?: string;
};

type Method = "GET" | "POST";

type HttpOptions = {
	url: string;
	params?: any;
	contentType?: string;
};

class HttpManager {
	private headers: HeaderParams;
	appSecret;

	constructor() {
		this.headers = {
			Accept: "application/json",
			platform: "browser",
			channel: "common",
			version: "1.0.0",
			"Access-Control-Allow-Origin": window.location.href,
		};
	}

	init(options) {
		const { appSecret } = options;
		this.appSecret = appSecret.key;
	}

	async request(method: Method = "GET", options) {
		const { url, apiParam, contentType } = options;
		const signParams = apiParam || {};
		let signedObj = { ...signParams, sign: sign(signParams, this.appSecret) };
		let apiUrl = url;

		if (method === "GET") {
			const paramsString = qs.stringify(signedObj);
			apiUrl = `${url}${paramsString ? "?" + paramsString : ""}`;

			signedObj = {};
		}
		const params = contentType ? signedObj : qs.stringify(signedObj);
		
		return axios.request({
			method,
			headers: { ...this.headers, timestamp: Math.round(new Date().getTime()), "Content-Type": contentType || "application/x-www-form-urlencoded" },
			url: apiUrl,
			data: params,
			withCredentials: true,
		});
	}

	get(options: HttpOptions) {
		return this.request("GET", options);
	}

	post(options: HttpOptions) {
		return this.request("POST", options);
	}
}

export default new HttpManager();
