import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
//解决刷新数据消失的问题

Vue.use(Vuex);

/* eslint-disable no-new */
const store = new Vuex.Store({
  //默认存储到localStorage
  plugins: [createPersistedState()],
  //cookie同理
  // plugins: [createPersistedState({
  //   storage: window.sessionStorage
  //  })],
  modules: {},
});

export default store;
