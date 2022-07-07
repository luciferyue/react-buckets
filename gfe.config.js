const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
	// 是否用core打包生成
	useCore: false,

	// 是否是H5应用，目前只应用postcss配置是否起效
	isH5: true,

	// 是否是ts应用
	useTs: true,

	// 应用名，非常重要,cdn的二级path
	appName: "gfe-h5-js-next",

	baseName: "/",

	// 本地devServer端口，默认8080
	port: 3000,

	// 打包编译时处理哪些环境，代替build:dev|test|product的含义，不能是空数组
	// 默认["dev", "test", "product"] = build:all
	buildEnvs: ["product"],

	// 指定本地代理环境
	proxyEnv: "test",

	// webpack的define功能，分为三种类型
	defines: {

		// 域名类型，根据[domain]替换为环境值
		domains: {
			API_URL: "/api/",
		},

		// 纯常量不做任务处理，直接注入
		constants: {
			CID: "测试全局变量",
		},
	},

	// devServer配置
	devServerProxy: {
		"/api": "https://m.igeidao.[domain]/api/",
		"/passport_api": "https://passport.guanaitong.[domain]/"
	},

	//额外的打包loader
	extraUrlLoaderInclude: [
		path.join(__dirname, "node_modules/gatling-mobile"),
	],

	// 额外的cssLoaderInclude值，数组会合并默认值
	extraCssLoaderInclude: [
		path.join(__dirname, "node_modules/gatling-mobile"),
	],

	// 别名，默认值有2套（ts-h5和ts-mgr)，不够用就这里覆盖
	// 注意__dirname=应用当前本地根目录
	extraAlias: {},

	//loader
	extraLoaders: [],


	extraPlugins: (env) => {
		if (env === "local") return [];
		return [
			new BundleAnalyzerPlugin({
				analyzerMode: "static"
			})
		];
	},

	// webpack配置，此处优先级最高，会覆盖之前的一级配置
	// 够用的话，这里就可以全部留空
	webpack: {
		local: {},
		dev: {},
		test: {},
		product: {}
	}
};
