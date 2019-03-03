import request from './../utils/request'

export function getRecCourses(params) {
  return request({
    'url': '/api/vproplay/get-rec-courses',
    'method': 'get',
    params
  })
}
