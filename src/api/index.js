import request from './../utils/request'
export function indexNav(params) {
  return request({
    'url': '/vpro/indexnav',
    'method': 'get',
    params
  })
}
