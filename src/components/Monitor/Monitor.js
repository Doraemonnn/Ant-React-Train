import React, { Component } from "react";
import { Card } from "antd";
import { Input } from "antd";
import { Row, Col } from "antd";
import * as _ from "lodash";
import "./Monitor.css";

// websocket
import Socket from "../../utils/websocket";
import { getWsParam } from "../../utils/mock";
import { handleWebsocketData } from "../../utils/data-disposal";
import { filterTrain } from "../../utils/filter";

// 接口请求
import { get_train_list } from "../../api/train";

// 引入组件
import BreadNav from "../Common/BreadNav/BreadNav";
import MonitorCard from "./MonitorCard";

class Monitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: 0, // 列车总数
      onlineCount: 0, // 在线列车数
      trainList: [] // 列车
    };
  }

  componentDidMount() {
    // 获取所有车号
    this.getTrainList();
  }

  componentWillUnmount() {
    // 关闭 websocket 连接
    if (this.socket) {
      this.socket.onclose();
    }

    // 中止 setState
    this.setState = (state, callback) => {
      return;
    };
  }

  // 获取所有车号
  getTrainList() {
    get_train_list({
      basicLineId: 13
    }).then(res => {
      // 数据处理
      res.list.forEach(item => {
        item.mile = 0;
        item.speed = 0;
        item.voltage = 0;
        item.energy = 0;
        item.level = 0;
        item.online = false;
        item.show = true;
      });

      // 将数据保存到 state 中
      this.setState({
        totalCount: res.list.length,
        trainList: res.list
      });

      // 获取 websocket 数据
      this.getWsData();
    });
  }

  // 获取 websocket 数据
  getWsData() {
    // 请求 websocket 接口
    this.socket = new Socket({
      socketUrl: "ws://139.9.53.159:60609/websocket/web",
      timeout: 5000,

      // 连接成功
      socketOpen: () => {
        console.log("连接建立成功");

        // 组装车号
        const trainnoList = [];
        this.state.trainList.forEach(item => {
          trainnoList.push(item.trainLocono);
        });

        // 心跳机制 定时向后端发数据
        this.socket.sendMessage(getWsParam(trainnoList));
      },

      //后端返回的数据，渲染页面
      socketMessage: receive => {
        // 数据处理
        const data = handleWebsocketData(JSON.parse(receive.data), this.state.trainList);

        // 在线列车数
        const onlineTrainCount = _.filter(data, ["online", true]).length;

        // 将数据保存到 state 中
        this.setState({
          onlineCount: onlineTrainCount,
          trainList: data
        });
      },

      // 关闭 websocket
      socketClose: msg => {
        console.log(msg);
      },

      // 连接失败
      socketError: () => {
        console.log(this.state.taskStage + "连接建立失败");
      }
    });

    // 重试创建socket连接;
    try {
      this.socket.connection();
    } catch (e) {
      // 捕获异常，防止js error
    }
  }

  // 实时搜索车号
  onChange(e) {
    const searchTrainList = filterTrain(e.target.value, this.state.trainList);
    this.setState({
      trainList: searchTrainList
    });
  }

  // 点击按钮搜索车号
  changeSearch(value) {
    const searchTrainList = filterTrain(value, this.state.trainList);
    this.setState({
      trainList: searchTrainList
    });
  }

  // 跳转到列车详情页
  toTrainDetailPage(train) {
    const param = {
      ttypeName: train.ttypeName,
      trainLocono: train.trainLocono
    };
    this.props.history.push({ pathname: "/train/" + JSON.stringify(param) });
  }

  render() {
    // react 组件
    const Search = Input.Search;

    // 面包屑导航
    const navlist = [{ name: "实时监视", url: "/home" }];

    return (
      <div className="monitor">
        <Card>
          {
            // 面包屑导航
          }
          <BreadNav navlist={navlist} />

          {
            // 搜索框
          }
          <div className="mt search">
            <Row>
              <Col xs={16} sm={12} md={12} lg={6} xl={6}>
                <Search placeholder="搜索车号" onChange={this.onChange.bind(this)} onSearch={value => this.changeSearch(value)} />
              </Col>
              <Col xs={0} sm={0} md={0} lg={6} xl={12} />
              <Col xs={24} sm={24} md={12} lg={12} xl={6} className="media-text">
                <span>车辆总数：{this.state.totalCount}</span>
                <span>在线列车数：{this.state.onlineCount}</span>
              </Col>
            </Row>
          </div>
        </Card>

        {
          // 列车卡片
        }
        <div className="gutter-example">
          <Row gutter={16}>
            {this.state.trainList.map((item, index) => {
              return (
                <Col xs={24} sm={24} md={12} lg={8} xl={6} key={index} className="mt" style={item.show === true ? { display: "block" } : { display: "none" }}>
                  <MonitorCard item={item} gotoTrainDetail={train => this.toTrainDetailPage(train)} />
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}

export default Monitor;
