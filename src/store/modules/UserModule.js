/**
 * Created by SZL4ZSY on 3/15/2017.
 */
import Vue from 'vue'
import Axios from 'axios'
import { userLogin, getInfo } from '@/api/user'
import { KJUR, b64utoutf8 } from 'jsrsasign'
export default{
  state: {
    loginRequired: false,
    step: 0,
    userObj: {
      get authToken() {
        const authToken = localStorage.getItem('authToken')
        if (authToken === null || authToken === undefined) {
          return false
        }
        return authToken
      },
      // 用户ID
      get authId() {
        const authId = localStorage.getItem('authId')
        if (authId === null || authId === undefined) {
          return false
        }
        return authId
      },
      // 用户名
      get appId() {
        const appId = localStorage.getItem('appId')
        if (appId === null || appId === undefined) {
          return false
        }
        return appId
      }
    }
  },
  mutations: {
    SET_USER_DATA(state, { data }) {
      for (const i in data) {
        state['userObj'][i] = data[i]
      }
      state.userObj = data
    },
    SET_LOCALSTORAGE_DATA(state, { data }) {
      for (const i in data) {
        localStorage.setItem(i, data[i])
      }
    },
    SET_LOGIN(state, data) {
      state.loginRequired = data
    },
    setUserData(state, data) {
      state[data.container][data.key] = data.value
    },
    setStep(state, num) {
      state.step = num
      // if (state.step++ > 2) state.step = 0;
    }
  },
  actions: {
    auth(context, url) {
      Axios.get(url + '?token=' + context.state.userObj.auth_token).then().catch()
    },
    loadUserStep(context, { url, key }) {
      if (Object.keys(context.state.userObj).length > 0) {
        const loading = Vue.prototype.$loading({
          text: '正在加载中'
        })
        Vue.http.get(url, { params: { id: context.state.userObj.user_id }}, { timeout: 5000 }).then(
          msg => {
            loading.close()
            context.commit('setStep', { key: key, data: msg.body['user_step'] })
          },
          function(error) {
            console.log('error!')
            console.log(error)
            loading.close()
            Vue.prototype.$notify.error({
              title: '错误',
              message: '数据未成功加载！'
            })
          }
        )
      }
    },
    postUser(context, { url, key, body }) {
      // if(Object.keys(context.state.userObj).length>0){
      const loading = Vue.prototype.$loading({
        text: '正在加载中'
      })
      return Vue.http.post(url, { key: body }, { emulateJSON: true }, { timeout: 5000 }).then(
        msg => {
          loading.close()
          return msg.body
        },
        function(error) {
          console.log('error!')
          console.log(error)
          loading.close()
          Vue.prototype.$notify.error({
            title: '错误',
            message: '数据提交失败！'
          })
        }
      )
      // }
    },
    frontUserLogin(context, { data }) {
      return new Promise((resolve, reject) => {
        console.log(data)
        userLogin(data).then((res) => {
          if (res.data) {
            const authToken = res.data.authToken
            const payload = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(authToken.split('.')[1]))
            if (payload.authId && payload.appId) {
              const userObj = {
                authId: payload.authId,
                appId: payload.appId,
                authToken: authToken
              }
              context.commit('SET_USER_DATA', { data: userObj })
              context.commit('SET_LOCALSTORAGE_DATA', { data: userObj })
              resolve(res)
            }
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    frontUserLogout(context, callback) {
      const userInfo = context.state.userObj
      Object.keys(userInfo).map(item => {
        localStorage.removeItem(item)
      })
      location.reload()
    },
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.userObj.auth_token).then(response => {
          const data = response.data
          const userObj = { auth_id: data.id, auth_appid: data.name, auth_token: localStorage.getItem('authToken') }
          commit('SET_USER_DATA', { data: userObj })
          commit('SET_LOCALSTORAGE_DATA', { data: userObj })
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    isLoginRequired({ commit }, data) {
      commit('SET_LOGIN', data)
    },
    step1(context, regInfo) {
      if (regInfo.appId !== '' && regInfo.appKey !== '' && regInfo.authId !== '') {
        for (const i in regInfo) {
          context.commit('setUserData', { key: i, value: regInfo[i], container: 'userObj' })
        }
        context.commit('setStep', 1)
      }
    },
    step2(context, regInfo) {
      console.log(regInfo)
      console.log(context.state.userObj)
      if (regInfo.user_tel !== '' && regInfo.user_id === context.state.userObj.user_id) {
        delete regInfo.user_id
        for (const i in regInfo) {
          context.commit('setUserData', { key: i, value: regInfo[i], container: 'userObj' })
        }
        context.commit('setStep', 2)
      }
    }
  }
}
