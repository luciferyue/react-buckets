import React, { ReactElement } from "react";
import { Button } from "gatling-mobile";
import * as counter from "../../reducers/home.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import PageLayout from "@src/core/components/page-layout";
import "./index.css";

function MainHome():ReactElement {
	const dispatch: RootDispatch = useDispatch();
	// const { value, list } = useSelector((state: RootState) => state.counter);
	const { value, list } = useSelector((state: RootState) => counter.selectCount(state));
	const navigate = useNavigate();
	return (
		<div className="app">
			<div className="title">{value}</div>
			<div>
				<Button onClick={() => navigate("/test")} > 跳转test </Button>
				<Button onClick={() => navigate("/hooks")} > 跳转useRequest </Button>
				<Button onClick={() => dispatch(counter.add(1))} > + </Button>
				<Button onClick={() => dispatch(counter.sub(1))} > - </Button>
				<Button onClick={() => dispatch(counter.subAsync())} >async - </Button>
				<Button onClick={() => dispatch(counter.push())} > push </Button>
				<Button onClick={() => dispatch(counter.del())} > del </Button>
			</div>
        
			<ul>
				{
					list.map((item) => {
						return <li key={item}>{item}</li>;
					})
				}
			</ul>
		</div>
	);
}

export default MainHome;
