const loginCookie = "38FFDB5CAA3D84C9F849992D77D59E43";

if (APP_ENV === "local") {
	// 根据实际环境,使用gid gid_p gcid
	setCookie("gid_p", loginCookie, 365);
	setCookie("gid", loginCookie, 365);
}

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	const expires = `expires=${d.toUTCString()}`;
	document.cookie = `${cname}=${cvalue};${expires};path=/`;
}
