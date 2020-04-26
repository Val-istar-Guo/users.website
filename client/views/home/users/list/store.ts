import filter from '@client/store/filter'
import creator from '@client/store/creator'

export default {
  modules: {
    filter,
    creator,
  },

  state: () => ({
    items: [],
    total: 0,
  }),

  actions: {
  },

  mutations: {
    updateUserList(state, { items, total }): void {
      state.items = items
      state.total = total
    },
  },
}

