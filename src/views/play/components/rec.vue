<template>
    <div>
        <el-row class="rec-card" :gutter="10" v-for="(item, i) in recInfo" :key="i" v-if="recInfo.length">
            <el-col :span="10">
                <div>
                    <img :style="{ width: recSize.width + 'px', height: recSize.height + 'px' }" :src="item.course_cover_address" alt="" @click="jumpTo(item.course_id)">
                </div>
            </el-col>
            <el-col :span="14">
                <div>
                    <span class="rec-title">{{item.course_title}}</span>
                    <span class="rec-author">{{item.course_author}}</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<style>
    .rec-card{
        margin-bottom: 15px;
        cursor: pointer;
    }
    .rec-card span{
        display: block;
    }
    .rec-card .rec-title{
        transition:color 0.2s linear;
        font-size: 16px;
        margin: 0 0 10px 0;
    }
    .rec-card .rec-title:hover{
        color: #FF4949;
    }
    .rec-card .rec-author{
        font-size: 14px;
        margin: 0 0 10px 0;
    }
</style>
<script>
  export default {
    mounted() {
      this.loadRec()
      this.handleResize()
      // 添加resize的方法
      window.addEventListener('resize', this.handleResize)
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },
    data() {
      return {
        recInfo: [],
        recSize: {
          width: undefined,
          height: undefined
        }
      }
    },
    methods: {
      loadRec() {
        const courseId = this.$route.query.course_id
        if (courseId) {
          this.$store.dispatch('getRecCourses', { courseId }).then(res => {
            this.recInfo = res.data
            console.log(this.recInfo)
          })
        }
      },
      handleResize() {
        const originWidth = this.$el.getBoundingClientRect().width
        this.recSize.width = originWidth * 0.40
        this.recSize.height = this.recSize.width * 140 / 250
        console.log(this.recSize)
      },
      jumpTo(courseId) {
        window.open('http://' + window.location.host + '/#/detail/' + courseId)
        // location.reload()
      }
    }
  }
</script>