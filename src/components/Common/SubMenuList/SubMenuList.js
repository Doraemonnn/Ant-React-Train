import React, { Component } from "react";
import { Menu, Icon } from "antd";

// 路由
import { Link } from "react-router";
import MenuData from "../../../routes/menu-data";

const SubMenu = Menu.SubMenu;

class SubMenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKey: ["menu0"],
      activeKey: ["menu0"]
    };
  }

  componentWillMount() {
    // 选中的菜单
    if (sessionStorage.getItem("activeKey")) {
      this.setState({
        activeKey: [sessionStorage.getItem("activeKey")]
      });
    }

    /// 展开的菜单
    if (sessionStorage.getItem("openKey")) {
      if (sessionStorage.getItem("openKey").includes(",")) {
        this.setState({
          openKeys: sessionStorage.getItem("openKeys").split(",")
        });
      } else {
        this.setState({
          openKeys: [sessionStorage.getItem("openKeys")]
        });
      }
    }
  }

  // 点击菜单
  menuClickHandle = item => {
    this.setState({
      activeKey: [item.key]
    });

    // 将当前点击的菜单保存到 sessionStorage 中
    sessionStorage.setItem("activeKey", item.key);
    sessionStorage.setItem("openKey", item.keyPath);
  };

  render() {
    // 渲染页面
    return (
      <Menu theme="dark" mode="inline" selectedKeys={this.state.activeKey} defaultOpenKeys={this.state.openKey} onClick={this.menuClickHandle}>
        {
          // 一级菜单
        }
        {MenuData.map((item, index) => {
          if (item.children && item.children.length > 0) {
            return (
              <SubMenu
                key={"sub" + index}
                title={
                  <span>
                    <Icon type={item.icon} />
                    <span>{item.label}</span>
                  </span>
                }
              >
                {
                  // 二级菜单
                }
                {item.children.map((childItem, childIndex) => {
                  if (childItem.children && childItem.children.length > 0) {
                    return (
                      <SubMenu
                        key={"sub-second" + childIndex}
                        title={
                          <span>
                            <Icon type={childItem.icon} />
                            <span>{childItem.label}</span>
                          </span>
                        }
                      >
                        {
                          // 三级菜单
                        }
                        {childItem.children.map((thirdItem, thirdIndex) => {
                          return (
                            <Menu.Item key={"menu-third" + thirdIndex}>
                              <Link to={thirdItem.pathname} key={"menu-link-third" + thirdIndex}>
                                <Icon type={thirdItem.icon} />
                                <span>{thirdItem.label}</span>
                              </Link>
                            </Menu.Item>
                          );
                        })}
                      </SubMenu>
                    );
                  } else {
                    return (
                      <Menu.Item key={"menu-second" + childIndex}>
                        <Link to={childItem.pathname} key={"menu-link-second" + childIndex}>
                          <Icon type={childItem.icon} />
                          <span>{childItem.label}</span>
                        </Link>
                      </Menu.Item>
                    );
                  }
                })}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item key={"menu" + index}>
                <Link to={item.pathname} key={"menu-link" + index}>
                  <Icon type={item.icon} />
                  <span>{item.label}</span>
                </Link>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    );
  }
}

export default SubMenuList;
