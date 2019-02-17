<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper" v-if="imgs.length > 0">
            <swiper-slide
                    v-for="(item, i) in imgs" :key="i"
                    :style="{
                textAlign: 'center',
                margin: '0 auto',
            }"><img class="swiper-img" :src="item" alt="" style="width: 980px; height: 343px;"></swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>
<style>
    .swiper-container{
        height:343px;
        /*margin:0 0 30px 0;*/
    }
    .swiper-img{
        /*height:343px;*/
    }
</style>
<script>
  import { mapGetters } from 'vuex'
  require('swiper/dist/css/swiper.css')
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'carousel',
    created() {
      this.imgs = [
        // this.cloudRoot + '/1.jpg?imageView2/1/w/980/h/343/format/jpg/q/100',
        this.cloudRoot + '/1.jpg',
        this.cloudRoot + '/2.jpg',
        this.cloudRoot + '/3.jpg',
        this.cloudRoot + '/4.jpg',
        this.cloudRoot + '/5.jpg'
      ]
    },
    mounted() {
      const that = this
      this.swiper.on('transitionStart', function(swiper) {
        that.getRGB(that.imgs[swiper.realIndex])
      })
    },
    data() {
      return {
        imgs: [],
        swiperOption: {
          notNextTick: true,
          // 自动播放
          autoplay: 99993000,
          // 横向滚动
          direction: 'horizontal',
          // 滚动速度
          speed: 300,
          // 指针会变成手掌
          grabCursor: true,
          // 人工操作后动画不停止/
          autoplayDisableOnInteraction: false,
          // 可以用滚轮控制
          // 为前进后退按钮设置功能
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
          loop: true,
          effect: 'fade',
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoHeight: true
        }
      }
    },
    methods: {
      getRGB(src) {
        const that = this
        window.RGBaster.colors(src, {
          success: function(payload) {
            that.$store.dispatch('setColor', payload.secondary)
          }
        })
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      ...mapGetters(['indexCourseList', 'cloudRoot'])
    }
  }
</script>
