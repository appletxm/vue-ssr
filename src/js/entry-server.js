import { createApp } from './app'

const isDev = process.env.NODE_ENV !== 'production'

function checkPageHasAsyncData(components){
  let hasAsyncFn = false

  for(let i = 0; i<components.length; i++) {
    if(components[i]['hasOwnProperty']('asyncData')) {
      hasAsyncFn = true
      break
    }
  }

  return hasAsyncFn
}

function renderApp(context, store, app, resolve){
  context.state = store.state
  resolve(app)
}

export default (context) => {
  return new Promise((resolve, reject) => {

    const s = isDev && Date.now()
    const { app, router, store } = createApp()
    const { url } = context
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    // set router's location
    router.push(url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      let hasAsyncFn = false
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      hasAsyncFn = checkPageHasAsyncData(matchedComponents)
      if(hasAsyncFn === true && !context.userToken){
        router.push({path: '/login'})
        return renderApp(context, store, app, resolve)
      }

      if(hasAsyncFn === false) {
        renderApp(context, store, app, resolve)
      } else {
        Promise.all(matchedComponents.map(({ asyncData }) => {
          return asyncData && asyncData({store, route: router.currentRoute, userToken: context.userToken})
        })).then((res) => {
          return context.getDataFromServer(res)
        }).then(serverDataSet => {
          serverDataSet.forEach(dataObj => {
            store.commit(dataObj.storeCommitKey, dataObj.data)
          }) 

          isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
          renderApp(context, store, app, resolve)
        }).catch(reject)
      }
    }, reject)
  })
}
