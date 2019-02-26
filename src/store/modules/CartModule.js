import { loadCart, addItemToUserCart, addItemToCookieCart, checkCourses, delCartItem, getCartItemDetail } from '@/api/cart'
import { setCookie, getCookie } from '@/utils/auth'
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
      if (state.cartInfo.cartDetail === null) data.cartInfo.cartDetail = []
      state['cartInfo'] = data
    },
    SET_ORDERINFO(state, data) {
      state['orderInfo'] = data
    },
    DEL_CARTITEM(state, courseId) {
      const cartInfo = state.cartInfo.cartDetail
      const cartItemDetail = state.cartItemDetail
      for (const i in cartItemDetail) {
        if (cartItemDetail[i]['courseId'] === courseId) {
          Vue.delete(cartItemDetail, i)
        }
      }
      for (const j in cartInfo) {
        if (cartInfo[j]['cartCourseId'] === courseId) {
          Vue.delete(cartInfo, j)
        }
      }
      console.log(cartInfo)
      console.log(cartItemDetail)
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
    delCartItem({ commit }, cartDetail) {
      return new Promise((resolve, reject) => {
        delCartItem(cartDetail).then(res => {
          // commit('DEL_CARTITEM', data.cartDetail[0]['cartCourseId'])
          if (cartDetail.cartIsCookie) {
            const cookieCart = JSON.parse(getCookie('cart'))
            cookieCart.cartDetail.map(item => {
              if (item.cartCourseId !== cartDetail.cartCourseId) return item
            })
            setCookie('cart', JSON.stringify(cookieCart), 30)
          }
          commit('DEL_CARTITEM', cartDetail.cartCourseId)
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
