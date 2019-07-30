import React from "react";
import { Card } from "antd";
import { Row, Col } from "antd";
import "./Monitor.css";

const MonitorCard = props => {
  return (
    <div className="monitor-card">
      <Card>
        <Row>
          <Col span={24}>
            <Col span={12}>
              <div className="trainno text-center">
                <img src={"../../images/icon_train_offline.png"} style={props.item.level === -1 ? { display: "inline-block" } : { display: "none" }} alt="train" />
                <img src={"../../images/icon_metro_blue.png"} style={props.item.level === 0 ? { display: "inline-block" } : { display: "none" }} alt="train" />
                <img src={"../../images/icon_metro_grade2.png"} style={props.item.level === 1 ? { display: "inline-block" } : { display: "none" }} alt="train" />
                <img src={"../../images/icon_metro_orange.png"} style={props.item.level === 2 ? { display: "inline-block" } : { display: "none" }} alt="train" />
                <img src={"../../images/icon_metro_grade0.png"} style={props.item.level === 3 ? { display: "inline-block" } : { display: "none" }} alt="train" />
                <span onClick={item => props.gotoTrainDetail(props.item)}>{props.item.trainLocono} 车</span>
              </div>
            </Col>
          </Col>
          <Col span={12}>
            <p className="title text-center">里程</p>
            <p className="content text-center">{props.item.mile} km</p>
          </Col>
          <Col span={12}>
            <p className="title text-center">速度</p>
            <p className="content text-center">{props.item.speed} km/h</p>
          </Col>
          <Col span={12}>
            <p className="title text-center">网压</p>
            <p className="content text-center">{props.item.voltage} V</p>
          </Col>
          <Col span={12}>
            <p className="title text-center">能耗</p>
            <p className="content text-center">{props.item.energy} kWh</p>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default MonitorCard;
