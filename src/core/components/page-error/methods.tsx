import React, { useEffect } from "react";
import ReactDom from "react-dom";
import PageError, { PageErrorProps } from "./result";
import { mergeProps, resolveContainer } from "gatling-mobile/es/utils";
import { createBrowserHistory } from "history";

const _containersPageError = [] as HTMLDivElement[];

//卸载
function unmount(container: HTMLDivElement) {
	const unmountResult = ReactDom.unmountComponentAtNode(container);
	if (unmountResult && container.parentNode) {
		container.parentNode.removeChild(container);
	}
}

const defaultProps = {
	type: 404,
	className: "page-error-fix",
	getContainer: document.body
};

interface PropType extends PageErrorProps{
	getContainer?: HTMLElement | (() => HTMLElement);
}

export function showPageError(p: PropType | number): void {
	const _props: PropType = mergeProps(
		defaultProps,
		typeof p === "number" ? { type: p } : p
	);
	//创建容器
	const container = document.createElement("div");

	//获取容器
	const bodyContainer = resolveContainer(_props.getContainer);
	bodyContainer.appendChild(container);
	closeErrorPage();
	_containersPageError.push(container);

	const Tem = () => {
		const history = createBrowserHistory();

		useEffect(() => {
			const unListen = history.listen(() => {
				closeErrorPage();
			});

			return () => {
				unListen();
			};
		}, []);

		return <PageError  {..._props} />;
	};

	ReactDom.render(<Tem />, container);
}

export function closeErrorPage(): void {
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const pageContainer = _containersPageError.pop();
		if (!pageContainer) break;
		unmount(pageContainer);
	}
}