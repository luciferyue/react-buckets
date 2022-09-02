import React, { ReactElement, Suspense, lazy } from "react";
import {
	Routes,
	Route,
	// Navigate,
	// Outlet,
	useRoutes
} from "react-router-dom";
// import Test from "@src/modules/case/pages/test";
// import Test2 from "@src/modules/case/pages/test2";
import PageError from "./core/components/page-error/result";
const Test = lazy(() => import("@src/modules/case/pages/test"));
const Test2 = lazy(() => import("@src/modules/case/pages/test2"));
import PageLayout from "@src/core/components/page-wrapper";


function router(): ReactElement {
	return (
		<Suspense fallback={<></>}>
			<GetRouter />
			{/* <GetRouter2 /> */}
		</Suspense>
	);
}

function GetRouter() {
	const element = useRoutes([
		{
			path: "/test",
			element: <PageLayout key={"router-test"} title="1案例页面" component={Test} />
		},
		{
			path: "/test2",
			element: <PageLayout key={"router-test2"} title="2案例页面" flex component={Test2} />
		},
		{
			path: "*",
			element: <PageError key={"router-*"} />
		},
	]);
	return element;
}

//是否考虑嵌套路由
function GetRouter2() {
	return (
		<Routes>
			{routesConfig.routes.map((route, index) => {
				const { path, ...res } = route;
				return (
					<Route
						key={`route-${index}`}
						path={path}
						element={<PageLayout {...res} />}
					/>
				);
			})}
			<Route path="*" element={<PageError key={"router-*"} />} />
		</Routes>
	);
}

const routesConfig = {
	"wrapper": require("@components/page-wrapper").default,
	"empty": require("@components/page-error").default,
	"routes": [
		{
			path: "/test",
			module: "main",
			page: "test",
			title: "1案例页面",
			component: lazy(() => import("@src/modules/case/pages/test")),
		},
		{
			path: "/test2",
			module: "main",
			page: "home",
			title: "2案例页面",
			flex: true,
			component: lazy(() => import("@src/modules/case/pages/test2")),
		}
	],
};


export default router;