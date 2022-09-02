import { attachPropertiesToComponent } from "gatling-mobile/es/utils";
import PageError from "./result";
import { showPageError, closeErrorPage } from "./methods";

export default attachPropertiesToComponent(PageError, { showPageError, closeErrorPage });