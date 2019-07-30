import React, { Component } from "react";
import { Card } from "antd";
import { Row, Col } from "antd";
import { Spin } from "antd";
import "../Health.css";

// 接口请求
import { get_train_health } from "../../../api/train";

// 引入组件
import BreadNav from "../../Common/BreadNav/BreadNav";
import HealthEchart from "./HealthEchart";
import HealthList from "./HealthList";

class HealthRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, // 加载动画
      pieList: [], // 饼状图
      healthList: [] // 健康状况列表
    };
  }

  componentDidMount() {
    // 获取列车健康状况
    this.getHealthStatus();
  }

  componentWillUnmount() {
    // 中止 setState
    this.setState = (state, callback) => {
      return;
    };
  }

  // 获取列车健康状况
  getHealthStatus() {
    get_train_health({
      lineNum: "13"
    }).then(res => {
      // 将数据保存到 state 中
      this.setState({
        loading: false,
        pieList: res.map.pieList,
        healthList: res.map.trainList
      });
    });
  }

  render() {
    // 面包屑导航
    const navlist = [{ name: "健康档案", url: "/health" }];

    return (
      <div>
        {
          // 面包屑导航
        }
        <Card>
          <BreadNav navlist={navlist} />
        </Card>

        <div className="gutter-example mt">
          <Card>
            {
              // 加载动画
            }
            <div className="loading text-center" style={this.state.loading === true ? { display: "block" } : { display: "none" }}>
              <Spin size="large" />
            </div>

            {
              // 列表
            }
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <HealthEchart pielist={this.state.pieList} />
              </Col>
              <Col xs={24} sm={24} md={12} lg={16} xl={16}>
                <HealthList list={this.state.healthList} />
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    );
  }
}

export default HealthRecords;
