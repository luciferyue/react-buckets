import React, { ReactElement, Suspense } from "react";
import {
	BrowserRouter,
	// Routes,
	// Route,
	// Navigate,
	// Outlet,
	useRoutes
} from "react-router-dom";
import Test from "@src/modules/main/pages/test";
import Home from "@src/modules/main/pages/home";
import Request from "@src/modules/main/pages/use-request";
import PageLayout from "@core/components/page-layout";


function router(): ReactElement {
	return (
		<Suspense fallback={<></>}>
			<BrowserRouter>
				<GetRouter />
			</BrowserRouter>
		</Suspense>
	);
}

function GetRouter() {
	const element = useRoutes([
		{
			path: "/",
			element: <PageLayout key={"router-/"} component={<Home />} />
		},
		{
			path: "/test",
			element: <PageLayout key={"router-test"} component={<Test />} />
		},
		{
			path: "/hooks",
			element: <PageLayout key={"router-test"} component={<Request />} />
		},
	]);
  
	return element;
}


export default router;