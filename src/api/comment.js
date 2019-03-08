import request from '@/utils/request'
export function agree(data) {
  return request({
    'url': '/api/comment/set-comment-support-rate',
    'method': 'post',
    data
  })
}
export function oppose(data) {
  return request({
    url: '/api/comment/set-comment-support-rate',
    method: 'post',
    data
  })
}
export function getComment(params) {
  return request({
    url: '/comment/' + params.lessonId,
    method: 'get',
    params
  })
}
export function getCommentSupportRate(data) {
  return request({
    url: '/comment/get-rate',
    method: 'post',
    data
  })
}
export function setCommentSupportRate(data) {
  return request({
    url: '/comment/support',
    method: 'post',
    data
  })
}
export function setComment(data) {
  return request({
    url: '/comment',
    method: 'post',
    data
  })
}
