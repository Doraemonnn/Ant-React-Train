import React from "react";
import { Router, Route, Redirect, browserHistory } from "react-router";
import { requireAuthentication } from "./authentication.js";

// 登录和主模块
import Login from "../components/Login/Login";
import Main from "../components/Main";

// 实时监视
import Monitor from "../components/Monitor/Monitor";
import MonitorDetail from "../components/Monitor/MonitorDetail/MonitorDetail";

// 健康管理
import HealthRecords from "../components/Health/HealthRecords/HealthRecords";
import HistoryFault from "../components/Health/HistoryData/HistoryFault";
import HistoryLife from "../components/Health/HistoryData/HistoryLife";

// 版本管理
import Version from "../components/Version/Version";

// 权限校验
import Authorized from "../components/Authorized/Authorized";

// 路由配置
const RouteConfig = (
  <Router history={browserHistory}>
    <Route exact path="/main" component={Main}>
      <Route exact path="/home" component={Monitor} />
      <Route exact path="/train/:name" component={MonitorDetail} />
      <Route exact path="/health-records" component={HealthRecords} />
      <Route exact path="/history-fault" component={HistoryFault} />
      <Route exact path="/history-life" component={HistoryLife} />
      <Route exact path="/version" component={Version} />
      <Route exact path="/authorized" component={requireAuthentication(Authorized)} />
    </Route>
    <Route exact path="/login" component={Login} />
    <Redirect from="/" to={"/home"} />
  </Router>
);

export default RouteConfig;
