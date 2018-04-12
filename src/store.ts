import Vue from 'vue';
import Vuex from 'vuex';
import { DateTime } from 'luxon';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    format: '12hr',
    interval: 0,
    local: {
      date: '',
      loading: true,
      time: '',
      zone: '',
    },
    startTime: Date.now(),
  },
  actions: {
    updateFormat({ commit }, format) {
      commit('UPDATE_FORMAT', format);
    },
    updateLocal({ commit }) {
      commit('UPDATE_LOCAL');
    },
  },
  mutations: {
    UPDATE_FORMAT(state, format) {
      state.format = format;
    },
    UPDATE_LOCAL(state) {
      const now = DateTime.local();
      if (state.format === '12hr') {
        state.local.time = now.toLocaleString(DateTime.TIME_WITH_SECONDS);
      } else {
        state.local.time = now.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
      }
      state.local.date = now.toLocaleString(DateTime.DATE_HUGE);
      state.local.zone = now.zoneName;
      state.local.loading = false;
    },
  },
});
