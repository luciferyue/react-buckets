import React, { ReactElement, useMemo } from "react";
import Result from "gatling-mobile/es/components/Result";
import "./index.css";

export interface PageErrorProps {
	errorMsg?: string;
	errorType?: number;
	className?: string;
}
function PageError({ errorType = 404, errorMsg, className }: PageErrorProps): ReactElement {
	const onClickRefresh = (): void => {
		window.location.reload();
	};
	const onClickGoBack = (): void => {
		window.history.go(-1);
	};
	const config = useMemo(() => {
		switch (errorType) {
			case 1: //通用出错了
			default:
				return {
					type: "error",
					title: errorMsg || "出错了",
				};
			case 2: //网络超时
				return {
					type: "error",
					title: "服务器异常",
					message:"请稍后重新尝试",
					btnText: "重新加载",
					onBtnClick: onClickRefresh,
				};
			case 404: //页面不存在
				return {
					type: "empty",
					btnText: "返回",
					onBtnClick: onClickGoBack,
					message: "页面不存在",
				};
		}
	}, [errorType, errorMsg]);

	return (
		<Result className={className} {...config} />
	);
}

export default PageError;