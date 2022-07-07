import React, { ReactElement } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
// import App from "./app2";
import "./entry";

const root = createRoot(document.getElementById("root"));

root.render(<App />);
