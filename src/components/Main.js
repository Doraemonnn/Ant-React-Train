import React from "react";
import { Layout, Icon } from "antd";

// 组件
import User from "./Common/User/User";
import SubMenuList from "./Common/SubMenuList/SubMenuList";

const { Header, Sider, Content } = Layout;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  // 菜单展开收起
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout id="components-layout-demo-custom-trigger">
        <Sider trigger={null} width="250" collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <SubMenuList />
        </Sider>

        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon className="trigger" type={this.state.collapsed ? "menu-unfold" : "menu-fold"} onClick={this.toggle} />
            <User />
          </Header>
          <Content style={{ margin: "24px 16px", padding: 24, background: "#fff", minHeight: 280 }}>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default Main;
