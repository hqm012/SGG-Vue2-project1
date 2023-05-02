import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router'
import store from './store'

import TypeNav from './components/TypeNav/TypeNav.vue'
Vue.component(TypeNav.name, TypeNav)

import Pagination from './components/Pagination'
Vue.component(Pagination.name, Pagination)

// 引入mock运行一次
import mock from '@/mock/mockServe.js'

// 全局引入swiper样式
import 'swiper/css/swiper.css'

//elementUI
import { MessageBox } from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() { Vue.prototype.$bus = this }
}).$mount('#app')
