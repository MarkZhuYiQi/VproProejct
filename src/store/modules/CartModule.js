import { loadCart, addItemToUserCart, addItemToCookieCart, checkCourses, delCartItem, getCartItemDetail } from '@/api/cart'
import { Message } from 'element-ui'
import Vue from 'vue'
export default{
  state: {
    cartInfo: {
      cartId: '',
      cartUserId: '',
      cartDetail: []
    },
    cartItemDetail: [],
    orderInfo: []
  },
  mutations: {
    SET_CARTINFO(state, data) {
      if (state.cartInfo.cartDetail == null) data.cartInfo.cartDetail = []
      state['cartInfo'] = data
    },
    SET_ORDERINFO(state, data) {
      state['orderInfo'] = data
    },
    DEL_CARTITEM(state, courseId) {
      const cartInfo = state.cartInfo.cartDetail
      for (const i in cartInfo) {
        if (cartInfo[i]['cartCourseId'] === courseId) {
          Vue.delete(cartInfo, i)
        }
      }
    },
    SET_CART_ITEM_DETAIL(state, data) {
      state['cartItemDetail'] = data
    }
  },
  actions: {
    loadCart(context) {
      return new Promise((resolve, reject) => {
        loadCart().then(res => {
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
        addItemToUserCart(data).then((res) => {
          Message({
            message: '成功加入购物车！',
            type: 'success'
          })
        }).catch(err => {
          reject(err)
        })
      })
    },
    addItemToCookieCart(context, data) {
      return new Promise((resolve, reject) => {
        addItemToCookieCart(data).then((res) => {
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
          commit('DEL_CARTITEM', data.cartDetail[0]['cartCourseId'])
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getCartItemDetail({ commit }, data) {
      return new Promise((resolve, reject) => {
        getCartItemDetail(data).then(res => {
          commit('SET_CART_ITEM_DETAIL', res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
