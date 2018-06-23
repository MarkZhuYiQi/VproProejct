<template>
    <div v-if="navTree.length > 0" class="filter">
        <ul>
            <li v-for="(item, i) in navTree" :key="i" @mouseenter="subNavChange(item, i, 0)" :class="{ 'selectNav': key0===i }" @click="handleClick(0, item)">{{item.nav_text}}</li>
        </ul>
        <ul>
            <li v-for="(item, i) in subNav1" :key="i" @mouseenter="subNavChange(item, i, 1)" :class="{ 'selectNav': key1===i }" @click="handleClick(1, item)">{{item.nav_text}}</li>
        </ul>
        <ul>
            <li v-for="(item, i) in subNav2" :key="i" @mouseenter="subNavChange(item, i, 2)" :class="{ 'selectNav': key2===i }" @click="handleClick(2, item)">{{item.nav_text}}</li>
        </ul>

    </div>
</template>
<style>
    .filter{
        color: #333;
        font-size: 14px;
        background-color: #ffffff;
        padding: 5px 10px;
        height: 90px;
        /*text-align: center;*/
    }
    .filter ul li {
        display: inline-block;
        padding: 5px 10px;
        cursor: pointer;
    }
    .filter .selectNav{
        color: #FF4949;
        transition: color 0.3s;
    }
</style>
<script>
  import { mapGetters } from 'vuex'
  export default {
    mounted() {
      this.$store.dispatch('getNavTree').then(res => {
        this.subNav = res[0]['children']
        this.$store.dispatch('setCategoryCrumb', this.iterCrumb())
      })
    },
    data() {
      return {
        // 顶层 第二层 第三层指向的导航序号，用户设定高亮显示
        key0: -1,
        key1: -1,
        key2: -1,
        // 子导航数组
        subNav1: [],
        subNav2: [],
        breadCrumb: [],
        originBreadCrumb: []
      }
    },
    methods: {
      iterCrumb(res = [], navTree = this.navTree, nav = this.$route.params['nav']) {
        for (const item of navTree) {
          if (item.nav_nickname === nav) {
            res.unshift({
              nav_text: item.nav_text,
              nav_url: item.nav_url
            })
            return res
          }
          if (item.hasOwnProperty('children')) {
            res = this.iterCrumb(res, item.children)
          }
          if (res.length > 0) {
            res.unshift({
              nav_text: item.nav_text,
              nav_url: item.nav_url
            })
            return res
          }
        }
        return res
      },
      subNavChange(item, key, level) {
        if (level !== 2) {
          const resNav = 'subNav' + (level + 1)
          this[resNav] = item.children
        }
        this.breadCrumb[level] = { 'nav_text': item.nav_text, 'nav_url': item.nav_url }
        const resKey = 'key' + level
        this[resKey] = key
        if (level === 0) {
          this.key1 = -1
          this.subNav2 = []
        }
      },
      handleClick(level, item) {
        this.$router.push({ path: item.nav_url })
        this.originBreadCrumb = this.breadCrumb.slice(0, level + 1)
        this.$store.dispatch('setCategoryCrumb', this.originBreadCrumb)
      }
    },
    watch: {
      $route(to, from) {
        location.reload()
      }
    },
    computed: {
      ...mapGetters(['navTree'])
    }
  }
</script>