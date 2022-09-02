
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInit } from "../../servers/common";
import { useLocation } from "react-router-dom";

type IProp = {
	component: any;
	title?: string;
	flex?: boolean;
}

export default function PageWrapper({ component: WrappedComponent, title, flex = false }: IProp): ReactElement {
	const { config } = useSelector((state: RootState) => state.core);
	const dispatch: RootDispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		!config && dispatch(fetchInit());
	}, []);

	useEffect(() => {
		document.title = title;
	}, [location.pathname]);
	
	return (
		<>
			{
				flex ?
					<div className="wrapper-container">
						<WrappedComponent />
					</div>
					:
					<WrappedComponent />
			}
		</>
	);

	// return (
	// 	type === 0 ? <WrappedComponent title={title} /> : <PageError type={type} msg={msg} />
	// );
}