import newAxios from "../utils/axios";

// 登录
export const login = params => {
  return newAxios.hmvcRequest({
    url: "/auth/login",
    method: "post",
    data: params
  });
};

// 获取车辆列表
export const get_train_list = params => {
  return newAxios.hmvcRequest({
    url: "/mdatasvc/api/trains/getAll",
    method: "post",
    data: params
  });
};

// 获取列车健康状况
export const get_train_health = params => {
  return newAxios.hmvcRequest({
    url: "/hmsvc/api/emergencyEvent/findTrainHealthy?lineNum=13",
    method: "post",
    data: params
  });
};

// 获取历史故障数据
export const get_history_fault_data = params => {
  return newAxios.sshsubwayRequest({
    url: "/sshsubway/faultRecord/pageMVBRecord",
    method: "post",
    data: params
  });
};

// 获取历史寿命数据
export const get_history_life_data = params => {
  return newAxios.hmvcRequest({
    url: "/hmsvc/api/devices/status/train/list",
    method: "post",
    data: params
  });
};

// 获取版本管理数据
export const get_version_list = params => {
  return newAxios.hmvcRequest({
    url: "/hmsvc/api/version/pageTrainDetailStatusRecord",
    method: "post",
    data: params
  });
};

// 查询单条版本记录
export const get_version_single = params => {
  return newAxios.hmvcRequest({
    url: "/hmsvc/api/version/findHistoryVersion",
    method: "post",
    data: params
  });
};
