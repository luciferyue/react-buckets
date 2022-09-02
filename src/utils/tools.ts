/**
 * 去除资源文件协议头
 * @param url
 * @returns {*}
 */
export const removeProtocol = (url: string): string => {
	const regex = /^http(s)?:/;
	if (regex.test(url)) {
		return url.replace(regex, "");
	}
	return url;
};

/**
 * 参数提取
 * @param search    字符串（默认当前路径）
 * @param key       参数属性名
 */
export const extractParameter = (key: string, search?: string): string => {
	const searchStr = search || location.search;
	const pattern = new RegExp("[?&]" + key + "=([^&]+)", "g");
	const matcher = pattern.exec(searchStr);

	return matcher ? decodeURIComponent(matcher[1]) : "";
};

export function jsonToQueryString(json: { [x: string]: string | number | boolean }): string {
	return (
		"?" +
		Object.keys(json)
			.map(function (key) {
				return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
			})
			.join("&")
	);
}
