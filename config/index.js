"use strict";
// Template version: 1.2.8
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");

module.exports = {
  dev: {
    // Paths 
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/home": {
        target: "http://test.merchant.xljkj.cn:80",
        changeOrigin: true
      },
      "/details": {
        target: "http://test.merchant.xljkj.cn:80",
        changeOrigin: true
      },
      "/buy": {
        target: "http://test.merchant.xljkj.cn:80",
        changeOrigin: true
      },
      "/pro": {
        target: "http://test.merchant.xljkj.cn:80",
        changeOrigin: true
      },
      "/shoppingcat": {
        target: "http://test.merchant.xljkj.cn:80",
        changeOrigin: true
      },
      "/login": {
        target: "http://test.merchant.xljkj.cn:80",
        changeOrigin: true
      },
      "/statistics": {
        target: "http://test.merchant.xljkj.cn:80",
        changeOrigin: true
      },
      "/groupbooking": {
        target: "http://test.merchant.xljkj.cn:80",
        changeOrigin: true
      },
      "/collectproduct": {
        target: "http://test.merchant.xljkj.cn:80",
        changeOrigin: true
      },
      "/delete": {
        target: "http://test.merchant.xljkj.cn:80",
        changeOrigin: true
      },
      "/sharedetails": {
        target: "http://test.merchant.xljkj.cn:80",
        changeOrigin: true
      },
      "/delete": {
        target: "http://test.merchant.xljkj.cn:80",
        changeOrigin: true
      },
      "/location": {
        target: 'http://api.map.baidu.com',
        changeOrigin: true
      }
    },
    // Various Dev Server settings    
    host: "localhost", // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    // devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
