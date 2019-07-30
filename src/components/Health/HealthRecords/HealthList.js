import React, { Component } from "react";
import { Row, Col } from "antd";

class HealthList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickItem: "" // 当前点击的车号
    };
  }

  // 点击事件
  handleClick(item) {
    // 将数据保存到 state 中
    this.setState({
      clickItem: item.trainNo
    });
  }

  // 设置不同的颜色
  circleClass(item) {
    let styleObj;
    if (this.state.clickItem === item.trainNo && item.healthStatus === "0") {
      styleObj = "typeA";
    } else if (this.state.clickItem === item.trainNo && item.healthStatus === "1") {
      styleObj = "typeB";
    } else if (this.state.clickItem === item.trainNo && item.healthStatus === "2") {
      styleObj = "typeC";
    } else if (this.state.clickItem === item.trainNo && item.healthStatus === "3") {
      styleObj = "typeD";
    }
    return styleObj;
  }

  render() {
    return (
      <div className="health-list">
        <Row gutter={16}>
          {this.props.list.map((item, index) => {
            return (
              <Col xs={8} sm={6} md={6} lg={4} xl={4} key={index}>
                <div className="wrap" onClick={this.handleClick.bind(this, item)}>
                  <div className={["circle", this.circleClass(item)].join(" ")}>
                    <img src={"../../../images/icon_trainHealth_green.png"} style={item.healthStatus === "0" ? { display: "inline-block" } : { display: "none" }} alt="train" />
                    <img src={"../../../images/icon_metro_grade2.png"} style={item.healthStatus === "1" ? { display: "inline-block" } : { display: "none" }} alt="train" />
                    <img src={"../../../images/icon_trainHealth_orange.png"} style={item.healthStatus === "2" ? { display: "inline-block" } : { display: "none" }} alt="train" />
                    <img src={"../../../images/icon_trainHealth_red.png"} style={item.healthStatus === "3" ? { display: "inline-block" } : { display: "none" }} alt="train" />
                  </div>
                </div>
                <p className="text-center">{item.trainNo}</p>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default HealthList;
