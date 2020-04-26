import createRouter from './vue-router'
import createStore from './vuex'
import createVuetify from './vuetify'
import './debounce'
import './update-query'

export function register(options): void {
  createRouter(options)
  createStore(options)
  createVuetify(options)
}
