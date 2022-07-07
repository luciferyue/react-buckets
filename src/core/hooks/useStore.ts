import { useSelector } from "react-redux";
import { RootState } from "@globalType";

function useStore(str: string): any {
	return useSelector((state: RootState) => state[str]);
}

export default useStore;
