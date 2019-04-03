<template>
    <div class="card-container">
        <coursefilter style="margin: 10px 0 0 0"></coursefilter>
        <div style="padding: 15px 10px; background-color: #ffffff; margin: 10px 0 0 0">
            <bread-crumb></bread-crumb>
        </div>
        <el-row :gutter="18" v-if="coursesList.length !== 0">
            <el-col :span="6" v-for="(item,i) in coursesList" :key="i">
                <category-card :info="item"></category-card>
            </el-col>
        </el-row>
        <el-row v-if="coursesList.length === 0">
            <el-col :span="24">
                <div style="padding: 30px 0; text-align: center; color: #CCCCCC; background-color: #FFFFFF">
                    空空如也~
                </div>
            </el-col>
        </el-row>
        <div style="margin: 10px auto; text-align: center;">
            <el-pagination
                    v-if="pagination !== -1"
                    background
                    layout="prev, pager, next"
                    :page-count="pagination"
                    :current-page="1"
                    @current-change="pageChange"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import categoryCard from './components/category-card.vue'
  import coursefilter from './components/filter.vue'
  import breadCrumb from './components/breadCrumb.vue'
  export default{
    mounted() {
      console.log(this.$route.params)
      this.navChange(this.$route.params['nav'])
    },
    data() {
      return {
        flag: false
      }
    },
    methods: {
      navChange(nav) {
        this.$store.dispatch('clearPage')
        this.$store.dispatch('clearCategories').then(() => {
          this.$store.dispatch('loadCategories', { nav })
        })
      },
      pageChange(page) {
        this.$store.dispatch('clearCategories').then(() => {
          this.$store.dispatch('loadCategories', { nav: this.$route.params['nav'], page }).then(() => {
            window.scrollTo(0, 0)
          })
        })
      }
    },
    watch: {
      categoryCrumb(to, from) {
        console.log(to, from)
        // this.navChange(to[to.length - 1].navUrl.split('/')[2])
        this.navChange(to[to.length - 1].navId)
      }
    },
    components: {
      categoryCard,
      coursefilter,
      breadCrumb
    },
    computed: {
      ...mapGetters(['coursesList', 'pagination', 'categoryCrumb'])
    }
  }
</script>
