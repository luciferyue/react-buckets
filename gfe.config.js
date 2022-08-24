const { gfeConfig } = require("@gfejs/devtools");

module.exports = gfeConfig(() => ({
	// 是否是ts应用
	useTs: true,
	// useAnalyzer: true,
	// 应用名，非常重要,cdn的二级path
	appName: "test",

	baseName: "",

	devServer: {
		proxy: {
			"/api": "https://m.igeidao.tech/api/",
		},
		proxyEnv: "test",
	},

	defines: {
		API_URL: {
			local: "/api/",
			domain: "https://m.igeidao.[domain]/api/"
		},
		LOGIN_URL: "https://m.igeidao.[domain]/passport/"
	},
}));