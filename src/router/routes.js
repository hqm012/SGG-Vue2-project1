import Home from '@/views/Home/Home.vue'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
import MyOrder from '@/views/Center/MyOrder'
import GroupOrder from '@/views/Center/GroupOrder'

export default [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        meta: {
            showFoot: true,
        }
    },
    {
        name: "search",
        path: '/search/:keyword?',
        component: Search,
        props: function ($route) {
            return {
                searchTextQ: $route.query,
                searchTextP: $route.params
            }
        },
        meta: {
            showFoot: true,
        }
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/detail/:skuId?',
        name: 'detail',
        component: Detail,
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess
    },
    {
        path: '/shopcart',
        component: ShopCart
    },
    {
        path: '/trade',
        component: Trade
    },
    {
        path: '/pay',
        component: Pay
    },
    {
        path: '/paysuccess',
        component: PaySuccess
    },
    {
        path: '/center',
        component: Center,
        redirect: '/center/myorder',
        children: [
            {
                path: 'myorder',
                component: MyOrder,
            },
            {
                path: 'grouporder',
                component: GroupOrder
            }
        ]
    }
]
