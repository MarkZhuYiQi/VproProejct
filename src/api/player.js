import request from './../utils/request'

export function getLessonsList(params) {
  return request({
    'url': '/api/vproplay/get-lessons-list',
    'method': 'get',
    params
  })
}
export function getRecCourses(params) {
  return request({
    'url': '/api/vproplay/get-rec-courses',
    'method': 'get',
    params
  })
}
