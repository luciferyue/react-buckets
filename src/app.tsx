import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import Routers from "./routers";
import store from "./store";


function App(): ReactElement {
	return (
		<Provider store={store}>
			<Routers />
		</Provider>
	);
}


export default App;