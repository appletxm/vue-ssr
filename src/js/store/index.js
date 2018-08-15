// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      items: [],
      isHandling: false,
      currentUserInfo: {},
      userList: []
    },
    actions: {
      fetchItem ({ commit }, id) {
        // // `store.dispatch()` 会返回 Promise，
        // // 以便我们能够知道数据在何时更新
        // return fetchItem(id).then(item => {
        //   commit('setItem', { id, item })
        // })

        setTimeout(()=>{
          commit('setItem', [
            {
            no: 'item001',
            name: 'item0001name'
          }])
        }, 5000)
      }
    },
    mutations: {
      setItem (state, items) {
        state.items = items
      },

      setUserInfo(state, value){
        state.currentUserInfo = value
      },

      setUserList(state, value){
        state.userList = value
      }
    }
  })
}