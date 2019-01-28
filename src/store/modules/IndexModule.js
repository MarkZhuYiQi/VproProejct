import { indexNav } from './../../api/index'
import { Loading, Notification } from 'element-ui'
export default{
  state: {
    carouselBackgroundColor: 'rgb(0, 0, 0)',
    indexCourseList: {}
  },
  mutations: {
    SET_CAROUSELBACKGROUNDCOLOR(state, data) {
      state.carouselBackgroundColor = data
    },
    SET_INDEXCOURSELIST(state, data) {
      state.indexCourseList = data
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
    loadIndex(context, { requestPattern = {}}) {
      // 每次切换页面时清空页面数据，否则会有缓存之前的图片
      if (requestPattern.length === 0 || Object.keys(requestPattern).length === 0) {
        context.commit('SET_INDEXCOURSELIST', '')
        return Promise
      }
      requestPattern.token = context.rootState.user.userObj.auth_token
      if (context.state.indexCourseList.length === 0 || Object.keys(context.state.indexCourseList).length === 0) {
        const loading = Loading.service({
          text: '正在加载中'
        })
        return new Promise((resolve, reject) => {
          indexNav(requestPattern).then((res) => {
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
    }
  }
}
