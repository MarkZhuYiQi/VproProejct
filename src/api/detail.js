import request from './../utils/request'
export function getLessonDetail(params) {
  return request({
    method: 'get',
    url: '/api/product/coursedetail',
    params
  })
}
export function getLessonsList(courseId) {
  return request({
    method: 'get',
    url: '/lesson/list' + courseId
  })
}
