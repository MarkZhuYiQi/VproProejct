<template>
    <div class="detail-container">
        <div class="bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="item in lessonDetail.crumb" :to="{path:item.nav_url}" :key="item.nav_id">{{item.nav_text}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="detail-main">
            <el-row v-if="flag">
                <el-col :span="10">
                    <img :src="lessonDetail.detail.course_cover_address" alt="" class="main-img">
                </el-col>
                <el-col :span="14">
                    <div class="main-detail">
                        <span class="main-title">{{lessonDetail.detail.course_title}}</span>
                        <div class="main-info">
                            <i class="el-icon-menu"></i>
                            <span>{{lessonDetail.detail.course_clickNum}}</span>
                            <el-rate
                                    v-model="score"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    class="el-rate-inline"
                                    show-template="{value}"
                            >
                            </el-rate>
                            <!--<span>{{lessonDetail.detail.course_score}}</span>-->
                        </div>
                        <div>
                            <span class="main-price">{{lessonDetail.detail.course_price}}</span>
                            <span class="activity-price" v-if="parseFloat(lessonDetail.detail.course_discount_price).toFixed(2)!=='-1.00'">{{lessonDetail.detail.course_discount_price}}</span>
                        </div>
                        <div class="main-adv">现在注册即送优惠券</div>
                        <div class="clearfix"></div>
                        <div  class="main-btn">
                            <el-button type="primary" size="large" @click="verifyCourse">立即参加</el-button>
                            <el-button type="text" @click="addToCart">加入购物车</el-button>
                        </div>
                        <div class="main-share">
                            <el-button type="primary" icon="star-off"></el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-row :gutter="20">
            <el-col :span="18">
                <div class="detail-show">
                    <el-tabs type="border-card">
                        <el-tab-pane label="介绍">
                            <div class="detail-intro">

                                适用人群

                                1.零基础学员
                                2.前端爱好者
                                课程概述
                                课程大纲：
                                1.HTML常用标签/语义化便签/多媒体标签等企业常用HTML相关知识；
                                2.CSS常见选择器/2D/3D/动画/响应式布局等CSS相关知识；
                                3.以上两部分内容完成之后会带着大家高仿一个企业网站以及做一个响应式网站(同时适配电脑/手机/平板电脑)；
                                4.JS基础语法， 涵盖所有JS基础语法，内置对象，DOM，BOM操作以及各种常见JS特效实现；
                                5.JS面向对象涵盖面向对象三大特性在JS中的应用和常见设计模式排序算法讲解；
                                6.jQuery、jQueryUI、jQuerymobile、jQuery实现原理、jQuery实战
                                7.Aajx、web存储（cookie/session/storage/三方框架）等、Ajax实战
                                8.各种流行框架（bootstrap、AngularJS、VueJS、ReactJS、组件化、模块化）等
                                9.Web工作流框架Gulp、Bower、Webpack等
                                10.Nodejs、React Native跨平台开发(同时实现Android/iOS)
                                通过1:1:1完成大型企业项目途牛App的开发， 带大家打通前后端。
                                **********************************************************************
                                更多内容可以加入“江哥带你玩转H5”群，请戳→289964053（备注：网易云课堂）
                                个人博客地址: http://www.jianshu.com/p/641506cd8153
                                **********************************************************************
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="目录">
                            <div>
                                <h3>目录</h3>
                                <div class="chapterList" v-if="list.length">
                                    <div v-for="(l, k) in list" :key="k">
                                        <div class="chapterHead" v-if="l.lesson_title">
                                            <span class="chapterTitle">章节{{parseInt(l.lesson_lid)+1}}:</span>
                                            <span class="chapterName">{{l.lesson_title}}</span>
                                        </div>
                                        <div class="section" v-for="v in l.lesson" :key="v.lesson_id" @click="enterVideo(v)">
                                            <span class="lesson">课时{{parseInt(v.lesson_lid)+1}}</span>
                                            <span class="lessonName" >{{v.lesson_title}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="blank-card" v-if="!list.length">
                                    <span>还没有发布任何课时~</span>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="笔记">
                            <div class="blank-card">
                                <span>笔记功能暂未开放~</span>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="讨论区">
                            <div class="blank-card">
                                <span>讨论区即将开放</span>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
            <el-col :span="6">
                <el-card class="detail-card">
                    <div slot="header" class="clearfix">
                        <span>相似课程推荐</span>
                        <!--<el-button style="float: right;" type="text">换一批</el-button>-->
                    </div>
                    <div v-for="(item, i) in recInfo" :key="i" class="text item rec">
                        <img @click="jumpTo(item.course_id)" :src="item.course_cover_address + '?imageView2/2/w/243/h/135/format/jpg/q/100'" alt="">
                        <span class="rec-title" @click="jumpTo(item.course_id)">{{item.course_title}}</span>
                        <span class="rec-author">{{item.course_author}}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog
                title="提示"
                :visible.sync="cartShowed"
                width="30%"
                :before-close="handleClose">
            <span>您还未购买课程，是否加入购物车？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cartShowed = false">取 消</el-button>
                <el-button type="primary" @click="handleAttendBtn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style>
    /*控制星级*/
    .el-rate-inline{
        display:inline-block;
        line-height:20px;
    }
    /*以下是目录的css控制*/

    .chapterList{
        border-top:1px solid #ddd;
        text-align:left;
        position:relative;
        padding-bottom:1em;
    }
    .chapterList .chapterHead{
        height: 35px;
        color: #999;
        font-family: '微软雅黑';
        font-size: 14px;
        font-weight: bolder;
        padding: 0 20px;
        line-height: 35px;
        cursor: default;
        background: #fafafa;
    }
    .chapterList .chapterTitle{
        width: 62px;
        height:35px;
        text-align:left;
    }
    .chapterList .chapterName{
        width:470px;
        padding-left:6px;
    }
    .chapterList .section{
        height:40px;
        line-height:40px;
        padding:0 20px;
        cursor:pointer;
        transition: background-color 0.15s ease-out;
        font-size: 16px;
    }
    .chapterList .section:hover{
        background-color:#ffd2d2;
    }
    .section .lesson{
        width:62px;
        color:#999;
        text-align:left;
        font-size:14px;
    }
    .section .lessonName{
        width:450px;
        padding-left:6px;
        color:#333;
        height:36px;
    }
    /*以上是目录的css控制*/
    .detail-show{
        background:#fff;
        box-shadow:5px 5px 3px #ccc;
        margin:10px 0;
    }
    .bread{
        margin:20px 0;
    }
    .detail-container{
        width:1200px;
        margin:0 auto;
    }
    .detail-main{
        background:#fff;
        box-shadow:5px 5px 3px #ccc;
        padding:20px;
        margin:10px 0;
    }
    .detail-card{
        margin: 10px 0;
        box-shadow:5px 5px 3px #ccc;
    }
    .main-img{
        box-shadow:2px 2px 1px #ccc;
        height:250px;
        width:450px;
        display: block;
    }
    .main-detail{
        position:relative;
    }
    .main-title{
        font-size:32px;
        color:#333;
        margin:0 0 5px 0;
    }
    .main-price{
        color:#FF4949;
        font-size:38px;
        margin:15px 5px 10px 5px;
    }
    .main-adv{
        padding:4px 10px;
        margin:15px 2px 5px 2px;
        background:#FF4949;
        color:#fff;
        display:inline-block;
        height:22px;
        line-height:22px;
        border-radius:15px;
        font-size: 14px;
    }
    .main-btn{
        position:absolute;
        left:5px;
        bottom: -80px;
    }
    .main-btn button{
        margin-right:10px;
    }
    .main-share{
        position:absolute;
        right:5px;
        top:5px;
    }
    .main-info{
        margin:10px 0;
    }
    .detail-intro{
        padding:15px;
    }
    .blank-card{
        text-align: center;
        padding: 80px 0;
    }
    .blank-card span{
        display: block;
        color: #CCCCCC;
    }
    .activity-price{
        color: #CCCCCC;
        font-size: 20px;
        text-decoration: line-through;
    }
</style>
<script>
  import { mapGetters } from 'vuex'
  import { genNonDuplicateID } from '@/utils/index'
  import { verifyTokenExpiration, getCookie, setCookie } from '@/utils/auth'
  export default{
    mounted() {
      this.$store.dispatch('loadLessonDetail', { request_pattern: { 'cid': this.$route.params.course_id }}).then(() => {
        let headFlag = false
        this.flag = true
        const detail = this.lessonDetail.detail
        this.score = parseFloat(detail.course_score)
        // 目录生成
        const lesson_list = this.lessonDetail.lesson_list
        headFlag = false
        for (const item of lesson_list) {
          if (item.lesson_is_chapter_head === '1') {
            headFlag = true
            break
          }
        }
        const list = []
        console.log(headFlag)
        if (headFlag) {
          for (const i of lesson_list) {
            if (i.lesson_is_chapter_head === '1') {
              const chapter = i
              i.lesson = []
              for (const item of lesson_list) {
                if (item.lesson_pid === i.lesson_id) {
                  chapter.lesson.push(item)
                }
              }
              list.push(chapter)
            }
          }
        } else {
          const chapter = { lesson: lesson_list, lesson_title: false }
          list.push(chapter)
        }
        this.list = list
        console.log(list)
      })
      this.loadRec()
    },
    data() {
      return {
        flag: false,
        list: {},
        score: 0,
        recInfo: [],
        cartShowed: false
      }
    },
    methods: {
      handleAttendBtn() {
        this.addToCart()
        this.cartShowed = false
      },
      handleClose() {
        this.cartShowed = false
      },
      loadRec() {
        const courseId = this.$route.params.course_id
        if (courseId) {
          this.$store.dispatch('getRecCourses', { courseId }).then(res => {
            this.recInfo = res.data
          })
        }
      },
      initCart() {
        if (this.auth_token !== 'undefined' && this.auth_token !== null) {
          // 有token记录，用户登录过
          if (verifyTokenExpiration(this.auth_token)) {
            this.$store.dispatch('loadCart', { 'cart_userid': this.auth_id }).then(() => {

            })
          }
        }
      },
      enterVideo(obj) {
        window.location.href = 'http://' + window.location.host + '/#/play/?' + 'course_id=' + obj.lesson_course_id + '&' + 'lesson_id=' + obj.lesson_id
      },
      /**
       * 加入购物车方法：
       * 1. 首先验证用户是否登录
       *    1. 如果登录了，去后台根据cart_userid获取购物车信息
       *    2. 没有登录，直接判断cookie中是否存在购物车信息，存在添加，不存在新建，同时后台插入一份
       *
       */
      addToCart() {
        if (this.auth_token !== 'undefined' && this.auth_token !== null) {
          // 有token记录，用户登录过
          if (verifyTokenExpiration(this.auth_token)) {
            // token未过期，直接发送给后台，加入购物车
            const cart_ref = {
              'cart_userid': this.auth_id
            }
            this.$store.dispatch('loadCart', cart_ref).then(() => {
              // 获得购物车信息，如果cartId为-1说明没有购物车信息，需要下次创建；否则说明已经有购物车条目了。
              const cart_id = this.cartInfo.cartId === -1 ? genNonDuplicateID() : this.cartInfo.cartId
              const cartInfo = {
                'cart_userid': this.auth_id,
                cart_id,
                'cart_is_existed': this.cartInfo.cartId === -1 ? 0 : 1,
                'cart_detail': []
              }
              // 判断购物车是否有这个商品
              if (!this.courseIsExisted(this.cartInfo.cartInfo)) {
                cartInfo.cart_detail.push({ cart_course_id: this.lessonDetail.detail.course_id, cart_parent_id: cart_id })
                // 没有就去添加
                this.$store.dispatch('addToCart', cartInfo)
              }
            })
          } else {
            // token已过期，需要重新获取token才可以加入购物车，需要调用登陆模块
            this.$root.$emit('showLogin')
          }
        } else {
          // 没有token，没有用户登陆过，直接生成cookie购物车，本地购物车
          let cookieCart = getCookie('cart')
          console.log(cookieCart)
          // cookie中没有购物车记录，则直接创建新cookiecart
          if (cookieCart === '') {
            cookieCart = {
              cart_id: genNonDuplicateID(),
              cart_detail: []
            }
          } else {
            cookieCart = JSON.parse(cookieCart)
          }
          // 如果购物车中有课程，就去判断课程是否已经存在
          if (cookieCart.cart_detail.length !== 0) {
            let cart_detail = []
            cart_detail = cookieCart.cart_detail
            // 筛查课程是否存在，不存在才插入， 这里的逻辑要改，复杂化了
            if (!this.courseIsExisted(cart_detail)) {
              cookieCart.cart_detail.push({ cart_course_id: this.lessonDetail.detail.course_id, cart_parent_id: cookieCart.cart_id, cart_is_cookie: 1 })
            }
          } else {
            // 没有课程就直接加
            cookieCart.cart_detail.push({ cart_course_id: this.lessonDetail.detail.course_id, cart_parent_id: cookieCart.cart_id, cart_is_cookie: 1 })
          }
          setCookie('cart', JSON.stringify(cookieCart), 30)
          console.log(cookieCart)
          this.$store.dispatch('addToCart', cookieCart)
        }
      },
      /**
       * 筛查课程是否存在于购物车中
       * @param cart
       * @param course
       * @returns {boolean}
       */
      courseIsExisted(cart) {
        for (const c of cart) {
          if (c.cart_course_id === this.lessonDetail.detail.course_id) {
            this.$notify.error({
              title: '错误',
              message: '购物车中已存在该商品'
            })
            return true
          }
        }
        return false
      },
      jumpTo(courseId) {
        window.open('http://' + window.location.host + '/#/detail/' + courseId)
      },
      verifyCourse() {
        this.$store.dispatch('getOrderCourses', { userId: this.auth_id }).then(res => {
          if (res.data.length > 0) {
            if (res.data.indexOf(this.$route.params.course_id) > -1) {
              for (const v of this.list[0].lesson) {
                if (v['lesson_is_chapter_head'] === 0) this.enterVideo(v)
                break
              }
              this.$message('还没有发布任何课时哦')
              return
            }
          }
          // 没有购买就直接提醒是否加入购物车
          this.cartShowed = true
        })
      }
    },
    computed: {
      auth_id() {
        return this.$store.getters.auth_id
      },
      ...mapGetters(['lessonDetail', 'cartInfo', 'auth_token', 'auth_id'])
    }
  }
</script>