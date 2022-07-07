import React, { ReactElement } from "react";
import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Todos from "@src/modules/main/pages/query";

// 创建一个 client
const queryClient = new QueryClient();

function App(): ReactElement {
	return (
		<QueryClientProvider client={queryClient}>
			<Todos />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;