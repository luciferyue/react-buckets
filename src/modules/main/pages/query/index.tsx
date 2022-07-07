import React, { ReactElement } from "react";
import { ListView } from "gatling-mobile";
import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from "react-query";
import { fetchListType } from "../../typings/test";
import http from "@utils/http/request";
import * as api from "@src/api";


const getList = (res:any) => {
	console.log(res);
	const [type, url] = api.fetchList.split(" ");
	return http.request(type === "POST" ? "POST" : "GET", { url, apiParam: { page_no: 1, page_size: 20 } });
};

function Todos():ReactElement {
	// 访问 client
	const queryClient = useQueryClient();

	// 查询
	const query = useQuery("todos", getList);

	// 修改
	const mutation = useMutation(getList, {
		onMutate: (variables) => {
			// 修改即将发生！
	
			// （可选）返回包含回滚时使用的数据的上下文
			return { id: 1 };
		},
		onError: (error, variables, context) => {
			// 错误触发！
			console.log(`rolling back optimistic update with id ${context.id}`);
		},
		onSuccess: (data, variables, context) => {
			// Boom baby!
			// 错误处理和刷新
			console.log("success");
			// queryClient.invalidateQueries("todos");
		},
		onSettled: (data, error, variables, context) => {
			// 错误或成功……这并不重要
		},
	});
  
	const run = (res: any) => { console.log(123); };
  
	const page_no = 0;
  
	if(!query.data) return null;
	
	const renderItem = (item: { id: number }) => {
		return <div className="gm-item">{item.id}列表项</div>;
	};
  
	return (
		<ListView
			renderItem={renderItem}
			data={query.data.data_list}
			onRefresh={(done) => run(done)}
			hasMore={query.data.has_next}
			onLoadMore={(done) => run({ done, apiParams: { page_no: page_no + 1 } })}
		/>
	);
}

export default Todos;
