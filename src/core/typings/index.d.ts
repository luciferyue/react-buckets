// 通用分页
export interface List<T> {
	page_no?: number;
  last_id?: number;
	has_next?: boolean;
	data_list?: T[];
	total_count?: number;
}
export interface ListParam {
  last_id?: number;
	page_no?: number;
	page_size?: number;
}