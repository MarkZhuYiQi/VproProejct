import { putOrder, getOrders, getOrderCourses, pay } from '@/api/order'
import { dateFormat } from '@/utils/index'
export default{
  state: {
    orderHistory: [],
    ordersCurrentPage: -1,
    ordersCount: 0
  },
  mutations: {
    SET_ORDERHISTORY(state, data) {
      state.orderHistory = data
    },
    SET_CURRENTPAGE(state, data) {
      state.currentPage = parseInt(data)
    },
    SET_ORDERSCOUNT(state, data) {
      state.ordersCount = parseInt(data)
    }
  },
  actions: {
    putOrder({ commit }, data) {
      return new Promise((resolve, reject) => {
        putOrder(data).then(res => {
          console.log(res.data)
          resolve(res.data)
        })
      })
    },
    getOrders({ commit }, data) {
      return new Promise((resolve, reject) => {
        getOrders(data).then(res => {
          let orders = res.data
          if (orders.length !== 0) {
            for (const i in orders) {
              orders[i]['orderTime'] = dateFormat(orders[i]['orderTime'], 'yyyy-MM-dd hh:mm:ss')
            }
          } else {
            orders = []
          }
          // console.log(orders)
          commit('SET_ORDERHISTORY', orders)
          commit('SET_CURRENTPAGE', res.data.currentPage)
          commit('SET_ORDERSCOUNT', res.data.length)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pay({ commit }, data) {
      return new Promise((resolve, reject) => {
        pay(data).then(res => {
          resolve(res)
        })
      })
    },
    clearOrders({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_ORDERHISTORY', [])
        resolve()
      })
    },
    getOrderCourses(context, params) {
      return new Promise((resolve, reject) => {
        getOrderCourses(params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
