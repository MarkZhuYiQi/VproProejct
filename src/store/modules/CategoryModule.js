import { loadCategory, getPage, getNavTree } from './../../api/category'
import { Loading } from 'element-ui'
export default{
  state: {
    coursesList: [],
    pagination: -1,
    navTree: [],
    categoryCrumb: []
  },
  mutations: {
    SET_COURSESLIST(state, data) {
      state['coursesList'] = data
    },
    SET_PAGINATION(state, data) {
      state['pagination'] = data
    },
    SET_NAVTREE(state, data) {
      state['navTree'] = data
    },
    SET_CATEGORYCRUMB(state, data) {
      state['categoryCrumb'] = data
    }
  },
  actions: {
    loadCategories(context, { nav, page = 1 }) {
      const loading = Loading.service({
        text: '正在加载中'
      })
      return new Promise((resolve, reject) => {
        console.log(context.state.categoryCrumb)
        if (context.state.categoryCrumb.length === 0) return
        loadCategory({ category: context.state.categoryCrumb[context.state.categoryCrumb.length - 1]['nav_url'].split('/')[2], p: page }).then((res) => {
          loading.close()
          context.commit('SET_COURSESLIST', res.data)
          resolve(res.data)
        }).catch(err => {
          loading.close()
          reject(err)
        })
      })
    },
    clearCategories({ commit }) {
      commit('SET_COURSESLIST', [])
    },
    getPage({ commit }, { nav }) {
      return new Promise((resolve, reject) => {
        getPage({ category: nav }).then(res => {
          commit('SET_PAGINATION', res.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getNavTree({ commit }) {
      return new Promise((resolve, reject) => {
        getNavTree().then(res => {
          commit('SET_NAVTREE', res.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    setCategoryCrumb({ commit }, data) {
      commit('SET_CATEGORYCRUMB', data)
    },
    clearPage({ commit }, data) {
      commit('SET_PAGINATION', -1)
    }
  }
}
