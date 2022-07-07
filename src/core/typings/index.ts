import { ReactNode } from "react";

// toast / loading
export interface ToastType {
	maskCls?: string;
	content: string;
	delay?: number;
	type?: string;
	onClose?: () => void;
}
// 弹层
export interface FooterArr {
	text?: string;
	color?: string;
	btnCallback?: (fn?: any) => void;
}

export interface DialogType {
	title?: ReactNode;
	message?: ReactNode;
	className?: string;
}

export interface PageErrorType {
	errorMsg?: string;
	errorType: number;
}
export interface InitializedType {
	errorPage: {
		errorType: number;
		errorMsg: string;
	}
	isInitialized: boolean;
}

// 分页
export interface List<T> {
	page_no?: number;
	has_next?: boolean;
	data_list: T[];
	total_count?: number;
}
export interface ListParam {
	page_no?: number;
	page_size?: number;
}
export interface ReducerFuncType<T, S> {
	(
		state: T,
		action: {
			type: S;
			payload: T;
		}
	): T;
}
export interface SagaOptsType<T> {
	type: string;
	payload: T;
}
interface AlertPropsType extends DialogType {
	leftBtn?: null | FooterArr;
	rightBtn?: null | FooterArr;
}

export interface AlertFuncType {
	(props: AlertPropsType): {
		close: () => void;
	}
}