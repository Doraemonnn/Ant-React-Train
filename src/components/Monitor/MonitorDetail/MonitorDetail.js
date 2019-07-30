import React, { Component } from "react";
import { Card } from "antd";
import { Row, Col } from "antd";

// websocket
import Socket from "../../../utils/websocket";
import { getWsParam } from "../../../utils/mock";

// 引入组件
import BreadNav from "../../Common/BreadNav/BreadNav";
import EchartSpeed from "./EchartSpeed";
import EchartVoltage from "./EchartVoltage";

class MonitorDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainType: "", //车型
      trainNo: "", // 车号
      trainData: {} // 列车数据
    };
    this.resizeDiv = this.resizeDiv.bind(this);
  }

  componentDidMount() {
    // 获取路由参数
    const param = JSON.parse(this.props.params.name);

    // 保存路由参数
    this.setState({
      trainType: param.ttypeName,
      trainNo: param.trainLocono
    });

    // 获取 websocket 数据
    this.getWsData();

    // 监听窗口尺寸变化
    window.addEventListener("resize", this.resizeDiv);
  }

  componentWillUnmount() {
    // 关闭 websocket 连接
    if (this.socket) {
      this.socket.onclose();
    }

    // 移除事件监听
    window.removeEventListener("resize", this.resizeDiv);
  }

  // echart 自适应
  resizeDiv() {
    this.refs.onRefSpeed.resizeEchart();
    this.refs.onRefVoltage.resizeEchart();
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
        // 心跳机制 定时向后端发数据
        this.socket.sendMessage(getWsParam([this.state.trainNo]));
      },

      //后端返回的数据，渲染页面
      socketMessage: receive => {
        // 数据接收
        const data = JSON.parse(receive.data)["value"]["data"][this.state.trainType + "_" + this.state.trainNo.slice(2, 4)];

        // 将数据保存到 state 中
        this.setState({
          trainData: data
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

  render() {
    // 面包屑导航
    const navlist = [{ name: "实时监视", url: "/home" }, { name: "列车详情", url: "/train/" + this.state.trainNo }, { name: this.state.trainNo, url: "/train/" + this.state.trainNo }];

    return (
      <div>
        {
          // 面包屑导航
        }
        <Card>
          <BreadNav navlist={navlist} />
        </Card>

        <div className="gutter-example">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mt">
              <Card title="列车速度" bordered={false}>
                <EchartSpeed data={this.state.trainData} ref="onRefSpeed" />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mt">
              <Card title="列车网压" bordered={false}>
                <EchartVoltage data={this.state.trainData} ref="onRefVoltage" />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default MonitorDetail;
