import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as common from "../../reducers/common.reducer";

interface PageLayoutProps {
	component: any;
}

function PageLayout({
	component,
}: PageLayoutProps): ReactElement {
	const { isInitialized } = useSelector((state: RootState) => state.common);
	const dispatch: RootDispatch = useDispatch();

	useEffect(() => {
		!isInitialized && dispatch(common.fetchInit());
	}, []);

	if (!isInitialized) return null;
	
	return component;
}

export default PageLayout;
