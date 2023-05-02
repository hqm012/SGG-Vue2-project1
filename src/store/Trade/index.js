import { reqTrade, reqAddress } from '@/api'

export default {
    namespaced: true,
    state: {
        tradeInfo: {},
        addressList: []
    },
    actions: {
        async actAddress(context) {
            let result = await reqAddress();
            if (result.code === 200) {
                context.commit('mutAddress', result.data);
            } else {
                return Promise.reject(result.message)
            }
        },
        async actTrade(context) {
            let result = await reqTrade();
            if (result.code === 200) {
                context.commit('mutTrade', result.data)
            } else {
                return Promise.reject(result.message)
            }
        }
    },
    mutations: {
        mutTrade(state, data) {
            state.tradeInfo = data
        },
        mutAddress(state, data) {
            state.addressList = data
        }
    },
    getters: {
        detailArrayList(state) {
            return state.tradeInfo.detailArrayList || []
        }
    }
}