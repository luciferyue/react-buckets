import React,{useEffect} from "react";
import PageError, { PageErrorProps } from "./result";
import { mergeProps, resolveContainer } from "gatling-mobile/es/utils";
import { render, unmount as reactUnmount } from "@src/render";
// import { useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";

const _containersPageError = [] as HTMLDivElement[];

//卸载
function unmount(container: HTMLDivElement) {
	const unmountResult = reactUnmount(container);
	if (unmountResult && container.parentNode) {
		container.parentNode.removeChild(container);
	}
}

const defaultProps = {
	errorType: 404,
	autoClose: true,
	className: "page-error-fix",
	getContainer: document.body
};

interface PropType extends PageErrorProps{
	autoClose?: boolean;
	getContainer?: HTMLElement | (() => HTMLElement);
}

export function showPageError(p: PropType | number): void {
	const _props: PropType = mergeProps(
		defaultProps,
		typeof p === "string" ? { errorType: p } : p
	);

	//创建容器
	const container = document.createElement("div");

	//获取容器
	const bodyContainer = resolveContainer(_props.getContainer);
	bodyContainer.appendChild(container);

	closeErrorPage();
	_containersPageError.push(container);

	const Tem = () => {
		useEffect(() => {
			let unListen;
			if (_props.autoClose) {
				const history = createBrowserHistory();
				unListen = history.listen(() => {
					closeErrorPage();
				});
			}
			return () => {
				_props.autoClose && unListen();
			};
		}, []);

		return <PageError {..._props} />;
	};

	render(<Tem />, container);
}

export function closeErrorPage(): void {
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const toastContainer = _containersPageError.pop();
		if (!toastContainer) break;
		unmount(toastContainer);
	}
}