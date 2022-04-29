/*
依赖:
  1. element-ui: 快速构建UI组件
  2. axios: 发送请求给后端
  3. vue-router@3: 配置SPA路由
  4. moment: 用于日期格式化
*/

import Vue from 'vue'
import App from './App.vue'

// 配置vue-router
import VueRouter from 'vue-router'
import router from './router'
Vue.use(VueRouter)

// 配置element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
