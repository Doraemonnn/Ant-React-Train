import React, { Component } from "react";
import { Card, Table, Progress } from "antd";

// 接口请求
import { get_history_life_data } from "../../../api/train";

// 引入组件
import BreadNav from "../../Common/BreadNav/BreadNav";

class HistoryLife extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 加载状态
      loading: true,
      // 表格数据
      tableData: [],
      // 分页
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10
      }
    };
  }

  componentDidMount() {
    // 获取表格数据
    this.getTableData();
  }

  componentWillUnmount() {
    // 中止 setState
    this.setState = (state, callback) => {
      return;
    };
  }

  // 获取表格数据
  getTableData() {
    // 参数
    const param = {
      order: "desc",
      pageNo: this.state.pagination.current,
      orderBy: "update_time",
      pageSize: this.state.pagination.pageSize,
      paramap: {
        lineNo: "",
        trainNo: [],
        partName: "",
        trainType: "",
        trainCoach: "",
        lifelevel: "2",
        fromTime: 1532317367000,
        toTime: 1563853367000
      }
    };

    get_history_life_data(param)
      .then(res => {
        // 数据处理
        res.bodyData.forEach(item => {
          let moment = require("moment");
          item.serviceTime = moment(item.serviceTime).format("YYYY-MM-DD HH:mm:ss");
          item.usage = item.serviceValue + " / " + item.qualityValue + " (次) ";
        });

        // 更新后的参数
        const newParam = { ...this.state.pagination, ...{ total: res.totalCount } };

        // 将数据保存到 state 中
        this.setState({
          loading: false,
          tableData: res.bodyData,
          pagination: newParam
        });
      })
      .catch(error => {
        this.setState({
          loading: false
        });
      });
  }

  // 分页
  handleTableChange = pagination => {
    // 更新后的参数
    const newParam = { ...this.state.pagination, ...{ current: pagination.current } };

    // 更改页码，并重新查询数据
    this.setState(
      {
        loading: true,
        pagination: newParam
      },
      () => {
        this.getTableData();
      }
    );
  };

  render() {
    // 面包屑导航
    const navlist = [{ name: "历史寿命", url: "/history-life" }];

    // 表头
    const columns = [
      {
        title: "车型",
        dataIndex: "trainType",
        key: "trainType"
      },
      {
        title: "车号",
        dataIndex: "trainNo",
        key: "trainNo"
      },
      {
        title: "车厢",
        dataIndex: "trainCoach",
        key: "trainCoach"
      },
      {
        title: "设备名称",
        dataIndex: "partName",
        key: "partName"
      },
      {
        title: "器件使用量",
        dataIndex: "usage",
        key: "usage"
      },
      {
        title: "更新时间",
        dataIndex: "serviceTime",
        key: "serviceTime"
      },
      {
        title: "寿命报警状态",
        dataIndex: "precent",
        key: "precent",
        render: precent => (
          <span>
            <Progress percent={precent} strokeWidth={6} />
          </span>
        )
      }
    ];

    return (
      <div>
        {
          // 面包屑导航
        }
        <Card>
          <BreadNav navlist={navlist} />
        </Card>

        {
          // 表格
        }
        <div className="gutter-example mt">
          <Card>
            <Table loading={this.state.loading} columns={columns} dataSource={this.state.tableData} pagination={this.state.pagination} onChange={this.handleTableChange} />
          </Card>
        </div>
      </div>
    );
  }
}

export default HistoryLife;
