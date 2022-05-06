/*
路由配置
*/

import VueRouter from "vue-router"
import moment from "moment"

// 引入组件库
import BookManage from '../pages/BookManage.vue'
import HomePage from '../pages/HomePage.vue'
import OrderForm from '../pages/OrderForm.vue'
import LoginPage from '../pages/LoginPage.vue'
import BillSearch from '../pages/BillSearch.vue'

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
        {
            name: 'billsearch',
            path: '/billsearch',
            component: BillSearch,
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
    // 设置一个日期本地存储, 对着日期不匹配时清空本地存储, 表明登录权限保留一天
    if (moment(moment.now()).format('YYYY-MM-DD') != localStorage.getItem('date')) {
        console.log('日期不匹配');
        localStorage.clear();
    }
    if (localStorage.getItem('username') === null) {
        if (to.path == '/login') {
            next()
        } else {
            next('/login')
        }
    } else {
        if (to.path == '/login') {
            next('/')
        } else {
            next()
        }
    }
})

export default router