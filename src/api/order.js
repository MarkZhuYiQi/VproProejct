import request from './../utils/request'
export function getCoupon(data) {
  return request({
    url: '/api/coupon/getcoupon',
    method: 'post',
    data
  })
}
export function checkCourses(courseId) {
  return request({
    'url': '/order/check',
    'method': 'get' + courseId
  })
}
export function getOrders(data) {
  return request({
    url: '/order/get',
    method: 'post',
    data

  })
}
export function putOrder(data) {
  return request({
    url: '/order',
    method: 'post',
    data
  })
}
export function pay(params) {
  return request({
    url: '/api/order/pay',
    method: 'get',
    params
  })
}
export function getOrderCourses(params) {
  return request({
    url: '/api/order/get-order-courses',
    method: 'get',
    params
  })
}
