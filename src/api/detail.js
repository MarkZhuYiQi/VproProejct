import request from './../utils/request'
export function getLessonDetail(params) {
  return request({
    method: 'get',
    url: '/api/product/coursedetail',
    params
  })
}
