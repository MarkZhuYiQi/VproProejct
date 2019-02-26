import request from './../utils/request'

export function loadCart() {
  return request({
    'url': '/cart',
    'method': 'get'
  })
}
export function addItemToUserCart(data) {
  return request({
    'url': '/cart/add',
    'method': 'post',
    data
  })
}
export function addItemToCookieCart(data) {
  return request({
    'url': '/cart/cookie/cart',
    'method': 'post',
    data
  })
}
export function checkCourses(data) {
  return request({
    'url': '/api/product/checkcourses',
    'method': 'post',
    data
  })
}
export function delCartItem(data) {
  return request({
    'url': '/cart',
    'method': 'delete',
    data
  })
}
export function mergeCart(cookieCartId) {
  return request({
    'url': '/cart/merge/' + cookieCartId,
    'method': 'get'
  })
}
export function getCartItemDetail(coursesId) {
  return request({
    'url': '/cart/detail',
    'method': 'post',
    'data': coursesId
  })
}
