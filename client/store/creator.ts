export default {
  state: () => ({
    showCreator: false,
  }),

  actions: {
    toggleCreator({ commit }) {
      commit('toggleCreator')
    },
  },

  mutations: {
    toggleCreator(state) {
      state.showCreator = !state.showCreator
    },
  },
}
