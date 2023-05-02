import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//下面是模块化引入的vuex
import home from './Home'
import search from './Search'
import detail from './Detail'
import signinup from './SignInUp'
import trade from './Trade'

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        signinup,
        trade
    }
})