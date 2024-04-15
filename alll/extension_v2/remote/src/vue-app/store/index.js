import { createStore, createLogger } from 'vuex'
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({
  logActions: true, // Log Actions
  logMutations: true, // Log mutations
  logger: console, // implementation of the `console` API, default `console`
})] : [];

import user from './user'
import auth from './auth'
import token from './token'
import loading from './loading'

const store = createStore({
  modules: {
    auth,
    user,
    token,
    loading
  }
})

export default store;