class webSocket {
  constructor(param = {}) {
    this.param = param;
    this.reconnectCount = 0;
    this.socket = null;
    this.taskRemindInterval = null;
    this.isSucces = true;
  }

  connection = () => {
    let { socketUrl, timeout = 0 } = this.param;
    this.socket = new WebSocket(socketUrl);
    this.socket.onopen = this.onopen;
    this.socket.onmessage = this.onmessage;
    this.socket.onclose = this.onclose;
    this.socket.onerror = this.onerror;
    this.socket.sendMessage = this.sendMessage;
    this.socket.closeSocket = this.closeSocket;

    // 检测返回的状态码 如果socket.readyState不等于1则连接失败，关闭连接
    if (timeout) {
      let time = setTimeout(() => {
        if (this.socket && this.socket.readyState !== 1) {
          this.socket.close();
        }
        clearInterval(time);
      }, timeout);
    }
  };

  // 连接成功触发
  onopen = () => {
    let { socketOpen } = this.param;
    this.isSucces = false; //连接成功将标识符改为false
    socketOpen && socketOpen();
  };

  // 向后端发送数据
  sendMessage = value => {
    if (this.socket) {
      this.socket.send(JSON.stringify(value));
    }
  };

  // 后端向前端推得数据
  onmessage = msg => {
    let { socketMessage } = this.param;
    socketMessage && socketMessage(msg);
  };

  // 关闭连接触发
  onclose = e => {
    this.isSucces = true; //关闭将标识符改为true
    let { socketClose } = this.param;
    socketClose && socketClose(e);
    if (this.socket) {
      this.socket.close();
    }
  };

  // socket连接报错触发
  onerror = e => {
    let { socketError } = this.param;
    this.socket = null;
    socketError && socketError(e);
  };
}

export default webSocket;
