
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir)
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  publicPath: '/',
  outputDir: 'dist', // 默认dist
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/p/cs': {
        target: 'http://yapi.dev.syman.cn/mock/268',
        pathRewrite: {
          '^/p/cs': '/p/cs',
        },
        changeOrigin: true,
      },
    },
  },
};
