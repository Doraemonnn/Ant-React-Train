import React, { Component } from "react";
import { Card, Table, Tag } from "antd";

// 接口请求
import { get_history_fault_data } from "../../../api/train";

// 引入组件
import BreadNav from "../../Common/BreadNav/BreadNav";

class HistoryFault extends Component {
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
      orderBy: "fault_time",
      order: "desc",
      pagination: 1,
      pageNo: this.state.pagination.current,
      pageSize: this.state.pagination.pageSize,
      paramap: {
        train_type: "",
        fault_time: "2019-07-23 00:00:00,2019-07-23 23:59:59",
        line_name: "",
        train_no: "",
        fault_level: "",
        fault_name: "FUZZY_%%",
        train_coach: "",
        fault_code: "FUZZY_%%",
        fault_status: "",
        fault_type_group: ""
      }
    };

    get_history_fault_data(param)
      .then(res => {
        // 数据处理
        res.bodyData.forEach(item => {
          item.tags = [item.fault_status];
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
    const navlist = [{ name: "历史故障", url: "/history-fault" }];

    // 表头
    const columns = [
      {
        title: "车型",
        dataIndex: "train_type",
        key: "train_type"
      },
      {
        title: "车号",
        dataIndex: "train_no",
        key: "train_no"
      },
      {
        title: "车厢",
        dataIndex: "train_coach",
        key: "train_coach"
      },
      {
        title: "故障码",
        dataIndex: "fault_code",
        key: "fault_code"
      },
      {
        title: "故障名称",
        dataIndex: "fault_name",
        key: "fault_name"
      },
      {
        title: "发生时间",
        dataIndex: "fault_time",
        key: "fault_time"
      },
      {
        title: "状态",
        key: "tags",
        dataIndex: "tags",
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = "";
              let text = "";
              if (tag === 1) {
                color = "green";
                text = "车载消除";
              } else {
                color = "orange";
                text = "未消除";
              }
              return (
                <Tag color={color} key={tag}>
                  {text}
                </Tag>
              );
            })}
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

export default HistoryFault;
