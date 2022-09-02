import React, { ReactElement, useEffect } from "react";
import { Button, Dialog, Toast, ListView } from "gatling-mobile/cjs";
import { sleep } from "gatling-mobile/es/utils/sleep";
import { useSelector, useDispatch } from "react-redux";
import { getListAsync } from "../../servers";
import { fetchListType } from "../../typings/test";
import "./index.css";
import { useHistory } from "@src/core/hooks";
import _img from "./img/1.png";

export default function Test(): ReactElement {
	const dispatch: RootDispatch = useDispatch();
	const { has_next, data_list, page_no } = useSelector((state: RootState) => state.case.testList);
	const fetchList = async (params?: fetchListType) => {
		await dispatch(getListAsync(params));
		// console.log(data);
	};

	const { push } = useHistory();

	useEffect(() => {
		fetchList();
		// return () => {
		// 	clearList();
		// };
	}, []);

	const showToast = () => {
		// Toast.show("toast aaa");
		Toast.show({
			content: "toast content",
			delay: 100,
			onClose: () => {
				console.log("关闭了");
			},
		});
	};
	const showLoading = async () => {
		// Toast.loading({
		// 	type: "loading",
		// 	content: "自定义的",
		// 	maskCls: "aaa",
		// });
		Toast.loading(true);
		await sleep(1500);
		Toast.show("这个toast只是为了关闭loading");
	};
	// 弹窗
	const showDialog = () => {
		const { close } = Dialog.show({
			title: "弹窗标题",
			content: "内容内容内容内容",
			footer: [
				{
					text: "取消", onPress: () => close()
				},
				{
					text: "确定", onPress: (res?: () => void) => {
						push("/test2");
						// res?.();
					} }
			]
		});
	};
	const renderItem = (item: { id: number }) => {
		return <div className="gm-item">{item.id}列表项</div>;
	};
	if(!data_list) return null;
	return (
		<>
			<Button onClick={showToast}>toast</Button>
			<br />
			<Button onClick={showLoading}>loading</Button>
			<br />
			<Button onClick={showDialog}>dialog</Button>
			<img src={_img} alt="" width="100%" />
			<ListView
				renderItem={renderItem}
				data={data_list}
				onRefresh={(done) => fetchList({ done })}
				hasMore={has_next}
				onLoadMore={(done) => fetchList({ done, apiParams: { page_no: page_no + 1 } })}
			/>
		</>
	);
}
