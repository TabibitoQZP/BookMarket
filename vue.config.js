const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    // 后端api开在6666吧...
    proxy:'http://localhost:6666/'
  }
})