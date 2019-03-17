import request from './../utils/request'
export function getMyCourses() {
  return request({
    url: '/order/personal',
    method: 'get'
  })
}
