import React, { Component } from "react";
import "../Monitor.css";

// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";

// 引入折线图
import "echarts/lib/chart/line";

// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/grid";

class EchartVoltage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      echart: null, // echart
      xlabelData: [], // 时间
      ylabelData: [] // 网压
    };
  }

  // 渲染 echart
  loadEchart() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("voltage-main"));
    this.setState({
      echart: myChart
    });

    // 绘制图表
    myChart.setOption({
      color: "#eee",
      tooltip: {
        trigger: "axis"
      },
      grid: {
        left: "3%",
        right: "6%",
        top: "5%",
        bottom: "5%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this.state.xlabelData
      },
      yAxis: [
        {
          type: "value",
          splitLine: {
            // 网格线
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#E9E9E9"
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 16, // y轴字体大小
              color: "#000" // y轴字体颜色
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        }
      ],
      series: [
        {
          name: "当前网压",
          type: "line",
          showSymbol: false,
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                color: "#597ef7" // 折线颜色
              }
            }
          },
          data: this.state.ylabelData
        }
      ]
    });

    // echart 自适应
    myChart.resize();
  }

  // echart 自适应
  resizeEchart() {
    this.state.echart.resize();
  }

  componentWillReceiveProps() {
    // 组装 x 轴、y 轴数据
    let moment = require("moment");
    if (this.props.data) {
      this.state.xlabelData.push(moment(this.props.data["timestamp"]).format("HH:mm:ss"));
      this.state.ylabelData.push(this.props.data["sys1_s31"]);
    }

    // 选取前6条数据
    if (this.state.xlabelData.length > 6) {
      this.state.xlabelData.splice(0, 1);
    }
    if (this.state.ylabelData.length > 6) {
      this.state.ylabelData.splice(0, 1);
    }

    // 将数据保存到 state 中
    this.setState({
      xlabelData: this.state.xlabelData,
      ylabelData: this.state.ylabelData
    });

    // 渲染 echart
    this.loadEchart();
  }

  componentDidMount() {
    // 渲染 echart
    this.loadEchart();
  }

  render() {
    return <div id="voltage-main" className="echart" />;
  }
}

export default EchartVoltage;
