<template>
    <div class="cart-container">
        <el-steps :active="step" simple finish-status="success" style="margin-top: 20px">
            <el-step title="加入购物车"></el-step>
            <el-step title="确认订单"></el-step>
            <el-step title="完成支付"></el-step>
        </el-steps>

        <div class="order_container" v-if="payment.payUrl && step === 1">
            <div id="btn" style="display: none"></div>
            <el-row :gutter="20">
                <el-col :span="24">
                    <span class="courseLabel">订购人信息</span>
                </el-col>
                <el-col :span="24">

                </el-col>
            </el-row>
            <hr class="bottom-line">
            <el-row :gutter="20">
                <el-col :span="24">
                    <span class="courseLabel">订购清单</span>
                </el-col>
            </el-row>
            <hr class="bottom-line" />
            <div class="courseDetail" v-for="item in orderInfo">
                <el-row :gutter="20">
                    <el-col :span="7">
                        <div>
                            <img :src="item.courseCoverAddress" alt="" class="courseImage">
                        </div>
                    </el-col>
                    <el-col :span="9"><span>{{item.courseTitle}}</span></el-col>
                    <el-col :span="4"><span class="courseCost">{{item.coursePrice}}</span></el-col>
                    <el-col :span="4">授课中</el-col>
                </el-row>
                <hr class="bottom-line" />
            </div>
            <el-tabs @tab-click="handleClick" class="discount" v-model="initLabel">
                <el-tab-pane label="优惠券" name="vaild">
                    <div style="margin:0 8px;"  v-if="coupons.length">
                        <el-row :gutter="20">
                            <el-col :span="6" v-for="(item, o) in coupons" :key="o">
                                <el-card :body-style="{ padding: '0px'}">
                                    <div @click="selectDiscount(o, item.coupon_is_matched)" :class="{'discount_area':true, 'discountSelected':o===discountSelected, 'discount_area_not_matched':!item.coupon_is_matched}">
                                        <div :class="{'discount_detail':true,  'discount_detail_not_matched':!item.coupon_is_matched}">
                                            <span class="discount_large_font discount_flag">￥</span>
                                            <span class="discount_large_font discount_money">{{item.coupon_discount}}</span>
                                            <span>满{{item.coupon_limit}}</span>
                                            <span class="discount_vaild_date">有效期至{{item.coupon_end_date}}</span>
                                        </div>
                                        <div class="discount_type">
                                            <span>[全品类]</span>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-if="!coupons.length">
                        <span class="discount_empty">
                            空空如也~
                        </span>
                    </div>
                    <hr class="bottom-line">
                </el-tab-pane>
                <el-tab-pane label="过期" name="overdue">
                    <div>
                        <span class="discount_empty">
                            空空如也~
                        </span>
                    </div>
                    <hr class="bottom-line">
                </el-tab-pane>
            </el-tabs>
            <div>
                <div class="price_label">
                    <ul class="coursePrice">
                        <li><span class="summary_label">商品价格总计：</span><span class="summary_value">{{coursePrice}}</span></li>
                        <li><span class="summary_label">返现：</span><span class="summary_value">{{orderPrice.orderMoneyReturn.toFixed(2)}}</span></li>
                        <li><span class="summary_label">优惠：</span><span class="summary_value">{{orderPrice.orderCouponDiscount.toFixed(2)}}</span></li>
                        <li class="confirm-container"><span class="summary_label confirm">应付总额：</span><span class="confirm summary_value confirm_price">{{summaryPrice}}</span></li>
                    </ul>
                </div>
                <div class="order_place">
                    <el-button type="danger" :loading="btnStatus" class="order_button" @click="putOrder">提交订单</el-button>
                </div>
                <div style="clear:both;float:none;"></div>

            </div>
        </div>
        <div class="order_container" v-if="step === 2">
            <div>
                <span style="display: block; padding: 20px 40px; font-size: 22px; font-weight: bold">正在支付中，稍后将在订单信息中通知支付结果</span>
            </div>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>订单信息</span>
                    <el-button style="float: right; padding: 3px 0" type="text">刷新进度</el-button>
                </div>
                <div v-for="(value, key) in orderProgress" :key="key" class="text item">
                    <span v-if="key !== 'pay_url'">{{key + ' : ' + value }}</span>
                    <span v-else>{{key + ' : '}}<el-button @click="openwin(value)" type="text">付款链接</el-button></span>
                </div>
            </el-card>
        </div>
        <el-dialog
                title="出错啦"
                :visible.sync="warningDialog"
                width="25%"
                center
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false"
        >
            <span class="dialog_content"><i class="el-icon-warning dialog_flag"></i>订单超时或信息有误，请检查信息返回购物车重新下单</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="backToCart()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style>
    ul{
        list-style: none;
    }
    .order_container{
        background-color: #ffffff;
        box-shadow: 2px 2px 2px #cccccc;
        padding:10px;
    }
    .courseLabel{
        margin:10px 20px 10px;
        font-weight:bold;
        display: block;
    }
    .courseDetail{
        margin:10px 0;
        color:#666;
    }
    .bottom-line{
        width:97%;
        border:1px solid #efefef;
        margin:0 auto;
    }
    .courseImage{
        display:block;
        width:50%;
        margin:0 auto 10px;
    }
    .courseCost{
        font-size:16px;
        color: #FF4949;
        font-weight:bold;
    }
    .price_label{
        display:inline-block;
        height:140px;
        width:100%;
        float:right;
    }
    .coursePrice{
        text-align:right;
    }
    .coursePrice span{
        display: inline-block;
    }
    .summary_label{
        width:200px;
        text-align: left;
        color:#666;
    }
    .summary_value{
        text-align:left;
        width:150px;
        color:#666;
    }
    .discount{
        margin:20px;
    }
    .discount_empty{
        display:block;
        text-align:center;
        margin:10px auto;
        color:#ccc;
    }
    .discount_area{
        cursor:pointer;
        border:2px solid transparent;
    }
    .discount_area_not_matched{
        cursor: not-allowed;
    }
    .discount_detail{
        background-color:#ff7777;
        color:#ffffff;
        padding:15px;
        font-size:15px;
    }
    .discount_vaild_date{
        color:#FFE6E6;
    }
    .discount_detail_not_matched{
        background-color:#cccccc;
        color:#ffffff;
    }
    .discount_large_font{
        font-size:26px;
    }
    .discount_type{
        padding:10px 15px;
        color:#ff7777;
    }
    .discountSelected{
        border:2px solid #ff3333;
    }
    .confirm-container{
        background:#efefef;
        padding:10px 20px 10px;
        margin:10px 0;
    }
    .confirm{
        height:1.5em;
        line-height:1.5em;
        color:#666;
    }
    .confirm_price{
        font-size:30px;
        font-weight:bold;
        color:#FF4949;
    }
    .order_place{
        float:right;
        margin:10px 90px 10px;
    }
    .dialog_content{
        display:block;
        font-size:16px;
        color:#666;
        text-align:center;
    }
    .dialog_flag{
        display:block;
        font-size:40px;
        line-height:40px;
        color:#FF4949;
        margin:10px auto;
        text-align:center;
    }
</style>
<script>
  import { mapGetters } from 'vuex'
  import { checkLocalData, getLocalData } from '@/utils/auth'
  import { deepCopy } from '@/utils/index'
  export default {
    created() {
      if (this.orderInfo.length !== 0) {
        const cartIds = checkLocalData('cartIds')
        if (cartIds) {
          this.$store.dispatch('checkCourses', { orderCourseIds: cartIds })
        } else {
          console.log('购物车过期或为空')
        }
      } else {
        this.$router.push({ path: '/cart' })
      }
    },
    mounted() {
    },
    data: () => {
      return {
        initLabel: '',
        discountSelected: -1,
        orderPrice: {
          orderCouponDiscount: 0,
          orderMoneyReturn: 0
        },
        warningDialog: false,
        step: 1,
        coupons: [],
        // 原始课程总价
        coursePrice: 0,
        orderProgress: [],
        btnStatus: false
      }
    },
    methods: {
      handleClick(tab, event) {
        if (tab.$el.id === 'pane-vaild') {
          this.$store.dispatch('getCoupon', { user_id: this.authId }).then(() => {

          })
        }
      },
      selectDiscount(o, is_matched) {
        if (is_matched) {
          if (this.discountSelected < 0) {
            this.discountSelected = o
            this.orderPrice.orderCouponDiscount = this.couponInfo[o]['coupon_discount']
          } else if (o >= 0 && this.discountSelected >= 0 && o !== this.discountSelected) {
            this.discountSelected = o
            this.orderPrice.orderCouponDiscount = this.couponInfo[o]['coupon_discount']
          } else {
            this.discountSelected = -1
            this.orderPrice.orderCouponDiscount = 0
          }
        }
      },
      /**
       * 最终下单：
       * 首先判断token是否过期
       * 判断订单是否有课程
       * 判断价格是否大于0
       *
       */
      putOrder() {
        this.btnStatus = true
        const cartIds = JSON.parse(getLocalData('cartIds'))
        if (this.authId && this.token && cartIds.length > 0) {
          const w = window.open()
          if (this.orderInfo.length > 0 && this.summaryPrice >= 0) {
            this.$store.dispatch('checkCourses', { orderCourseIds: cartIds }).then(() => {
              console.log('insert')
              const info = {
                user_id: this.authId,
                orderCourseIds: JSON.parse(getLocalData('cartIds')),
                cartParentId: this.cartInfo.cartId,
                coursePrice: this.coursePrice,
                order_coupon_discount: this.orderPrice.orderCouponDiscount,
                order_coupon_selected: this.discountSelected
              }
              this.$store.dispatch('putOrder', info).then(res => {
                this.btnStatus = false
                w.location.href = res.pay_url
                this.step = 2
                this.orderProgress = res
              })
            })
          }
        }
      },
      backToCart() {
        this.warningDialog = false
        this.$router.push({ 'path': '/cart' })
      },
      openwin(value) {
        window.open(value)
      }
    },
    watch: {
      couponInfo: {
        deep: true,
        handler: function(couponInfo, originCouponInfo) {
          if (couponInfo.length > 0) {
            this.coupons = deepCopy(this.couponInfo, [])
            const date = new Date()
            for (const i in couponInfo) {
              this.coupons[i]['coupon_is_matched'] = couponInfo[i]['coupon_limit'] <= this.coursePrice
              for (const k in couponInfo[i]) {
                if (k.indexOf('date') >= 0) {
                  date.setTime(couponInfo[i][k] * 1000)
                  // console.log(date.getYear()+1900, date.getMonth()+1, date.getDate())
                  this.coupons[i][k] = (date.getYear() + 1900) + ' 年 ' + (date.getMonth() + 1) + ' 月 ' + (date.getDate()) + ' 日 '
                }
              }
            }
          }
          console.log(this.coupons)
        }
      },
      orderInfo: function(to, from) {
        // 计算课程总价
        let price = 0
        to.map(item => {
          price += parseFloat(item.coursePrice)
        })
        this.coursePrice = price.toFixed(2)
      }
    },
    computed: {
      ...mapGetters(['cartInfo', 'orderInfo', 'authId', 'couponInfo', 'token', 'auth_appid']),
      payment() {
        return this.$store.getters.payment
      },
      // 叠加折扣，获得最终总价
      summaryPrice() {
        return parseFloat(this.coursePrice - this.orderPrice.orderCouponDiscount).toFixed(2)
      }
    }
  }
</script>
