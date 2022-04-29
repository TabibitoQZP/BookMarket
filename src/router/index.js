/*
路由配置
*/

import VueRouter from "vue-router"

// 引入组件库
import BookManage from '../pages/BookManage.vue'
import HomePage from '../pages/HomePage.vue'
import OrderForm from '../pages/OrderForm.vue'

export default new VueRouter({
    routes: [
        {
            name:'orderform',
            path:'/orderform',
            component: OrderForm,
        },
        {
            name: 'bookmanage',
            path: '/bookmanage',
            component: BookManage,
        },
        {
            name: 'homepage',
            path: '/homepage',
            component: HomePage,
        },
        // 设置一个默认首页...
        {
            name: 'defaulthomepage',
            path: '/',
            component: HomePage,
        },
    ]
})