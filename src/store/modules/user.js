// import { Module } from "vuex";
import * as Api from '@/api/login'
  /**
   * Filter asynchronous routing tables by recursion
   * @param routes asyncRoutes
   * @param roles
   */
  export function filterAsyncRoutes(routes) {
    const res = []
    routes.forEach((route) => {
      const tmp = { ...route }
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children)
        }
        res.push(tmp)
    })
    return res
  }

const store = {
    namespaced: true,
    state() {
        return {
            routers: []
        }
    },
    mutations: {
        setRouter(state, payload) {
            state.routers = payload;
        }
    },
    actions: {
        setRouter(context, payload) {
            let accessedRoutes
            accessedRoutes = filterAsyncRoutes(payload)
            context.commit("setRouter", accessedRoutes);
            return accessedRoutes
            
        },
        async login(context, payload) {
            return await Api.login(payload)
        }
    },
    getters: {
        getRouter(state) {
            return state.routers
        }
    }
}

export default store