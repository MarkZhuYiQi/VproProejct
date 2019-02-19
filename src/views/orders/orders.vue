<template>
    <div class="orders_container">
        <div class="orders_white_container">
            <span>我的订单</span>
        </div>
        <el-tabs v-model="orderLabelShow" @tab-click="handleClick">
            <el-tab-pane label="全部订单" name="first" v-loading="loading">
                <orders-tab :ordersHistory="ordersHistory"></orders-tab>
                <pagination v-if="ordersCount"></pagination>
            </el-tab-pane>
            <el-tab-pane label="待支付" name="second" v-loading="loading">
                <orders-tab :ordersHistory="ordersHistory"></orders-tab>
                <pagination v-if="ordersCount" :status="0"></pagination>
            </el-tab-pane>
            <el-tab-pane label="交易成功" name="third" v-loading="loading">
                <orders-tab :ordersHistory="ordersHistory"></orders-tab>
                <pagination v-if="ordersCount" :status="1"></pagination>
            </el-tab-pane>
            <el-tab-pane label="交易关闭" name="fourth" v-loading="loading">
                <orders-tab :ordersHistory="ordersHistory"></orders-tab>
                <pagination v-if="ordersCount" :status="2"></pagination>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style>
    .orders_container{

    }
    .el-tabs__nav-scroll{
        width:1200px;
        margin:20px auto 0;
    }
    .el-tabs__header{
        background-color:#fff;
    }
    .orders_white_container{
        background:#fff;
    }
    .orders_white_container span{
        display: block;
        width:1200px;
        margin:0 auto;
        padding:30px 0 5px 0;
    }
    .orders_container .el-tabs__content{
        width:1200px;
        margin:0 auto;
    }

</style>
<script>
  import { mapGetters } from 'vuex'
  import ordersTab from './components/ordersTab.vue'
  import pagination from './components/pagination.vue'
  export default {
    mounted() {
      this.loadOrders()
    },
    data: () => {
      return {
        orderLabelShow: 'first',
        loading: false
      }
    },
    components: {
      ordersTab,
      pagination
    },
    methods: {
      handleClick(tab, event) {
        if (tab.name === 'first') {
          this.loadOrders()
        } else if (tab.name === 'second') {
          this.loadUnpaidOrders()
        } else if (tab.name === 'third') {
          this.loadSuccessOrders()
        } else if (tab.name === 'fourth') {
          this.loadErrorOrders()
        }
      },
      loadOrders() {
        this.loading = true
        this.$store.dispatch('getOrders', { 'user_id': this.authId }).then(res => {
          this.loading = false
        })
      },
      loadUnpaidOrders() {
        this.loading = true
        this.$store.dispatch('getOrders', { 'user_id': this.authId, 'status': 0 }).then(res => {
          this.loading = false
        })
      },
      loadSuccessOrders() {
        this.loading = true
        this.$store.dispatch('getOrders', { 'user_id': this.authId, 'status': 1 }).then(res => {
          this.loading = false
        })
      },
      loadErrorOrders() {
        this.loading = true
        this.$store.dispatch('getOrders', { 'user_id': this.authId, 'status': 2 }).then(res => {
          this.loading = false
        })
      }
    },
    computed: {
      ...mapGetters(['ordersHistory', 'ordersCount', 'ordersCurrentPage', 'authId'])
    }
  }
</script>