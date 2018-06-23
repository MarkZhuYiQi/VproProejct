/**
 * Created by SZL4ZSY on 3/15/2017.
 */
import Vue from 'vue'
export default{
  state: {
    navbar: [],
    userName: '',
    videoDetail: '',
    imgUsed: ''
  },
  mutations: {
    setResData(state, { key, data }) {
      // console.log(data);
      state[key] = data
    }
  },
  actions: {
    loadData(context, { url, key }) {
      console.log(context.rootState.user.userObj.auth_token)
      if (context.state[key].length === 0) {
        const loading = Vue.prototype.$loading({
          text: '正在加载中'
        })
        Vue.http.get(url, { timeout: 5000 }).then(
          msg => {
            loading.close()
            // console.log(msg.body);
            context.commit('setResData', { key: key, data: msg.body })
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
    postData(context, { url, key, body }) {
      if (context.state[key].length === 0) {
        const loading = Vue.prototype.$loading({
          text: '正在加载中'
        })
        Vue.http.post(url, { key: body }, { emulateJSON: true }, { timeout: 5000 }).then(
          msg => {
            loading.close()
            // console.log(msg.body);
            context.commit('setResData', { key: key, data: msg.body })
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
      }
    }
  }
}
