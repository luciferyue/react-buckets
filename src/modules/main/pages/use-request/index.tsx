import React, { ReactElement } from "react";
import { ListView } from "gatling-mobile";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@src/store";
import * as listReducer from "../../reducers/hooks.reducer";
import { fetchListType } from "../../typings/test";
import "./index.css";
import { useMyRequest } from "./useMyRequest";
import http from "@utils/http/request";
import * as api from "@src/api";
 
export default function Test(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const list = useSelector((state: RootState) => state.hooksList.list);
	
	const { has_next, data_list, page_no } = list;
	const getList = (param?: fetchListType) => {
		const { apiParams } = param;
		const [type, url] = api.fetchList.split(" ");
		return http.request(type === "POST" ? "POST" : "GET", { url, apiParam: { page_no: 1, page_size: 20, ...apiParams } });
	};
	const { run, data } = useMyRequest(getList, {
		defaultParams: [{ apiParams: { page_no: 1, page_size: 20 } }],
		onSuccess: (res, param) => {
			const result = { ...res };
			result.page_no = param[0].apiParams?.page_no ?? 1;
			dispatch(listReducer.receive(result));
		},
		onFinally: (param) => {
			const [{ done }] = param;
			done?.();
		}
	});
	
	const renderItem = (item: { id: number }) => {
		return <div className="gm-item">{item.id}列表项</div>;
	};
	return (
		<ListView
			renderItem={renderItem}
			data={data_list}
			onRefresh={(done) => run({ done })}
			hasMore={has_next}
			onLoadMore={(done) => run({ done, apiParams: { page_no: page_no + 1 } })}
		/>
	);
}
