import { getCoupon } from '@/api/order'
export default{
  state: {
    couponInfo: []
  },
  mutations: {
    SET_COUPONINFO(state, data) {
      state['couponInfo'] = data
    }
  },
  actions: {
    getCoupon({ commit }, data) {
      return new Promise((resolve, reject) => {
        getCoupon(data).then(res => {
          commit('SET_COUPONINFO', res.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
