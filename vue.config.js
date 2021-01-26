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
  parallel: require('os').cpus().length > 1,
  configureWebpack: {
    // 导出umd格式的包，在全局对象上挂载属性package.name，基座应用需要通过这个全局对象获取一些信息，比如子应用导出的生命周期函数
    output: {
      // library的值在所有子应用中需要唯一
      library: 'knowledge',
      libraryTarget: 'umd',
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => Object.assign(options, { limit: 200000 }));
  },
  devServer: {
    proxy: {
      '/p/c': {
        target: 'http://192.168.4.92:8081',
        pathRewrite: {
          '^/p/c': '/p/c',
        },
        changeOrigin: true,
      },
      // '/p/cs': {
      //   target: 'http://ark-share-base.dev.burgeononline.com/',
      //   pathRewrite: {
      //     '^/p/cs': '/p/cs',
      //   },
      //   changeOrigin: true,
      // },
      // '/ad-app': {
      //   target: 'http://ark-share-base.dev.burgeononline.com/',
      //   pathRewrite: {
      //     '^/ad-app': '/ad-app',
      //   },
      //   changeOrigin: true,
      // },
    },
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/',
};
