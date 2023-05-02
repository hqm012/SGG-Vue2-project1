import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location) { return originPush.call(this, location).catch(err => err) }
VueRouter.prototype.replace = function (location) { return originReplace.call(this, location).catch(err => err) }

import routes from './routes'

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

// 引入store里的signinup模块信息用于路由守卫判断是否登录
import store from '@/store'

router.beforeEach(async (to, from, next) => {
    if (localStorage.getItem('TOKEN')) {
        if (to.path == '/login' || to.path == '/register') {
            next('/')
        } else {
            try {
                await store.dispatch('signinup/actGetUserInfo', localStorage.getItem('TOKEN'))
                next()
            } catch (error) {
                await store.dispatch('signinup/actLogout', localStorage.getItem('TOKEN'))
                console.log('登录失效，请重新登录');
                next('/login')
            }
        }
    } else {
        if (to.path != '/shopcart' && to.path != '/pay' && to.path.includes('center') == false) {
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.path
                }
            })
        }

    }
})

export default router