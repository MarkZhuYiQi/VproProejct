import request from './../utils/request'

export function getRecCourses(navId) {
  return request({
    'url': '/course/rec/' + navId,
    'method': 'get'
  })
}
