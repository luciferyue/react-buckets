import http from "@src/utils/http";
//设置请求前缀
// http.baseUrl = API_URL;
http.baseUrl = "../../mock_data/";

// export const fetchInit = `GET ${API_URL}init.json`;
export const fetchInit = "GET demo.json";

/*======home=======*/
// export const fetchList = `GET ${API_URL}v1/h5/tenants/init`;
export const fetchList = "GET case/list.json";
export const fetchList2 = "GET case/list2.json";
