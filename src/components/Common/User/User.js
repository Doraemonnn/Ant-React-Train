import React, { Component } from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { Avatar } from "antd";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "未登录"
    };
  }

  // 登录
  toLogin() {
    browserHistory.push({ pathname: "/login" });

    // 更改 sessionstorage
    sessionStorage.setItem("openKey", "menu0");
    sessionStorage.setItem("activeKey", "menu0");
  }

  // 组件加载完成
  componentDidMount() {
    // 获取 redux 数据，并保存到 state 中
    const { userInfo } = this.props;
    if (userInfo.length > 0) {
      this.setState({
        userName: userInfo[0].item.token_type
      });
    }
  }

  render() {
    // 渲染页面
    return (
      <div className="fr avatar" onClick={this.toLogin.bind(this)}>
        <Avatar size="large" icon="user" />
        <span>{this.state.userName}</span>
      </div>
    );
  }
}

// 将 state 转化为 props
const mapStateToProps = state => ({
  userInfo: state.loginState
});

export default connect(mapStateToProps)(User);
