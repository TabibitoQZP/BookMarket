/*
路由配置
*/

import VueRouter from "vue-router"

// 引入组件库
import BookManage from '../pages/BookManage.vue'
import HomePage from '../pages/HomePage.vue'
import OrderForm from '../pages/OrderForm.vue'
import LoginPage from '../pages/LoginPage.vue'

const router = new VueRouter({
    routes: [
        {
            name: 'orderform',
            path: '/orderform',
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
        // 登录页
        {
            name: 'loginpage',
            path: '/login',
            component: LoginPage,
        },
    ]
})

// to, from, next
router.beforeEach((to, from, next) => {
    // 设置前置路由守卫, 比对用户信息是否在vuex中
    // 倘若在, 则可以正常放行, 否则重定向到登录页面
    if (to.path === '/login') {
        next()
    } else {
        next('/login')
    }
})

export default router