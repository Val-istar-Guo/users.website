import filter from '@client/store/filter'

export default {
  namespaced: true,

  modules: {
    filter,
  },

  state: {
    items: [],
    total: 0,

    serviceList: [],
    searchServiceErrorMessages: [],
  },

  actions: {
  },

  mutations: {
    updateRoleList(state, { items, total }): void {
      state.items = items
      state.total = total
    },
    updateServiceList(state, services) {
      state.serviceList = services
    },
    appendSearchServiceError(state, error) {
      state.searchServiceErrorMessages = [...state.searchServiceErrorMessages, error.message]
    },
    clearSearchServiceError(state) {
      state.searchServiceErrorMessages = []
    },
  },
}
