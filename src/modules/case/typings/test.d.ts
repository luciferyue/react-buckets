import { List, ListParam } from "@core/typings";

export interface ListItemType {
	id: number;
}
export type ListType = List<ListItemType>;

export interface fetchListType {
	apiParams?: ListParam;
	done?: () => void;
}
