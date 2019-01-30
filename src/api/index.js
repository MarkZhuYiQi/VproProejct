import request from './../utils/request'
export function indexNav(nav) {
  return request({
    'url': '/index/nav' + nav,
    'method': 'get'
  })
}
export function indexCourses(nav) {
  return request({
    'url': '/index/courses' + nav,
    'method': 'get'
  })
}
