import Vue from 'vue'
import Axios from 'axios'
export default{
  state: {
    indexNav: [],
    videoList: [],
    // 分页页数
    listPagination: '',
    // 每一个课程的详细信息
    lessonDetail: [],
    video: {
      video_title: '',
      video_class: 2,
      video_desc: '',
      video_mode: 'free',
      video_price: 0,
      // 上传到七牛后的key
      video_videokey: '',
      video_cover: {
        name: '',
        url: '',
        id: 0
      },
      video_tag: [],
      video_file_url: '',
      video_file_id: ''
    },
    // 购物车信息
    cartInfo: [],
    // 订单信息
    orderInfo: [],
    // 优惠券信息
    couponInfo: [],
    // 最后的购买信息
    payment: {
      payUrl: true
    },
    edit_video_info: [],
    videoDetail: {},
    orderHistory: {}
  },
  mutations: {
    setVideoData(state, { key, data }) {
      state[key] = data
      // console.log(state[key])
    }
  },
  actions: {
    loadDetail(context, { url, nav, key, page = 1 }) {
      const loading = Vue.prototype.$loading({
        text: '正在加载中'
      })
      return Axios.get(url, {
        timeout: 5000,
        params: {
          category: nav,
          p: page
        }
      }).then(
        res => {
          loading.close()
          const gainRes = res.data
          // console.table(gainRes);
          context.commit('setVideoData', { key: key, data: gainRes })
        }).catch(err => {
        loading.close()
        console.log(err)
        Vue.prototype.$notify.error({
          title: '错误',
          message: '数据未成功加载！'
        })
      })
    }
  }
}
