<!--
 * Author  rhys.zhao
 * Date  2021-09-16 13:23:39
 * LastEditors  rhys.zhao
 * LastEditTime  2023-06-25 19:30:38
 * Description happy-react-hooks
-->

## 描述

happy-react-hooks 是一个 React Hook 工具库。

## Hooks 目录

```
hooks
├─ useAutoFit.js
└─ useWebSocket.js
```

## Hooks 介绍

### 1. useAutoFit

#### 介绍

一个用来自适应多屏幕的 Hook。

```js
import { useAutoFit } from 'happy-react-hooks';

const App = () => {
  useAutoFit(1920, 1080, 'screen');

  return (
    <div style={{ backgroundColor: 'red' }} id='screen'>
      测试
    </div>
  );
};
render(<App />, document.getElementById('root'));
```

#### 入参

| 属性             | 描述                              | 类型              | 默认值 |
| :--------------- | :-------------------------------- | :---------------- | :----- |
| width            | 设计稿宽度                        | number            | 1920   |
| height           | 设计稿高度                        | object            | 1080   |
| screenDom        | 用来缩放的 dom 元素，一般是根元素 | string / dom 元素 | "root" |
| debounceInterval | 防抖时间间隔, 避免频繁触发        | number            | 0      |

#### 返回值

返回值为空

### 2. useWebSocket

#### 介绍

封装 websocket 操作的 Hook。

```js
import { useWebSocket } from 'happy-react-hooks';

const WEBSOCKET_URL = 'ws://10.2.2.224:8888';

export default function WebsocketDemo() {
  const { readyState, message, sendMessage } = useWebSocket(WEBSOCKET_URL, {
    interval: 60 * 1000, // 心跳时间间隔
    send: 'heartBeat', // 心跳时候发送给服务端的数据
    res: 'still in connect', // 心跳连接正常收到服务端的数据
    timeout: 15 * 1000 // 超时时间，如果发送完数据15秒内没有收到服务端的响应(still in connect)，就认为已断开连接，则重新连接
  });

  useEffect(() => {
    if (readyState === 1) {
      sendMessage('connect ok');
    }
  }, [readyState]);

  useEffect(() => {
    console.log('message', message);
  }, [message]);

  // ...
}
```

#### 入参

| 属性             | 描述                                                                                                                                                   | 类型   | 默认值             |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :----- | :----------------- |
| url              | websocket 地址                                                                                                                                         | string | 无默认值，不可为空 |
| heartBeatOptions | 心跳参数，为空表示不使用心跳。 {interval: 心跳间隔, send: 发送内容, res: 服务端返回内容， timeout: 超时时间，超过这个时间说明连接已断开，则会重新连接} | object | 默认为空           |

#### 返回值

| 属性        | 描述                                                                                                   | 类型        |
| :---------- | :----------------------------------------------------------------------------------------------------- | :---------- |
| readyState  | websocket 状态的 readyState, 1 代表连接成功，3 代表已关闭。是一个 React state，可以 useEffect 直接监听 | React state |
| message     | 接收到的数据, 是一个 React state，可以 useEffect 直接监听                                              | React state |
| sendMessage | 向服务端发送数据的方法                                                                                 | object      |
