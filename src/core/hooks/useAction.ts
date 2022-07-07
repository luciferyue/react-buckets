import { useDispatch } from "react-redux";
import isPlainObject from "lodash/isPlainObject";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useAction(type: string, payload?: any): any {
	const dispatch = useDispatch();
	return (params?: any) => {
		const newPayload = isPlainObject(payload) && isPlainObject(params) ? { ...payload, ...params } : params !== undefined ? params : payload;
		dispatch({ type, payload: newPayload });
	};
}

export default useAction;
