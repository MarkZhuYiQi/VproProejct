import request from './../utils/request'
export function getCoupon(data) {
  return request({
    url: '/api/coupon/getcoupon',
    method: 'post',
    data
  })
}
export function checkCourses(data) {
  return request({
    url: '/api/product/checkcourses',
    method: 'post',
    data
  })
}
export function getOrders(params) {
  return request({
    url: '/api/order/get-order',
    method: 'get',
    params

  })
}
export function putOrder(data) {
  return request({
    url: '/api/order/put-order',
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
