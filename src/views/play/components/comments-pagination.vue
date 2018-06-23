<template>
    <el-pagination
            :page-size="pageSize"
            :page-count="pageCount"
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentPageChange"
    >
    </el-pagination>
</template>
<style>

</style>
<script>
  export default {
    props: {
      pageSize: {
        type: Number,
        default: 0
      },
      total: {
        type: Number,
        default: 0
      }
    },
    mounted() {
      this.pageCount = Math.floor(this.total / this.pageSize)
    },
    data() {
      return {
        pageCount: 0
      }
    },
    methods: {
      handleCurrentPageChange(val) {
        this.$emit('pageChange', val)
      }
    }
  }
</script>