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
      get auth_token() {
        const auth_token = localStorage.getItem('auth_token')
        if (auth_token === null || auth_token === undefined) {
          return false
        }
        return auth_token
      },
      get auth_id() {
        const auth_id = localStorage.getItem('auth_id')
        if (auth_id === null || auth_id === undefined) {
          return false
        }
        return auth_id
      },
      get auth_appid() {
        const auth_appid = localStorage.getItem('auth_appid')
        if (auth_appid === null || auth_appid === undefined) {
          return false
        }
        return auth_appid
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
        userLogin(data).then((res) => {
          if (res.data) {
            const auth_token = res.data.auth_token
            const payload = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(auth_token.split('.')[1]))
            if (payload.auth_id && payload.auth_appid) {
              const userObj = {
                auth_id: payload.auth_id,
                auth_appid: payload.auth_appid,
                auth_token: auth_token
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
          const userObj = { auth_id: data.id, auth_appid: data.name, auth_token: localStorage.getItem('auth_token') }
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
      if (regInfo.user_name !== '' && regInfo.user_pass !== '' && regInfo.user_id !== '') {
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
