import { login } from "../api/train";
import { browserHistory } from "react-router";

// 登录
export function handleLogin(param) {
  return function(dispatch) {
    login({
      username: param.username,
      password: param.password,
      rememberMe: param.rememberMe
    }).then(res => {
      // 触发 reducer
      dispatch({
        type: "LOGIN",
        payload: res.data
      });

      // 跳转到首页
      browserHistory.push({ pathname: "/home" });
    });
  };
}

// 清除 token
export function handleCleanToken() {
  return function(dispatch) {
    // 触发 reducer
    dispatch({
      type: "CLEAN_TOKEN",
      payload: ""
    });
  };
}
