import filter from '@client/store/filter'

export default {
  namespaced: true,

  modules: {
    filter,
  },

  state: {
    items: [],
    total: 0,
  },

  actions: {
  },

  mutations: {
    updateServiceList(state, { items, total }): void {
      state.items = items
      state.total = total
    },
  },
}
