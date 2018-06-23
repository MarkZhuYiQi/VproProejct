import { loadCart, addCart, checkCourses, delCartItem } from '@/api/cart'
import { Message } from 'element-ui'
import Vue from 'vue'
export default{
  state: {
    cartInfo: {
      cartInfo: []
    },
    orderInfo: []
  },
  mutations: {
    SET_CARTINFO(state, data) {
      state['cartInfo'] = data
    },
    SET_ORDERINFO(state, data) {
      state['orderInfo'] = data
    },
    DEL_CARTITEM(state, courseId) {
      const cartInfo = state.cartInfo.cartInfo
      for (const i in cartInfo) {
        if (cartInfo[i]['cart_course_id'] === courseId) {
          Vue.delete(cartInfo, i)
        }
      }
    }
  },
  actions: {
    loadCart(context, data) {
      return new Promise((resolve, reject) => {
        loadCart(data).then(res => {
          context.commit('SET_CARTINFO', res.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    checkCourses({ commit }, data) {
      return new Promise((resolve, reject) => {
        checkCourses(data).then(res => {
          commit('SET_ORDERINFO', res.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    addToCart(context, data) {
      return new Promise((resolve, reject) => {
        addCart(data).then((res) => {
          Message({
            message: '成功加入购物车！',
            type: 'success'
          })
        }).catch(err => {
          reject(err)
        })
      })
    },
    delCartItem({ commit }, data) {
      return new Promise((resolve, reject) => {
        delCartItem(data).then(res => {
          commit('DEL_CARTITEM', data.cart_detail[0]['cart_course_id'])
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
