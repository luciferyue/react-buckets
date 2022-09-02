// module.exports = {
// 	empty: "@components/page-error",
// 	wrapper: "@components/page-wrapper",
// 	routes: [
// 		{
// 			path: "/test",
// 			module: "case",
// 			page: "test",
// 			title: "案例",
// 			trick_title: "案例"
// 		},
// 		{
// 			path: "/test2",
// 			module: "case",
// 			page: "test2",
// 			title: "案例",
// 			trick_title: "案例"
// 		}
// 	]
// };

const data = {
	empty: "@components/page-error",
	wrapper: "@components/page-wrapper",
	routes: [
		{
			path: "/test",
			module: "case",
			page: "test",
			title: "案例",
			trick_title: "案例"
		},
		{
			path: "/test2",
			module: "case",
			page: "test2",
			title: "案例",
			trick_title: "案例",
			children: [
				{
					path: "/test",
					module: "case",
					page: "test",
					title: "案例",
					trick_title: "案例"
				},
			]
		}
	]
};

export default data;