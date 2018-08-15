import Vue from 'vue'
import { createApp } from './app'
import auth from "common/auth"
import messager from 'common/messager'
import axioDecorate from 'common/axio-decorate'

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    console.info('=========beforeRouteUpdate========')
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

messager.createMessageObj(Vue)

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

axioDecorate.decorate()

router.onReady(() => {

  console.info('=========onReady========')

  if (auth.checkUserLogin() === false) {
    router.push({path: '/login'})
  }

  router.beforeResolve((to, from, next) => {
    console.info('=========beforeResolve========')

    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    // bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to }))).then(() => {
      // bar.finish()
      next()
    }).catch(next)
  })

  app.$mount('#js-my-app')
})
