import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers";
import store from "./store";


function App(): ReactElement {
	return (
		<BrowserRouter basename="/">
			<Provider store={store}>
				<Routers />
			</Provider>
		</BrowserRouter>
	);
}


export default App;