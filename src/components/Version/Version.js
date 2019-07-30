import React, { Component } from "react";
import { Card } from "antd";
import { Table, Tag, Button } from "antd";
import { Modal, Timeline } from "antd";

// 接口请求
import { get_version_list, get_version_single } from "../../api/train";

// 引入组件
import BreadNav from "../Common/BreadNav/BreadNav";

class Version extends Component {
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
      },
      // 弹框
      visible: false,
      modalData: []
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
      orderBy: "module_name,version_content",
      order: "asc",
      pagination: 1,
      pageNo: this.state.pagination.current,
      pageSize: this.state.pagination.pageSize,
      paramap: { train_no: "" }
    };

    get_version_list(param)
      .then(res => {
        // 数据处理
        res.bodyData.forEach(item => {
          item.tags = [item.status];
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

  // 显示弹框
  showModal = (text, record, index) => {
    // 组装参数
    const newParam = {
      line_name: text.line_name,
      module_name: text.module_name,
      train_coach: text.train_coach,
      train_no: text.train_no,
      train_type: text.train_type,
      version_content: text.version_content
    };

    // 查询单条版本记录
    get_version_single(newParam).then(res => {
      this.setState({
        modalData: res.list
      });
    });

    // 显示弹框
    this.setState({
      visible: true
    });
  };

  // 关闭弹框
  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  // 关闭弹框
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    // 面包屑导航
    const navlist = [{ name: "版本管理", url: "/version" }];

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
        title: "版本内容",
        dataIndex: "version_content",
        key: "version_content"
      },
      {
        title: "实际版本号",
        dataIndex: "version_current",
        key: "version_current"
      },
      {
        title: "更新时间",
        dataIndex: "update_time",
        key: "update_time"
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
              if (tag === "true") {
                color = "green";
                text = "正常";
              } else {
                color = "orange";
                text = "异常";
              }
              return (
                <Tag color={color} key={tag}>
                  {text}
                </Tag>
              );
            })}
          </span>
        )
      },
      {
        title: "操作",
        key: "action",
        render: (text, record, index) => (
          <Button size={"small"} onClick={this.showModal.bind(this, text, record, index)}>
            当前版本记录
          </Button>
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

        {
          // 弹框
        }
        <div>
          <Modal
            title="当前版本记录"
            style={{ top: 200 }}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                取 消
              </Button>,
              <Button key="submit" type="primary" onClick={this.handleOk}>
                确 定
              </Button>
            ]}
          >
            <Timeline>
              {this.state.modalData.map((item, index) => {
                return (
                  <Timeline.Item key={index}>
                    <div className="clearfix">
                      <span className="fl">{item.version_current}</span>
                      <span className="fr">{item.update_time}</span>
                    </div>
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Version;
