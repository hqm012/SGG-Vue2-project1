import { reqCategoryList, reqContainList, reqFloorList } from '@/api'

export default {
    namespaced: true,
    state: {
        categoryList: [],
        containList: [],
        floorList: [],
    },

    actions: {
        async categoryListUpdata(context) {
            const resData = await reqCategoryList()
            if (resData.code === 200) {
                context.commit('CATEGORYLISTUPDATA', resData.data)
            }
        },
        async containListUpdata(context) {
            const resData = await reqContainList()
            if (resData.code === 200) {
                context.commit('CONTAINLISTUPDATA', resData.data)
            }
        },
        async floorListUpdata(context) {
            const result = await reqFloorList();
            if (result.code === 200) {
                context.commit('FLOORLISTUPDATA', result.data)
            }
        }
    },
    mutations: {
        CATEGORYLISTUPDATA(state, params) {
            state.categoryList = params
        },
        CONTAINLISTUPDATA(state, params) {
            state.containList = params
        },
        FLOORLISTUPDATA(state, params) {
            state.floorList = params
        }
    },
}