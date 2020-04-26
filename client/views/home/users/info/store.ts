import { request } from 'keq'


export default {
  state: () => ({
    country: '',
    name: '',
    nickname: '',
    avatar: '',
    email: '',
    phone: '',
  }),

  actions: {
    async fetchUser({ commit }, id) {
      const user = await request
        .get(`http://users.miaooo.me/users/${id}`)

      commit('updateUser', user)
    },
  },

  mutations: {
    updateUser(state, user) {
      state.name = user.name
      state.nickname = user.nickname
      state.avatar = user.avatar
      state.email = user.email
      state.phone = user.phone
      state.country = user.country
    },
  },
}
