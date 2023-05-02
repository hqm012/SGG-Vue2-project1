import { reqDetail } from '@/api'
import { reqCartList } from '@/api'

export default {
    namespaced: true,
    state: {
        detailInfo: {},
        cartListInfo: []
    },
    actions: {
        async reqDetailInfo(context, skuId) {
            const result = await reqDetail(skuId)
            if (result.code === 200) {
                context.commit('DETAILINFOUPDATE', result.data)
            }
        },
        async reqCartListInfo(comtext, uuid) {
            const result = await reqCartList(uuid);
            if (result.code === 200) {
                comtext.commit('CARTLISTINFO', result.data[0].cartInfoList || [])
            }
        }
    },
    mutations: {
        DETAILINFOUPDATE(state, data) {
            state.detailInfo = data
        },
        CARTLISTINFO(state, data) {
            state.cartListInfo = data || []
        }
    },
    getters: {
        categoryView(state) {
            return state.detailInfo.categoryView || {}
        },
        skuInfo(state) {
            return state.detailInfo.skuInfo || {}
        },
        spuSaleAttrList(state) {
            return state.detailInfo.spuSaleAttrList || {}
        }
    }
}