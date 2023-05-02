import { reqSearch } from '@/api'
export default {
    namespaced: true,
    state: {
        list: {}
    },
    actions: {
        async reqSearchData(context, value) {
            const result = await reqSearch(value);
            if (result.code === 200) {
                context.commit('SEARCHDATAUPDATE', result.data)
            }

        }
    },
    mutations: {
        SEARCHDATAUPDATE(state, value) {
            state.list = value
        }
    },
    getters: {
        attrsList(state) {
            return state.list.attrsList;
        },
        goodsList(state) {
            return state.list.goodsList;
        },
        trademarkList(state) {
            return state.list.trademarkList;
        }
    }
}