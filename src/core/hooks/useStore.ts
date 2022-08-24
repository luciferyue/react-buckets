import { useSelector } from "react-redux";

function useStore(str: string): any {
	return useSelector((state: RootState) => state[str]);
}

export default useStore;
