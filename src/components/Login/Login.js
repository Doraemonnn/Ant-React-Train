import React, { Component } from "react";
import { connect } from "react-redux";
import { handleLogin } from "../../actions/index";
import { Form, Icon, Input, Button } from "antd";
import "./Login.css";
import logo from "../../logo.svg";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "crrc",
      password: "L4WZY7ObOV17Rq5agb0/2S8PHn8s9Jpz8p/rJsQNPRFLHyvJRFQqf9R+I0ZuASTenAAZo8Qa/77HBkUxlChg+ZRXDQB8JLBCwzjT3IpW+3OhAdJsUHJKTORtjpCa2S2wBG1RbYbbw1keZeg/DYRdPwLa04k36pkRYaV1zjIe3xY=",
      rememberMe: "false"
    };
  }

  componentDidMount() {
    // 表单验证
    this.props.form.validateFields();
  }

  // 登录
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 触发 action
        this.props.handleLogin({
          username: this.state.username,
          password: this.state.password,
          rememberMe: this.state.rememberMe
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login">
        <div className="login-box">
          <img src={logo} className="App-logo" alt="logo" />

          <Form onSubmit={this.handleSubmit} className="login-form">
            {
              // 用户名
            }
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请输入用户名!" }]
              })(<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="用户名" />)}
            </Form.Item>

            {
              // 密码
            }
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码!" }]
              })(<Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="密码" />)}
            </Form.Item>

            {
              // 登录按钮
            }
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登 录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);

export default connect(
  null,
  { handleLogin }
)(WrappedNormalLoginForm);
