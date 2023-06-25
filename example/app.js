/*
 * Author  rhys.zhao
 * Date  2022-01-28 15:36:55
 * LastEditors  rhys.zhao
 * LastEditTime  2023-06-25 19:52:14
 * Description 组件使用例子
 */
import React from 'react';
import { render } from 'react-dom';

import { useAutoFit } from '../lib';

const App = () => {
  useAutoFit(1920, 1080, 'screen');

  return (
    <div style={{ backgroundColor: 'red' }} id='screen'>
      测试
    </div>
  );
};
render(<App />, document.getElementById('root'));
