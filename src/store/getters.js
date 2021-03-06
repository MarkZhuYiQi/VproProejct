const getters = {
  // userModule
  getStep: state => state.user.step,
  auth_appid: state => state.user.userObj.auth_appid,
  auth_id: state => state.user.userObj.auth_id,
  auth_token: state => state.user.userObj.auth_token,
  loginRequired: state => state.user.loginRequired,
  // cartModule
  cartInfo: state => state.cart.cartInfo,
  orderInfo: state => state.cart.orderInfo,
  // categoryModule
  coursesList: state => state.category.coursesList,
  pagination: state => parseInt(state.category.pagination),
  navTree: state => state.category.navTree,
  categoryCrumb: state => state.category.categoryCrumb,
  // couponModule
  couponInfo: state => state.coupon.couponInfo,
  // detailModule
  lessonDetail: state => state.detail.lessonDetail,
  // indexModule
  carouselBackgroundColor: state => state.index.carouselBackgroundColor,
  indexCourseList: state => state.index.indexCourseList,
  // orderModule
  ordersHistory: state => state.order.orderHistory,
  ordersCurrentPage: state => state.order.currentPage,
  ordersCount: state => state.order.ordersCount,
  // playerModule
  lessonsList: state => state.player.playerInfo.lessonsList,
  // videoModule
  payment: state => state.video.payment
}
export default getters
