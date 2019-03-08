<template>
    <div class="play-container">
        <div>
            <Player v-on:lessonInfo="loadLessonInfo"></Player>
        </div>
        <el-card class="box-card">
            <div class="play-title">
                <h2>{{lessonInfo.lessonTitle}}</h2>
                <h4>{{lessonInfo.detailContent}}</h4>
            </div>
            <div>
                <span>简介</span>
            </div>
        </el-card>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                <comment-input></comment-input>
                <Comment></Comment>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <el-card>
                    <div>
                        <Rec></Rec>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style>
    .play-container{
        margin: 1%;
    }
</style>
<script>
  import { Notification } from 'element-ui'
  import Player from './components/player2.vue'
  import Comment from './components/comment.vue'
  import CommentInput from './components/comment-input.vue'
  import Rec from './components/rec.vue'
  export default {
    mounted() {
      this.$store.dispatch('checkCourseIfBought', this.$route.query.courseId).then(res => {
        if (!res) {
          Notification.error({
            title: '错误',
            message: '非法访问！'
          })
        }
        return
      })
    },
    data() {
      return {
        lessonInfo: {}
      }
    },
    methods: {
      loadCourseLesson(courseId, lessonId) {
        this.$store.dispatch('loadCourseLesson', { courseId, lessonId }).then()
      },
      loadLessonInfo(obj) {
        console.log('loadLessonInfo', obj)
        this.lessonInfo = obj
      }
    },
    components: {
      Player,
      Comment,
      CommentInput,
      Rec
    },
    computed: {}
  }
</script>
