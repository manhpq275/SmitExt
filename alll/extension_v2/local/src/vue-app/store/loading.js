export default {
    state: {
        loading: false
    },
    getters: {
        loading: (state) => state.loading
    },
    mutations: {
        showLoading(state) {
            state.loading = true
        },
        hideLoading(state) {
            state.loading = false
        }
    },
    actions: {
        showLoading({ commit }) {
            commit('showLoading')
        },
        hideLoading({ commit }) {
            commit('hideLoading')
        }
    }
}
