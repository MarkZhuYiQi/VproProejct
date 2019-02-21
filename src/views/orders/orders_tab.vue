<template>
    <div>
        <div v-if="orders_detail" v-for="(items, i) in orders_detail" :key="i">
            <el-card class="orders-card">
                <div slot="header">
                    <el-row :gutter="20">
                        <el-col :span="8">订单编号：{{i}}</el-col>
                        <el-col :span="8">创建时间：{{(new Date(parseInt(items.order_time + '000')).format('yyyy-MM-dd hh:mm:ss'))}}</el-col>
                        <el-col :span="8"></el-col>
                    </el-row>
                </div>
                <div class="orders-lab">
                    <el-row>
                        <el-col :span="14">
                            <el-row v-for="(v,k) in items.sub_order" :key="k" class="orders-history-lab">
                                <el-col :span="6">
                                    <img class="orders-history-img" :src="v.courseCoverAddress" alt="" />
                                </el-col>
                                <el-col :span="8"><router-link :to="'detail/'+v.courseId" class="course-link">{{v.courseTitle}}</router-link></el-col>
                                <el-col :span="5">{{v.courseAuthor}}</el-col>
                                <el-col :span="5">{{v.coursePrice}}</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="10">
                            <el-row>
                                <el-col :span="8">
                                    <span class="origin-price">{{items.order_discount!=='0'?(parseFloat(items.order_discount)+parseFloat(items.order_price)).toString().currency():''}}</span>
                                    <span class="order-price">{{items.order_price}}</span>
                                </el-col>
                                <el-col :span="8">等待支付</el-col>
                                <el-col :span="8"><el-button>订单详情</el-button></el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </div>
    </div>
</template>
<style>
    .orders-card{
        max-height:none
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
    mounted() {
    },
    props: {
      orders_detail: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data: () => {
      return {
        msg: 'hello vue'
      }
    }
  }
</script>
