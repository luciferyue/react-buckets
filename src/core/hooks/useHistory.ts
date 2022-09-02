import { useNavigate } from "react-router-dom";
import { useMemoizedFn } from "ahooks";

type HistoryResType = {
	push: (p: string) => void,
	replace: (p: string) => void
	goBack: (n?: number) => void
}

export default function useHistory(): HistoryResType {
	const navigate = useNavigate();

	const push = useMemoizedFn((p: string) => {
		navigate(p);
	});

	const replace = useMemoizedFn((p: string) => {
		navigate(p, { replace: true });
	});

	const goBack = useMemoizedFn((n = -1) => {
		navigate(n);
	});

	return {
		push,
		replace,
		goBack,
	};
}