// const { routerConfig } = require("@gfejs/devtools");

const routerConfig = {
	empty: "@components/page-error",
	wrapper: "@components/page-wrapper",
	routes: [
		{
			path: "test",
			module: "case",
			page: "test",
			title: "1案例1",
			trick_title: "案例",
		},
		{
			path: "test2",
			module: "case",
			page: "test2",
			flex: true,
			title: "2案例2",
			trick_title: "案例",
		},
		{
			path: "test2",
			children: [
				{
					path: "test",
					module: "case",
					page: "test",
					title: "3案例",
					trick_title: "案例"
				},
				{
					path: "test2",
					module: "case",
					page: "test2",
					flex: true,
					title: "4案例",
					trick_title: "案例"
				},
			]
		}
	]
};

module.exports = routerConfig;

// exports.routerConfig = routerConfig;
// export default routerConfig;