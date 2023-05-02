import { reqAuthCode, reqRegis, reqLogin, reqGetUserInfo, reqLogout } from '@/api'

export default {
    namespaced: true,
    state: {
        authCode: "",
        token: '',
        userInfo: {}
    },
    actions: {
        async actAuthCode(context, phone) {
            let result = await reqAuthCode(phone);
            if (result.code === 200) {
                context.commit('mutAuthCode', result.data);
                return 'OK'
            } else {
                return Promise.reject(new Error('请求失败'))
            }
        },
        async actRegis(context, data) {
            let result = await reqRegis(data);
            // console.log(result);
            if (result.code === 200) {
                return '注册成功'
            } else {
                return Promise.reject(result.message)
            }
        },
        async actLogin(context, data) {
            let result = await reqLogin(data);
            if (result.code === 200) {
                context.commit('mutLogin', result.data.token)
                localStorage.setItem('TOKEN', result.data.token)
                context.dispatch('actGetUserInfo', context.state.token)
                return '登录成功'
            } else {
                return Promise.reject(result.message)
            }
        },
        async actGetUserInfo(context, token) {
            let result = await reqGetUserInfo(token);
            if (result.code === 200) {
                context.commit('mutGetUserInfo', result.data)
                return '获取用户信息成功'
            } else {
                return Promise.reject(result.message)
            }
        },
        async actLogout(context, token) {
            let result = await reqLogout(token);
            if (result.code === 200) {
                context.commit('mutLogout')
                localStorage.removeItem('TOKEN')
                return '注销成功'
            } else {
                return Promise.reject(result.message)
            }
        }
    },
    mutations: {
        mutAuthCode(state, authCode) {
            state.authCode = authCode
        },
        mutLogin(state, token) {
            state.token = token
        },
        mutGetUserInfo(state, data) {
            state.userInfo = data
        },
        mutLogout(state) {
            state.userInfo = {}
        }
    },
    getters: {

    }
}