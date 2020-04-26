export default {
  state: () => ({
    showFilter: false,
  }),

  actions: {
    toggleFilter({ commit }) {
      commit('toggleFilter')
    },
  },

  mutations: {
    toggleFilter(state) {
      state.showFilter = !state.showFilter
    },
  },
}
