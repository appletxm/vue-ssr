import '../css/index.less'
import Vue from 'vue'
import App from './app/app.vue'
import { createRouter } from 'router'
import { createStore } from 'store'
import { sync } from 'vuex-router-sync'

export function createApp() {
  const router = createRouter()
  const store = createStore()

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return {
    app,
    router,
    store
  }
}
