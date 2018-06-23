<template>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="categoryCrumb">
        <el-breadcrumb-item v-for="(item, i) in categoryCrumb" v-if="categoryCrumb.length" :key="i">{{item.nav_text}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<style>
    .categoryCrumb{
        padding: 0 0 0 10px;
    }
</style>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['categoryCrumb'])
    }
  }
</script>