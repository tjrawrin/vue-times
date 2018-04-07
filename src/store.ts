import Vue from 'vue';
import Vuex from 'vuex';
import { DateTime } from 'luxon';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    local: {
      date: '',
      loading: true,
      time: '',
      zone: '',
    },
  },
  getters: {},
  actions: {
    updateLocal({ commit }) {
      commit('UPDATE_LOCAL');
    },
  },
  mutations: {
    UPDATE_LOCAL(state) {
      const now = DateTime.local();
      state.local.date = now.toLocaleString(DateTime.DATE_HUGE);
      state.local.time = now.toLocaleString(DateTime.TIME_WITH_SECONDS);
      state.local.zone = now.zoneName;
      state.local.loading = false;
    },
  },
});
