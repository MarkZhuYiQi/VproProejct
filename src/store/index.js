import Vue from 'vue'
import Vuex from 'vuex'
import constant from './modules/ConstantModule'
import video from './modules/VideoModule'
import user from './modules/UserModule'
import comment from './modules/CommentModule'
import index from './modules/IndexModule'
import detail from './modules/DetailModule'
import category from './modules/CategoryModule'
import player from './modules/PlayerModule'
import cart from './modules/CartModule'
import coupon from './modules/CouponModule'
import order from './modules/OrderModule'
import personal from './modules/personalModule'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    constant,
    video,
    user,
    comment,
    index,
    detail,
    category,
    player,
    cart,
    coupon,
    order,
    personal
  },
  getters
})

export default store
