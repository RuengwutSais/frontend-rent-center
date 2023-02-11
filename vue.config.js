const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // lintOnSave: false,
  // devServer: {
  //   proxy: {
  //     '/socket.io': {
  //       target: process.env.VUE_APP_API,
  //       ws: true,
  //       changeOrigin: true
  //     }
  //   }
  // }
})