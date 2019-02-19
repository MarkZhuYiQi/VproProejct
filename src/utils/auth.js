import Cookies from 'js-cookie'
import { JSEncrypt } from 'jsencrypt'
import { KJUR, b64utoutf8 } from 'jsrsasign'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getLocalToken() {
  return localStorage.getItem('authToken')
}
export function encrypt(data, pubKey) {
  const jsencrypt = new JSEncrypt()
  jsencrypt.setPublicKey(pubKey)
  const enData = {}
  for (const key in data) {
    enData[key] = jsencrypt.encrypt(data[key])
  }
  return enData
}
export function verifyTokenExpiration(auth_token) {
  const payload = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(auth_token.split('.')[1]))
  if (payload.authId && payload.appId && payload.exp) {
    return (parseInt(payload.exp) > parseInt(String((new Date()).getTime()).substr(0, 10)))
  }
}

/**
 * 获得localStorage内容
 * @param key
 * @returns {boolean}
 */
export function getLocalData(key) {
  const expire = localStorage.getItem(key + 'expire')
  const value = localStorage.getItem(key)
  if (expire !== null && expire !== undefined) {
    const now = Math.ceil((new Date()).getTime() / 1000)
    // 过期时间比当前时间早，已过期
    if (localStorage.getItem(key + 'expire') < now) {
      localStorage.removeItem(key)
      localStorage.removeItem(key + 'expire')
      return false
    }
  }
  if (value !== null && value !== undefined) {
    return value
  }
  return false
}
/**
 * 购物车信息放到本地存储
 * @param key
 * @param data
 * @param expire
 */
export function addLocalData(key, data, expire) {
  if (expire === undefined) {
    expire = 3600 * 24
  }
  if (key && data) {
    const now = Math.ceil((new Date()).getTime() / 1000)
    localStorage.setItem(key, JSON.stringify(data))
    localStorage.setItem(key + 'expire', (now + expire).toString())
  }
}
export function checkLocalData(key) {
  const data = localStorage.getItem(key)
  if (data === null || data === undefined) {
    return null
  } else {
    const expire = localStorage.getItem(key + 'expire')
    if (Math.ceil(((new Date()).getTime()) / 1000) < parseInt(expire)) {
      return JSON.parse(data)
    }
    localStorage.removeItem(key)
    localStorage.removeItem(key + 'expire')
    return null
  }
}
export function setCookie(name, value, myDay) {
  const oDate = new Date()
  oDate.setDate(oDate.getDate() + myDay)
  document.cookie = name + '=' + value + '; expires=' + oDate
}
export function getCookie(name) {
  const arr = document.cookie.split('; ')
  for (let i = 0; i < arr.length; i++) {
    const arr1 = arr[i].split('=')
    if (arr1[0] === name) {
      return arr1[1]
    }
  }
  return ''
}
