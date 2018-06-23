<template>
    <div class="block" v-if="total">
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="10"
                layout="total, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>
<style>

</style>
<script>
  export default {
    props: {
      page_count: {
        type: Number,
        default: () => {
          return 0
        }
      },
      current_page: {
        type: Number,
        default: () => {
          return 0
        }
      }
    },
    mounted() {
      this.total = this.page_count
      this.currentPage = this.current_page
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
        this.$store.dispatch('loadIndex',
          {
            url: '',
            key: 'orderHistory'
          }).then(() => {
          this.currentPage = val
          this.$store.dispatch('loadIndex',
            {
              url: this.APIConfig.getOrder,
              key: 'orderHistory',
              request_pattern: {
                'user_id': localStorage.getItem('auth_id'),
                'p': val
              }
            })
        })
      }
    }
  }
</script>