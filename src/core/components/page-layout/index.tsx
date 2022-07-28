import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import PageError from "../page-error";
import * as common from "../../reducers/common.reducer";

interface PageLayoutProps {
	component: any;
}

function PageLayout({
	component,
}: PageLayoutProps): ReactElement {
	const { isInitialized, errorPage: { errorType, errorMsg } } = useSelector((state: RootState) => state.common);
	const dispatch: RootDispatch = useDispatch();

	useEffect(() => {
		!isInitialized && dispatch(common.fetchInit());
		return () => {
			
			errorType !== 0 && dispatch(common.updateErrorPage(0));
		};
	}, [errorType]);

	if (!isInitialized) return null;
	
	return errorType === 0 ?
		component
		: 
		<PageError errorType={errorType} errorMsg={errorMsg} />;
}

export default PageLayout;
