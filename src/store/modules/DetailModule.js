import { getLessonDetail, getLessonsList, getCourse } from './../../api/detail'
import { Notification, Loading } from 'element-ui'
import { getCrumb } from '../../api/category'
import { currency } from '@/utils'
export default{
  state: {
    lessonDetail: [],
    lessonsList: [],
    course: {},
    crumb: {}
  },
  mutations: {
    SET_LESSONDETAIL(state, data) {
      state.lessonDetail = data
    },
    SET_LESSONSLIST(state, data) {
      state.lessonsList = data
    },
    SET_COURSE(state, data) {
      state.course = data
    },
    SET_CRUMB(state, data) {
      state.crumb = data
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
    },
    loadLessonsList({ commit }, courseId) {
      if (courseId === null || courseId === undefined) {
        commit('SET_LESSONSLIST', '')
      }
      return new Promise((resolve, reject) => {
        getLessonsList(courseId).then(res => {
          commit('SET_LESSONSLIST', res.data)
          resolve(res)
        }).catch(err => {
          Notification.error({
            title: '错误',
            message: '课程列表未成功加载！'
          })
          reject(err)
        })
      })
    },
    loadCourse({ commit }, courseId) {
      return new Promise((resolve, reject) => {
        getCourse(courseId).then(res => {
          res.data.coursePrice = currency(res.data.coursePrice.toString())
          res.data.courseDiscountPrice = currency(res.data.courseDiscountPrice.toString())
          console.log(res.data)
          commit('SET_COURSE', res.data)
          resolve(res.data)
        }).catch(err => {
          Notification.error({
            title: '错误',
            message: '课程信息未成功加载！'
          })
          reject(err)
        })
      })
    },
    loadCrumb({ commit }, navId) {
      return new Promise((resolve, reject) => {
        getCrumb(navId).then(res => {
          commit('SET_CRUMB', res.data)
          resolve(res.data)
        }).catch(err => {
          Notification.error({
            title: '错误',
            message: '面包屑导航未成功加载！'
          })
          reject(err)
        })
      })
    }
  }
}
