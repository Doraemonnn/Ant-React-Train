import React from "react";
import { connect } from "react-redux";

export const requireAuthentication = Component => {
  // 已创建验证组件时，直接返回
  if (Component.AuthenticatedComponent) {
    return Component.AuthenticatedComponent;
  }

  // 创建验证组件
  class AuthenticatedComponent extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object.isRequired
    };

    state = {
      login: true
    };

    componentWillMount() {
      // 验证 token
      this.checkAuth(this.props);
    }

    componentWillReceiveProps(nextProps) {
      // 验证 token
      this.checkAuth(nextProps);
    }

    checkAuth(propsParam) {
      // 验证 token
      const { userInfo } = propsParam;

      // 未登录重定向到登录页面
      if (userInfo.length === 0) {
        let redirect = propsParam.location.pathname + propsParam.location.search;
        this.context.router.push("/login?message=401&redirect_uri=" + encodeURIComponent(redirect));

        // 更改 sessionstorage
        sessionStorage.setItem("openKey", "menu0");
        sessionStorage.setItem("activeKey", "menu0");
        return;
      }

      // 更改 state
      this.setState({ login: true });
    }

    render() {
      if (this.state.login) {
        return <Component {...this.props} />;
      }
      return "";
    }
  }

  function mapStateToProps(state) {
    return {
      userInfo: state.loginState
    };
  }

  function mapDispatchToProps(dispatch) {
    return {};
  }

  Component.AuthenticatedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthenticatedComponent);

  return Component.AuthenticatedComponent;
};
