import React, { Component } from "react";
import { connect } from "react-redux";
import { handleCleanToken } from "../../actions/index";
import { Button, Card } from "antd";
import "./Authorized.css";

class Authorized extends Component {
  // 点击事件
  handleClick() {
    // 清除 token
    this.props.handleCleanToken();
  }

  render() {
    return (
      <Card bodyStyle={{ padding: 0 }}>
        <div className="animate-wrap">
          <div className="background">
            {
              // 气泡
            }
            <div className="bubble bubble--10">
              <div className="bubble-spot" />
            </div>
            <div className="bubble bubble--20">
              <div className="bubble-spot" />
            </div>
            <div className="bubble bubble--30">
              <div className="bubble-spot" />
            </div>
            <div className="bubble bubble--45">
              <div className="bubble-spot" />
            </div>
            <div className="bubble bubble--60">
              <div className="bubble-spot" />
            </div>
            <div className="bubble bubble--70">
              <div className="bubble-spot" />
            </div>

            {
              // 章鱼
            }
            <div className="octopus">
              <div className="tentacle tentacle-1" />
              <div className="tentacle tentacle-2" />
              <div className="tentacle tentacle-3" />
              <div className="head">
                <div className="head-spot head-spot-1" />
                <div className="head-spot head-spot-2" />
                <div className="eyes eyes-1">
                  <div className="iris">
                    <div className="pupil">
                      <div className="eyes-spot" />
                    </div>
                  </div>
                </div>
                <div className="eyes eyes-2">
                  <div className="iris">
                    <div className="pupil">
                      <div className="eyes-spot" />
                    </div>
                  </div>
                </div>
                <div className="mouth" />
              </div>
              <div className="octo-bubble">
                <div className="bubble-spot" />
              </div>
            </div>
          </div>
        </div>

        {
          // 按钮
        }
        <div className="auth-button-wrap">
          <Button type="primary" ghost size={"large"} className="auth-button" onClick={this.handleClick.bind(this)}>
            清除 token，返回登录页面
          </Button>
        </div>
      </Card>
    );
  }
}

export default connect(
  null,
  { handleCleanToken }
)(Authorized);
