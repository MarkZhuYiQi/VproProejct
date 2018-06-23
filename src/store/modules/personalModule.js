import { getMyCourses } from '@/api/personal'
export default{
  state: {},
  mutations: {},
  actions: {
    getMyCourses({ commit }, data) {
      return new Promise((resolve, reject) => {
        getMyCourses(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
