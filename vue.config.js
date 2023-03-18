const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: process.env.VUE_APP_PORT || 80
  }
  //   proxy: {
  //     '/socket.io': {
  //       target: process.env.VUE_APP_API,
  //       ws: true,
  //       changeOrigin: true
  //     }
  //   }
  // }
})