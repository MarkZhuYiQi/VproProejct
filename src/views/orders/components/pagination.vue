<template>
    <div class="block" v-if="ordersCount">
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page="ordersCurrentPage"
                :page-size="5"
                layout="total, prev, pager, next, jumper"
                :total="ordersCount">
        </el-pagination>
    </div>
</template>
<style>
    .block{
        text-align: center;
        margin: 10px 0;
    }
</style>
<script>
  import { mapGetters } from 'vuex'
  export default {
    props: {
      status: {
        type: Number,
        default: () => {
          return -1
        }
      }
    },
    mounted() {
    },
    data: () => {
      return {
        currentPage: 1,
        pageSize: 0,
        total: 0
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.$store.dispatch('clearOrders').then(() => {
          const orderCriteria = {
            userId: this.authId,
            orderPayment: this.status,
            pageNum: val,
            pageSize: 5
          }
          this.currentPage = val
          this.$store.dispatch('getOrders', orderCriteria)
        })
      }
    },
    computed: {
      ...mapGetters(['authId', 'ordersCount', 'ordersCurrentPage'])
    }
  }
</script>
