import { request } from 'keq'
import { nodeEnv } from '@framework/env'
import { RequestException } from '../exception/request-exception'
import forward from '@framework/keq-forward'
import home from './home/store'
import * as cookie from '@client/utils/cookie'


request
  .use(async(context, next) => {
    await next()
    const response = context.response
    if (!response) throw new RequestException(0, ['request not send'])
    if (!response.ok) {
      const status = response.status
      if (status === 400) {
        const body = await response.json()
        throw new RequestException(status, body.message)
      }
      throw new RequestException(status, [await response.text()])
    }
  })
  .use(forward({
    host: 'users.miaooo.me',
    replacer: url => {
      let hostname = '127.0.0.1'
      if (process.env.WEB_CONTAINER === 'browser') hostname = window.location.hostname
      return { ...url, host: `${hostname}:3000` }
    },
  }))


export default {
  strict: nodeEnv.not.prod,

  modules: {
    home,
  },

  state: {
    user: null,
  },

  actions: {
    async auth({ commit }): Promise<void> {
      const token = cookie.get('token')
      if (!token) throw new Error('Not authorizated')

      const body = await request
        .get('http://users.miaooo.me/users/authorization')
        .set('Authorization', token)

      commit('login', body)
    },
  },

  mutations: {
    login(state, user): void {
      state.user = user
    },
  },
}
