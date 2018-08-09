import Vue from 'vue'
import App from './app/app.vue'
import { createRouter } from 'router'
import { createStore } from 'store'

export function createApp() {
  // 创建 router 实例
  const router = createRouter()
  const store = createStore()

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
