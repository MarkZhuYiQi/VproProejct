<template>
  <div>
    <div style="text-align: center" v-if="!flag && Object.keys(this.indexCourses).length === 0 && Object.keys(this.indexNavbar).length === 0">
      <img
        src="/static/loading-bubbles.svg"
        alt=""
        style="width: 50px; height: 50px; margin: 20px auto;">
    </div>
    <div class="card-container">
      <div v-for="(item, i) in index" :key="i">
        <Guide :title="item.navText" :child="item.subNav" :navNickname="item.navNickname" :navId="item.navId" :navUrl=" item.navUrl" :level="item.level"></Guide>
        <div style="text-align: center" v-if="Object.keys(item.indexCourses).length === 0 && !flag">
          <img
            src="/static/loading-bubbles.svg"
            alt=""
            style="width: 50px; height: 50px; margin: 20px auto;">
        </div>
        <Card :content="item.indexCourses" v-if="flag"></Card>
      </div>
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
      // this.loadNavbar(this.$route.params['nav'])
      // this.loadCourses(this.$route.params['nav'])
      this.loadIndex()
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
      loadNavbar(nav) {
        return new Promise((resolve, reject) => {
          this.$store.dispatch('loadNavbar', nav).then(nav => {
            if (!this.flag) {
              const navArr = []
              for (const n of nav.subNav) {
                n['level'] = n.hasOwnProperty('subNav')
                n['indexCourses'] = []
                navArr.push(n)
              }
              if (Object.keys(this.index).length === 0) this.index = navArr
            }
            resolve(nav)
          }).catch(err => {
            reject(err)
          })
        })
      },
      loadCourses(nav) {
        return new Promise((resolve, reject) => {
          this.$store.dispatch('loadCourses', nav).then(courses => {
            resolve(courses)
          }).catch(err => {
            reject(err)
          })
        })
      },
      loadIndex() {
        const nav = this.$route.params['nav']
        const navP = this.loadNavbar(nav)
        const coursesP = this.loadCourses(nav)
        Promise.all([navP, coursesP]).then(res => {
          const [navbar, courses] = res
          if (Object.keys(navbar).length > 0 && Object.keys(courses).length > 0) {
            const navArr = []
            for (const n of navbar.subNav) {
              n['level'] = n.hasOwnProperty('subNav')
              n['indexCourses'] = courses.hasOwnProperty(n['navId']) ? courses[n['navId']] : []
              navArr.push(n)
            }
            this.index = navArr
            this.flag = true
            console.log(this.index)
          }
        })
      }
      // loadIndex(nav) {
      //   this.$store.dispatch('loadIndex', nav).then(() => {
      //     const navArr = []
      //     const { nav, courses } = this.indexCourseList
      //     for (const n of nav.subNav) {
      //       // 如果没有子导航元素了，就是底级元素，不能再点击进入了。
      //       n['level'] = n.hasOwnProperty('subNav')
      //       n['indexCourses'] = courses[n['navId']]
      //       navArr.push(n)
      //     }
      //     this.index = navArr
      //     this.flag = true
      //   })
      // }
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
      ...mapGetters(['indexCourseList', 'indexCourses', 'indexNavbar'])
    }
  }
</script>
