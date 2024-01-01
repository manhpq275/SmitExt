export default {
  state: {
    language: 'en',
    userLogin: {
      email: "",
      password: ""
    },
    userInfo: {
      id: "",
      reports: "",
      email: "",
      phone: "",
      address: "",
      language: "",
      filePath: "",
      status: "",
      secretKey: "",
      createdAt: "",
      updatedAt: "",
      displayName: "",
      role: "",
      language: "",
      accessToken: ""
    }
  },
  getters: {
    getUserLanguage(state) {
      return state.language;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
    getUserLogin(state) {
      return state.userLogin
    },
    getUserRole(state) {
      return state.userInfo.role;
    },
  },
  mutations: {
    SET_USER_LANGUAGE(state, payload) {
      state.language = payload
    },
    SET_USER_INFO(state, payload) {
      state.userInfo = { ...payload }
    },
    SET_USER_LOGIN(state, payload) {
      state.userLogin = { ...payload }
    },
  },
  actions: {
    SET_USER_LANGUAGE(context, payload) {
      context.commit('SET_USER_LANGUAGE', payload);
    },
    SET_USER_INFO(context, payload) {
      context.commit('SET_USER_INFO', payload);
    },
    SET_USER_LOGIN(context, payload) {
      context.commit('SET_USER_LOGIN', payload);
    },
  }
}