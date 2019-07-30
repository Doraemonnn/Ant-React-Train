import { combineReducers } from "redux";
import loginState from "./login-state";

const trainApp = combineReducers({
  loginState: loginState
});

export default trainApp;
