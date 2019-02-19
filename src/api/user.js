import request from './../utils/request'
export function userLogin(data) {
  return request({
    method: 'post',
    // url: '/api/auths',
    url: '/login',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/auth/info',
    method: 'get',
    params: { token }
  })
}
