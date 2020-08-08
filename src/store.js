import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0,
    name: 'Jack'
  },
  mutations: {
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    },
    reset (state, n) {
      state.count = n
    }
  },
  actions: {
    reset ({ commit }, payload) {
      setTimeout(() => {
        commit('reset', payload)
      }, 1000)
    }
  },
  getters: {
    getName (state) {
      return state.name
    },
    getFullName: (state) => (lastName) => {
      return state.name + '·' + lastName
    }
  }
})
export default store
