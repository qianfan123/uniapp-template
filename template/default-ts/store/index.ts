/* eslint-disable no-array-constructor */
/* eslint-disable import/no-duplicates */
import Vue from 'vue'
import Vuex from 'vuex'
import { Commit } from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    appId: '',
    tenant: ''
  },
  mutations: {
    setAppId(state, data: string) {
      state.appId = data
    },
    setTenant(state, data: string) {
      state.tenant = data
    }
  },
  getters: {},
  actions: {
    setAppId(context: { commit: Commit }, data: any) {
      context.commit('setAppId', data)
    },
    setTenant(context: { commit: Commit }, data: any) {
      context.commit('setTenant', data)
    }
  }
})

export default store
