/*
 * @Author: lzx
 * @Date: 2022-09-20 15:42:37
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-19 14:00:24
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\utils\socket.ts
 */
import { mitts } from "./tool";

let socketUrl: any = ""; // socket地址
let websocket: any = null; // websocket 实例
let heartTime: any = null; // 心跳定时器实例
let socketHeart: number = 0; // 心跳次数
let HeartTimeOut: number = 3000; // 心跳超时时间
let socketError: number = 0; // 错误次数

// 初始化socket
const initWebSocket = (url: any) => {
	socketUrl = url;
	// 初始化 websocket
  websocket = new WebSocket(url);
  websocketonopen();
  websocketonmessage();
  sendSocketHeart()
};

// socket 连接成功
const websocketonopen = () => {
	websocket.onopen = function (e: any) {
		console.log("连接 websocket 成功", e);
		resetHeart();
	};
};

// socket 连接失败
const websocketonerror = () => {
	websocket.onerror = function (e: any) {
		console.log("连接 websocket 失败", e);
	};
};

// socket 断开链接
const websocketclose = () => {
	websocket.onclose = function (e: any) {
		console.log("断开连接", e);
	};
};

// socket 接收数据
const websocketonmessage = () => {
  websocket.onmessage = function (e: any) {
    let msg = JSON.parse(e.data);
    if (msg.type === 'heartbeat') {
      resetHeart()
      console.log("心跳");
    }
    // console.log("收到socket消息", JSON.parse(e.data));
    test(msg) // 测试数据
	};
};

// socket 发送数据
const sendMsg = (data: any) => {
	websocket.send(data);
};

// socket 错误
const websocketError = () => {
	websocket.onerror = function (e: any) {
		console.log("socket 错误：", e);
	};
};

// socket 重置心跳
const resetHeart = () => {
	socketHeart = 0;
	socketError = 0;
	clearInterval(heartTime);
	sendSocketHeart();
};

// socket心跳发送
const sendSocketHeart = () => {
	heartTime = setInterval(() => {
		if (socketHeart <= 2) {
			console.log("心跳发送：", socketHeart);
			websocket.send(
				JSON.stringify({
          content: "",
          requestId: "123",
          type: "heartbeat"
				})
			);
			socketHeart = socketHeart + 1;
		} else {
			reconnect()
		}
	}, HeartTimeOut);
};

// socket重连
const reconnect = () => {
	if (socketError <= 2) {
		clearInterval(heartTime);
		initWebSocket(socketUrl);
		socketError = socketError + 1;
		console.log("socket重连", socketError);
	} else {
    console.log("重试次数已用完的逻辑", socketError);
    clearInterval(heartTime);
	}
};

// 测试收到消息传递
const test = (msg: any) => {
  switch (msg.type) {
    case 'heartbeat': //加入会议
      mitts.emit('heartbeat', msg)
      break;
  }
}
export {
	initWebSocket,
	websocketonmessage,
	sendMsg,
	websocketonopen,
	websocketonerror,
	websocketclose,
	websocketError,
	resetHeart,
	sendSocketHeart,
	reconnect,
};
