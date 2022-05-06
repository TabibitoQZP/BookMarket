const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    // 后端api开在6666吧...
    // 算了不改了, 6666给网站用...
    proxy:'http://124.222.64.160:8421/'
  }
})