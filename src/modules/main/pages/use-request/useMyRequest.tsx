import { useRequest } from "ahooks";
import { Service, Options, Plugin, Result } from "ahooks/es/useRequest/src/types";
import { disposeError } from "@src/core/request";
import { Toast } from "gatling-mobile";

interface OptionsType<TData, TParams extends any[]> extends Options<TData, TParams> {
	closeLoading?: boolean;
	errorLevel?: number;
	disposeError?: boolean;
}

export function useMyRequest<TData, TParams extends any[]>(
	service: Service<TData, TParams>,
	options?: OptionsType<TData, TParams>,
	plugins?: Plugin<TData, TParams>[],
): Result<TData, TParams> {
	const _actions = useRequest(service, {
		manual: false,
		...options,
		onBefore: (param) => {
			!options.closeLoading && Toast.loading(true);
			options.onBefore?.(param);
		},
		onError: (e, param) => {
			const error: any = e;
			disposeError(error, options);
			options.onError?.(e, param);
		},
		onFinally: (params, data, e) => {
			!options.closeLoading && Toast.loading(false);
			options.onFinally?.(params, data, e);
		},
	}, plugins);

	return _actions;
}