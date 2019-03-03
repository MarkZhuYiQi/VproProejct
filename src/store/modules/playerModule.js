import { agree, oppose } from './../../api/comment'
import { getRecCourses } from './../../api/player'
import { getLessonsList } from '@/api/detail'
export default{
  state: {
    playerInfo: {
      lessonsList: []
    }
  },
  mutations: {
    SET_LESSONSLIST(state, data) {
      state['playerInfo']['lessonsList'] = data
    }
  },
  actions: {
    getLessonsList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getLessonsList(data).then(res => {
          commit('SET_LESSONSLIST', res.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getRecCourses({ commit }, data) {
      return new Promise((resolve, reject) => {
        getRecCourses(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    agree({ commit }, data) {
      return new Promise((resolve, reject) => {
        agree(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    reject({ commit }, data) {
      return new Promise((resolve, reject) => {
        oppose(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
