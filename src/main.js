import 'babel-polyfill'
import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/theme/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import modal from 'vue-js-modal'

// import 'video.js/dist/video-js.css'
// import 'videojs-playlist-ui/dist/videojs-playlist-ui.vertical.css'
// import videpPlayer from 'vue-video-player'
// require('videojs-playlist/dist/videojs-playlist.js')
// require('videojs-playlist-ui/dist/videojs-playlist-ui.js')

require('rgbaster/rgbaster.js')

// import '@/styles/index.scss' // global css
import '@/styles/common.css'

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.use(modal)
// Vue.use(videpPlayer)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
