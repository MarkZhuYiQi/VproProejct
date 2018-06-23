import { getLessonDetail } from './../../api/detail'
import { Notification, Loading } from 'element-ui'
export default{
  state: {
    lessonDetail: []
  },
  mutations: {
    SET_LESSONDETAIL(state, data) {
      state.lessonDetail = data
    }
  },
  actions: {
    loadLessonDetail(context, { request_pattern = {}}) {
      // 每次切换页面时清空页面数据，否则会有缓存之前的图片
      if (request_pattern.length === 0 || Object.keys(request_pattern).length === 0) {
        context.commit('SET_LESSONDETAIL', '')
        return Promise
      }
      if (context.state.lessonDetail.length === 0 || Object.keys(context.state.lessonDetail).length === 0) {
        const loading = Loading.service({
          text: '正在加载中'
        })
        return new Promise((resolve, reject) => {
          getLessonDetail(request_pattern).then((res) => {
            loading.close()
            context.commit('SET_LESSONDETAIL', res.data)
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
