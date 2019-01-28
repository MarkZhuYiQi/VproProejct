<template>
    <div class="card-container" v-if="flag">
        <div v-for="(item, i) in index" :key="i" >
            <Guide :title="item.nav_text" :child="item.children" :nav_nickname="item.nav_nickname" :nav_url=" item.nav_url" :level="item.level"></Guide>
            <Card :content="item.indexCourses"></Card>
        </div>
    </div>
</template>
<style>
</style>
<script>
  import Guide from './guide.vue'
  import Card from './card.vue'
  import { mapGetters } from 'vuex'
  export default{
    mounted() {
      this.loadIndex(this.$route.params['nav'])
    },
    data() {
      return {
        currentDate: new Date(),
        index: {},
        // 赋值标记，没有就不显示下面的课程
        flag: false
      }
    },
    methods: {
      loadIndex(nav) {
        this.$store.dispatch('loadIndex', { request_pattern: { nav }}).then(() => {
          const navArr = []
          const { nav, courses } = this.indexCourseList
          for (const n of nav.children) {
            // 如果没有子导航元素了，就是底级元素，不能再点击进入了。
            n['level'] = n.hasOwnProperty('children')
            n['indexCourses'] = courses[n['nav_id']]
            navArr.push(n)
          }
          this.index = navArr
          this.flag = true
        })
      }
    },
    watch: {
      $route: {
        deep: true,
        handler: function(to, from) {
          console.log(to)
          location.reload()
        }
      }
    },
    components: {
      Guide,
      Card
    },
    computed: {
      ...mapGetters(['indexCourseList'])
    }
  }
</script>
