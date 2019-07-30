import axios from "axios";
import { message } from "antd";
import config from "../config/index";

class HttpRequest {
  constructor() {
    // 接口前缀
    this.hmvcurl = config.hmvcUrl;
    this.sshsubwayUrl = config.sshsubwayUrl;
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        config.headers.Authorization = "Test";
        return config;
      },
      error => {
        Promise.reject(error);
      }
    );

    // 响应拦截
    instance.interceptors.response.use(
      response => {
        const res = response.data;
        if (response.status !== 200 && res.status !== 200) {
          message.error(response.data.message);
        } else {
          return response.data;
        }
      },
      error => {
        message.warning("服务请求超时");
        return Promise.reject(error);
      }
    );
  }

  // hmvc ajax 请求
  hmvcRequest(options) {
    const instance = axios.create();
    options = Object.assign({ baseURL: this.hmvcurl }, options);
    this.interceptors(instance, options.url);
    return instance(options);
  }

  // sshsubway ajax 请求
  sshsubwayRequest(options) {
    const instance = axios.create();
    options = Object.assign({ baseURL: this.sshsubwayUrl }, options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}

const newAxios = new HttpRequest();

export default newAxios;
