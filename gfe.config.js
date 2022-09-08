const { gfeConfig } = require("@gfejs/devtools");
const routers = require("./router.config");

module.exports = gfeConfig(() => ({
	useCore: {
		routers
	},
	// 是否是ts应用
	useTs: true,
	useAnalyzer: true,
	// 应用名，非常重要,cdn的二级path
	appName: "test",

	baseName: "/",

	babelTranspileDependencies:[],

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