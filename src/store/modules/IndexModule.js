import { indexNav, indexCourses, indexNavbar } from './../../api/index'
import { Loading, Notification } from 'element-ui'
import { isEmpty } from '@/utils/validate'
export default{
  state: {
    carouselBackgroundColor: 'rgb(0, 0, 0)',
    indexNavbar: {},
    indexCourses: {},
    indexCourseList: ''
  },
  mutations: {
    SET_CAROUSELBACKGROUNDCOLOR(state, data) {
      state.carouselBackgroundColor = data
    },
    SET_INDEXCOURSELIST(state, data) {
      state.indexCourseList = data
    },
    SET_NAVBAR(state, data) {
      state.indexNavbar = data
    },
    SET_COURSES(state, data) {
      state.indexCourses = data
    }
  },
  actions: {
    setColor({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_CAROUSELBACKGROUNDCOLOR', data)
        resolve(data)
      })
    },
    /**
     *
     * @param context
     * @param url       请求地址
     * @param key       vuex存储名字
     * @param nav       传递参数值
     * @param param     传递参数键
     * @returns {Promise.<TResult>}
     */
    loadIndex(context, nav) {
      if (nav === undefined || nav === null || nav === '') nav = 0
      // 每次切换页面时清空页面数据，否则会有缓存之前的图片
      context.commit('SET_INDEXCOURSELIST', '')
      // requestPattern.token = context.rootState.user.userObj.token
      if (context.state.indexCourseList.length === 0 || Object.keys(context.state.indexCourseList).length === 0) {
        const loading = Loading.service({
          text: '正在加载中'
        })
        return new Promise((resolve, reject) => {
          indexNav(nav).then((res) => {
            loading.close()
            context.commit('SET_INDEXCOURSELIST', res.data)
            resolve(res)
          }).catch(err => {
            loading.close()
            Notification.error({
              title: '错误',
              message: '数据未成功加载！'
            })
            reject(err)
          })
        })
      }
    },
    loadCourses({ state, commit }, nav) {
      if (isEmpty(nav)) nav = 0
      commit('SET_COURSES', {})
      if (state.indexCourses.length === 0 || Object.keys(state.indexCourses).length === 0) {
        return new Promise((resolve, reject) => {
          indexCourses(nav).then(res => {
            commit('SET_COURSES', res.data)
            resolve(res.data)
          }).catch(err => {
            Notification.error({
              title: '错误',
              message: '课程未成功加载！'
            })
            reject(err)
          })
        })
      }
    },
    loadNavbar({ state, commit }, nav) {
      if (isEmpty(nav)) nav = 0
      commit('SET_NAVBAR', {})
      if (state.indexNavbar.length === 0 || Object.keys(state.indexNavbar).length === 0) {
        return new Promise((resolve, reject) => {
          indexNavbar(nav).then(res => {
            commit('SET_NAVBAR', res.data)
            resolve(res.data)
          }).catch(err => {
            Notification.error({
              title: '错误',
              message: '导航未成功加载！'
            })
            reject(err)
          })
        })
      }
    }
  }
}
