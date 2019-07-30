import React, { Component } from "react";
import * as _ from "lodash";

// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";

// 引入饼状图
import "echarts/lib/chart/pie";

// 引入提示框、图例、标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/graphic";
import "echarts/lib/component/grid";

class HealthEchart extends Component {
  // 渲染 echart
  loadEchart(legendDataTemp) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));

    // 绘制图表
    myChart.setOption({
      color: ["#52c41a", "#fabc16", "#ff8000", "#f5222d"],
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        icon: "circle",
        x: "center",
        bottom: "5%",
        itemWidth: 10,
        itemHeight: 10,
        data: ["健康列车", "预警列车", "亚健康列车", "故障列车"],
        textStyle: {
          color: "#444",
          fontSize: 15
        }
      },
      graphic: {
        // 在饼状图的中间添加文字
        type: "text",
        left: "center", // left:'center',
        top: "32%",
        z: 2,
        zlevel: 100,
        style: {
          text: "健康状况",
          textAlign: "center",
          fill: "#555",
          fontWeight: "bold",
          fontSize: "20"
        }
      },
      series: [
        {
          name: "列车健康状态",
          type: "pie",
          radius: ["40%", "55%"],
          center: ["50%", "36%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: legendDataTemp,
          itemStyle: {
            normal: {
              borderColor: "#fff",
              borderWidth: 3 // 白色间隙
            }
          }
        }
      ]
    });

    window.onresize = myChart.resize;
  }

  componentWillReceiveProps(nextProps) {
    // 数据处理
    const legendDataTemp = [
      {
        value: _.filter(nextProps.pielist, ["healthStatus", "0"])[0] ? _.filter(nextProps.pielist, ["healthStatus", "0"])[0].trainNum : 0,
        name: "健康列车"
      },
      {
        value: _.filter(nextProps.pielist, ["healthStatus", "1"])[0] ? _.filter(nextProps.pielist, ["healthStatus", "1"])[0].trainNum : 0,
        name: "亚健康列车"
      },
      {
        value: _.filter(nextProps.pielist, ["healthStatus", "2"])[0] ? _.filter(nextProps.pielist, ["healthStatus", "2"])[0].trainNum : 0,
        name: "故障列车"
      }
    ];

    // 渲染 echart
    this.loadEchart(legendDataTemp);
  }

  render() {
    return <div id="main" className="echart" />;
  }
}

export default HealthEchart;
