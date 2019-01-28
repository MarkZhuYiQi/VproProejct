import request from './../utils/request'
export function indexNav(nav) {
  return request({
    'url': '/index/' + nav,
    'method': 'get'
  })
}
