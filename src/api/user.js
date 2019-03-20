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
    url: '/login/' + token,
    method: 'get'
  })
}

export function logOut() {
  return request({
    url: '/login/out',
    method: 'get'
  });
}
