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
    url: '/api/comment/get-comment',
    method: 'get',
    params
  })
}
export function getCommentSupportRate(data) {
  return request({
    url: '/api/comment/get-comment-support-rate',
    method: 'post',
    data
  })
}
export function setCommentSupportRate(params) {
  return request({
    url: '/api/comment/set-comment-support-rate',
    method: 'get',
    params
  })
}
export function setComment(data) {
  return request({
    url: '/api/comment/set-comment',
    method: 'post',
    data
  })
}
