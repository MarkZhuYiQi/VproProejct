const getters = {
  // static
  cloudRoot: state => state.constant.cloudRoot,
  // userModule
  getStep: state => state.user.step,
  auth_appid: state => state.user.userObj.auth_appid,
  authId: state => state.user.userObj.authId,
  token: state => state.user.userObj.token,
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
  lessonsList: state => state.detail.lessonsList,
  course: state => state.detail.course,
  crumb: state => state.detail.crumb,
  // indexModule
  carouselBackgroundColor: state => state.index.carouselBackgroundColor,
  indexCourseList: state => state.index.indexCourseList,
  indexNavbar: state => state.index.indexNavbar,
  indexCourses: state => state.index.indexCourses,
  // orderModule
  ordersHistory: state => state.order.orderHistory,
  ordersCurrentPage: state => state.order.currentPage,
  ordersCount: state => state.order.ordersCount,
  // playerModule
  // lessonsList: state => state.player.playerInfo.lessonsList,
  // videoModule
  payment: state => state.video.payment
}
export default getters
