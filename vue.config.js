const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const resolve = (dir) => path.resolve(__dirname, dir);
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // publicPath: '/',
  // outputDir: 'dist', // 默认dist
  lintOnSave: false,
  productionSourceMap: false,
  filenameHashing: false,
  configureWebpack: {
    // 导出umd格式的包，在全局对象上挂载属性package.name，基座应用需要通过这个全局对象获取一些信息，比如子应用导出的生命周期函数
    output: {
      // library的值在所有子应用中需要唯一
      library: 'knowledge',
      libraryTarget: 'umd',
    },
  },
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
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
};
