/*
 * Author  rhys.zhao
 * Date  2023-06-15 17:41:52
 * LastEditors  rhys.zhao
 * LastEditTime  2023-06-25 19:01:22
 * Description 使用websocket的hook
 */
import { useState, useRef, useEffect } from 'react';

/**
 * 自定义 useWebSocket hook
 * @param {string} url websocket地址
 * @param {string} heartBeatOptions 心跳参数，为空表示不适用心跳。 {interval: 心跳间隔, send: 发送内容, res: 服务端返回内容， timeout: 超时时间，超过这个时间说明连接已断开，则会重新连接}
 * @returns {object} {readyState: websocket状态的readyState, 1代表连接成功，3代表已关闭； message: 接收到的数据，sendMessage: 向服务端发送数据的方法}
 */
export default function useWebSocket(url, heartBeatOptions) {
  const wsRef = useRef();
  const intervalRef = useRef();
  const timeRef = useRef();

  const [readyState, setReadyState] = useState(0);
  const [message, setMessage] = useState('');

  // 初始化websocket连接
  const initWebSocket = () => {
    if (!wsRef.current || wsRef.current.readyState === 3) {
      try {
        wsRef.current = new WebSocket(url);

        wsRef.current.onopen = (e) => {
          console.log('---- websocket 连接成功 ----', e);
          setReadyState(wsRef.current?.readyState);
          if (heartBeatOptions) {
            heartBeat();
          }
        };

        wsRef.current.onclose = (e) => {
          console.log('---- websocket 连接已关闭 ----', e);
          setReadyState(wsRef.current?.readyState);
        };

        wsRef.current.onerror = (e) => {
          console.log('---- websocket 连接错误 ----', e);
          setReadyState(wsRef.current?.readyState);
        };

        wsRef.current.onmessage = (e) => {
          if (e.data === heartBeatOptions?.res) {
            clearTimeout(timeRef.current);
          }
          setMessage(e.data);
        };
      } catch (err) {
        console.log(`连接过程出现错误，${err}`);
      }
    }
  };

  // 心跳
  const heartBeat = () => {
    const { interval, send, res, timeout } = heartBeatOptions;

    if (!interval && !send && !res && !timeout) {
      throw new Error('心跳参数错误，检查interval, send, res, timeout是否存在值为空的情况');
    }

    intervalRef.current = setInterval(() => {
      sendMessage(send);
      timeRef.current = setTimeout(() => {
        console.log('---- 心跳超时即认为停止，即将重新连接 ----');
        closeWebSocket();
        initWebSocket();
      }, timeout);
    }, interval);
  };

  // 客户端发送信息
  const sendMessage = (message) => {
    if (wsRef.current?.readyState === 1) {
      wsRef.current?.send(message);
    }
  };

  // 关闭websocket连接
  const closeWebSocket = () => {
    console.log('---- 关闭websocket ----');
    clearTimeout(timeRef.current);
    clearInterval(intervalRef.current);
    wsRef.current?.close();
    wsRef.current = null;
  };

  useEffect(() => {
    if (!wsRef.current) {
      initWebSocket();
    }
    return closeWebSocket;
  }, []);

  return {
    readyState,
    message,
    sendMessage
  };
}
