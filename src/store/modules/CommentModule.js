import { agree, oppose, getComment, setComment, getCommentSupportRate, setCommentSupportRate } from './../../api/comment'
export default{
  state: {
    comments: [],
    commentSupportRate: [],
    get commentsRateForbidden() {
      const commentsRateForbidden = localStorage.getItem('comments_rate_forbidden')
      if (commentsRateForbidden === null || commentsRateForbidden === undefined) {
        return false
      }
      return commentsRateForbidden
    }
  },
  mutations: {
    SET_COMMENTS(state, data) {
      state['comments'] = data
    },
    SET_COMMENTSUPPORTRATE(state, data) {
      state['commentSupportRate'] = data
    }
  },
  actions: {
    agree({ commit }, data) {
      return new Promise((resolve, reject) => {
        agree(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    oppose({ commit }, data) {
      return new Promise((resolve, reject) => {
        oppose(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getComment({ commit }, data) {
      return new Promise((resolve, reject) => {
        getComment(data).then(res => {
          commit('SET_COMMENTS', res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getCommentSupportRate({ commit }, data) {
      return new Promise((resolve, reject) => {
        getCommentSupportRate(data).then(res => {
          commit('SET_COMMENTSUPPORTRATE', res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    setCommentSupportRate({ commit }, data) {
      return new Promise((resolve, reject) => {
        setCommentSupportRate(data).then(res => {
          resolve(res.data)
        })
      })
    },
    // 被评价过的评论无法再次点击
    setRateForbidden(context, { commentId }) {
      let forbidden = context.state.commentsRateForbidden
      forbidden = forbidden ? JSON.parse(forbidden) : []
      if (forbidden.indexOf(commentId) === -1) {
        forbidden.push(commentId)
        localStorage.setItem('comments_rate_forbidden', JSON.stringify(forbidden))
      }
    },
    getRateForbidden(context, { commentId }) {
      return new Promise((resolve, reject) => {
        const forbidden = context.state.commentsRateForbidden ? JSON.parse(context.state.commentsRateForbidden) : []
        resolve(forbidden.indexOf(commentId))
      })
    },
    setComment(context, data) {
      return new Promise((resolve, reject) => {
        data['user_id'] = context.getters['auth_id']
        console.log(data)
        setComment(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
