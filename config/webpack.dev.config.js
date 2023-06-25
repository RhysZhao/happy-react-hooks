/*
 * Author  rhys.zhao
 * Date  2022-01-28 15:24:07
 * LastEditors  rhys.zhao
 * LastEditTime  2023-06-25 16:44:55
 * Description 开发环境webpack配置
 */
const { resolve } = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: resolve(__dirname, '../example/app.js'), // 项目入口，处理资源文件的依赖关系
  output: {
    path: resolve(__dirname, '../example/'),
    filename: 'bundle.js' // 使用webpack-dev-sever启动开发服务时，并不会实际在`src`目录下生成bundle.js，打包好的文件是在内存中的，但并不影响我们使用。
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss|sass$/,
        exclude: /node_modules/,
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
  devServer: {
    static: resolve(__dirname, '../example/'),
    compress: true,
    host: '127.0.0.1', // webpack-dev-server启动时要指定ip，不能直接通过localhost启动，不指定会报错
    port: 11111, // 启动端口为 11111 的服务
    open: true // 自动打开浏览器
  }
};
