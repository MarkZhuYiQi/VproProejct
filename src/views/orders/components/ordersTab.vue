<template>
    <div>
        <div v-if="Object.keys(ordersHistory).length" v-for="(items, i) in ordersHistory" :key="i">
            <el-card class="orders-card">
                <div slot="header">
                    <el-row :gutter="20">
                        <el-col :span="8">订单编号：{{i}}</el-col>
                        <!--<el-col :span="8">创建时间：{{(new Date(parseInt(items.order_time + '000')).format('yyyy-MM-dd hh:mm:ss'))}}</el-col>-->
                        <el-col :span="8">创建时间：{{items.order_time}}</el-col>
                        <el-col :span="8"></el-col>
                    </el-row>
                </div>
                <div class="orders-lab">
                    <el-row>
                        <el-col :span="14">
                            <el-row v-for="(v, k) in items.sub_order" :key="k" class="orders-history-lab">
                                <el-col :span="6">
                                    <img class="orders-history-img" :src="v.course_cover_address" alt="" />
                                </el-col>
                                <!--<el-col :span="8"><router-link :to="'detail/'+v.course_id" class="course-link">{{v.course_title}}</router-link></el-col>-->
                                <el-col :span="8"><span @click="jumpTo(v.course_id)">{{v.course_title}}</span></el-col>
                                <el-col :span="5">{{v.course_author}}</el-col>
                                <el-col :span="5">{{v.course_price}}</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="10">
                            <el-row class="orders-history-lab">
                                <el-col :span="8">
                                    <!--<span class="origin-price">{{items.order_discount!=='0'?(parseFloat(items.order_discount)+parseFloat(items.order_price)).toString().currency():''}}</span>-->
                                    <span class="origin-price">{{items.course_price}}</span>
                                    <span class="order-price">{{items.order_price}}</span>
                                </el-col>
                                <el-col :span="8" v-if="items.order_payment==0">等待支付</el-col>
                                <el-col :span="8" v-if="items.order_payment==1">交易成功</el-col>
                                <el-col :span="8" v-if="items.order_payment==2">交易失败</el-col>
                                <el-col :span="8" v-if="items.order_payment==0"><el-button @click="pay(i)">立即支付</el-button></el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </div>
        <div v-if="!Object.keys(ordersHistory).length" style="text-align: center; background-color: #FFFFFF; margin: 0 0 15px 0 ">
            <span style="display: block; padding: 80px; color: #aaaaaa">空空如也~</span>
        </div>
    </div>
</template>
<style>
    .orders-card{
        max-height:none;
        margin: 0 0 12px 0;
    }
    .orders-history-img{
        width:120px;
        height:68px;
    }
    .origin-price{
        text-decoration: line-through;
        color:#ccc;
    }
    .course-link{
        color:#666;
        text-decoration: none;
    }
    .orders-lab{

    }
    .orders-history-lab{
        margin:10px 0;
    }
</style>
<script>
  export default {
    mounted() {},
    props: {
      ordersHistory: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      pay(orderId) {
        const w = window.open()
        this.$store.dispatch('pay', { orderId }).then(res => {
          w.location.href = res.data.pay_url
        })
      },
      jumpTo(courseId) {
        window.open('http://' + window.location.host + '/#/detail/' + courseId)
      }
    }
  }
</script>