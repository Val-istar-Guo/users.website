import roles from './roles/store'
import permissions from './permissions/store'
import users from './users/store'
import services from './services/store'


export default {
  namespaced: true,

  modules: {
    roles,
    permissions,
    users,
    services,
  },

  state: () => ({}),

  actions: {
  },

  mutations: {
    updateUserList(state, users): void {
      state.users = users
    },
    updateServicesList(state, services): void {
      state.services = services
    },
    updatePermissionList(state, permissions): void {
      state.permissions = permissions
    },
  },
}
