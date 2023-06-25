/*
 * Author  rhys.zhao
 * Date  2022-01-28 15:24:07
 * LastEditors  rhys.zhao
 * LastEditTime  2023-02-06 17:08:52
 * Description 生产环境webpack配置
 */
const { resolve } = require('path');

module.exports = {
  mode: 'production',
  entry: resolve(__dirname, '../src/index.js'),
  output: {
    path: resolve(__dirname, '../lib/'),
    filename: 'index.js',
    libraryTarget: 'umd', // 采用通用模块定义
    libraryExport: 'default' // 兼容 ES6 的模块系统、CommonJS 和 AMD 模块规范
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: resolve(__dirname, '../src'),
        loader: 'babel-loader'
      },
      {
        test: /\.scss|sass$/,
        include: resolve(__dirname, '../src'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  externals: {
    // 定义外部依赖，避免把react和react-dom打包进去
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  }
};
