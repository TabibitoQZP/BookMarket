const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    // 后端api开在6666吧...
    proxy:'http://124.222.64.160:8421/'
  }
})