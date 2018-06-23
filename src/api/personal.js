import request from './../utils/request'
export function getMyCourses(params) {
  return request({
    'url': '/api/order/get-my-courses',
    'method': 'get',
    params
  })
}
