import request from './../utils/request'
export function loadCategory(params) {
  return request({
    'url': '/course/catalogs',
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
export function getCrumb(navId) {
  return request({
    url: '/category/crumb/' + navId,
    method: 'get'
  })
}
