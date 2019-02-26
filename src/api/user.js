import request from './../utils/request'
export function userLogin(data) {
  return request({
    method: 'post',
    // url: '/api/auths',
    url: '/login',
    data
  })
}

export function getInfo() {
  return request({
    url: '/login',
    method: 'get'
  })
}
