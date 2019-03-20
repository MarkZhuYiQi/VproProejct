import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getLocalToken } from './utils/auth'

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 判断meta中是否需要验证身份
  if (to.meta.auth) {
    // 本地存储中有token
    if (getLocalToken()) {
      // 如果是去登录的，那么直接返回到首页
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        // 否则就去获取登录信息，获取成功直接下一页
        store.dispatch('getInfo').then(res => {
          next()
          console.log(res)
        }).catch(err => {
          // 没拿到登录信息，注销重新登陆吧
          // store.dispatch('frontUserLogout').then(() => {
          //   Message.error(err || 'Verification failed, please login again')
          //   next({ path: '/' })
          // })
        })
      }
    } else {
      // 本地存储没有token，需要去登陆并带上需要登陆的页面
      next({ path: '/login', query: { s: window.location.host + '/#' + to.fullPath }})
      NProgress.done()
    }
  } else {
    // 如果要去登陆但是已经有token存在那么直接到首页
    // if (to.path === '/login' && getLocalToken()) next({ path: '/' })
    NProgress.done()
    next()
  }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})

// const whiteList = ['/login'] // 不重定向白名单
// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   if (getToken()) {
//     if (to.path === '/login') {
//       next({ path: '/' })
//       NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
//     } else {
//       if (store.getters.roles.length === 0) {
//         store.dispatch('GetInfo').then(res => { // 拉取用户信息
//           next()
//         }).catch((err) => {
//           store.dispatch('FedLogOut').then(() => {
//             Message.error(err || 'Verification failed, please login again')
//             next({ path: '/' })
//           })
//         })
//       } else {
//         next()
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       next('/login')
//       NProgress.done()
//     }
//   }
// })
//
// router.afterEach(() => {
//   NProgress.done() // 结束Progress
// })
