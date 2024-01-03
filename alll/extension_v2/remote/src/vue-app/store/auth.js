export default {
    state: {
        isAuth: false,
    },
    getters: {
        getIsAuth: (state) => state.isAuth,
    },
    mutations: {
        LOGIN_SUCCESS(state, payload) {
            console.log("LOGIN_SUCCESS");
            state.isAuth = true;
        },
        LOGIN_FAIL(state, payload) {
            console.log("LOGIN_FAIL");
            state.isAuth = false;
        },
        LOGOUT(state, payload) {
            console.log("LOGOUT");
            state.isAuth = false;
        },
    },
    actions: {
        LOGIN_SUCCESS(context, payload) {
            context.commit('LOGIN_SUCCESS', payload);
        },
        LOGIN_FAIL(context, payload) {
            context.commit('LOGIN_FAIL', payload);
        },
        LOGOUT(context, payload) {
            localStorage.removeItem('jwt');
            context.commit('LOGOUT', payload);
        },
    }
}