<template>
    <div class="block" v-if="ordersCount">
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page="ordersCurrentPage"
                :page-size="10"
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
          this.currentPage = val
          const data = { 'user_id': this.auth_id, 'p': val }
          if (this.status !== -1) data.status = this.status
          this.$store.dispatch('getOrders', data)
        })
      }
    },
    computed: {
      ...mapGetters(['auth_id', 'ordersCount', 'ordersCurrentPage'])
    }
  }
</script>