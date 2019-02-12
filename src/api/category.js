import request from './../utils/request'
export function loadCategory(params) {
  return request({
    'url': '/category/categories',
    'method': 'get',
    params
  })
}

export function getPage(params) {
  return request({
    'url': '/category/getpage',
    'method': 'get',
    params
  })
}
export function getNavTree() {
  return request({
    'url': '/category/get-nav-tree',
    'method': 'get'
  })
}
