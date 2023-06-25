/*
 * Author  rhys.zhao
 * Date  2023-06-25 14:47:07
 * LastEditors  rhys.zhao
 * LastEditTime  2023-06-25 19:15:29
 * Description 多屏幕适配 hook
 */
import { useEffect } from 'react';

/**
 * 多屏幕适配 hook
 * @param {number} width 设定尺寸宽
 * @param {number} height 设定尺寸高
 * @param {*} screenDom 需要缩放的 dom，可以使用任何跟屏幕宽高一致的 dom
 * @param {*} debounceInterval 防抖时间间隔，为0相当于不适用防抖
 */
export default function useAutoFit(width = 1920, height = 1080, screenDom = 'root', debounceInterval = 0) {
  // 根据视口宽高来缩放
  const setScale = (width, height, dom) => {
    const { innerWidth, innerHeight } = window;
    let widthScale = innerWidth / width;
    let heightScale = innerHeight / height;

    dom.style.transform = `scale(${widthScale}, ${heightScale})`;
    dom.style.transformOrigin = 'left top';
  };

  useEffect(() => {
    // 获取dom元素
    const dom = typeof screenDom === 'string' ? document.getElementById(screenDom) : screenDom;

    // 设置dom元素的宽高为设定尺寸
    dom.style.width = `${width}px`;
    dom.style.height = `${height}px`;
    setScale(width, height, dom);

    let timer = null;
    // 监听window窗口变化来进行缩放，并使用防抖
    const windowResizeListener = window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setScale(width, height, dom);
      }, debounceInterval);
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', windowResizeListener);
    };
  }, []);
}
