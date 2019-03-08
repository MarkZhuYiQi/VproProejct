<template>
    <el-card class="play-comment">
        <div class="comment-title">
            <span>评论</span>
            <hr>
            <div class="comment-detail" v-loading="loading">
                <div class="comment-single">
                    <el-row :gutter="20" class="comment" v-for="(item, i) in comments" :key="i" v-if="comments.length">
                        <el-col :span="4">
                            <div class="comment-avatar">
                                <img :src="cloudRoot + '/face.jpg'" alt="">
                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="comment-summary">
                                <span class="user-name">{{item.appId}}</span>
                                <span class="time">{{item.vproCommentTime}}</span>
                            </div>
                            <div class="clearfix"></div>
                            <div class="comment-content">
                              <span>{{item.vproCommentContent}}</span>
                            </div>
                            <div class="replys" v-if="item.parents !== undefined && item.parents !== null">
                                <div v-show="activeComments.indexOf(item.vproCommentId) === -1 && item.parents.length > 2" class="comment-omission">
                                    <a @click="showOmitComments(item)"> <i class="el-icon-more"></i> 显示更多 <i class="el-icon-more"></i> </a>
                                </div>
                                <!-- -------------------------------------------------------------------------------- -->
                                <el-row :gutter="20" :class="{ comment: true, replyLine: (item.parents.length !== 1) && ((item.parents.length - 1) !== k) }" v-for="(v, k) in item.parents" :key="k" v-show="k === item.parents.length - 1 || activeComments.indexOf(item.vproCommentId) >= 0">
                                    <el-col :span="4">
                                        <div class="comment-avatar">
                                            <img :src="cloudRoot + '/face.jpg'" alt="">
                                        </div>
                                    </el-col>
                                    <el-col :span="20">
                                        <div class="comment-summary">
                                            <span class="user-name">{{v.appId}}</span>
                                            <span class="time">{{v.vproCommentTime}}</span>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="comment-content">
                                            <span>{{v.vproCommentContent}}</span>
                                        </div>
                                        <div class="comment-support"
                                             :courseId="v.vproCommentCourseId"
                                             :lessonId="v.vproCommentLessonId"
                                             :reply_id="v.vproCommentReplyId"
                                             :reply_main_id="v.vproCommentReplyMainId"
                                             :comment_id="v.vproCommentId"
                                        >
                                            <a @click="clickAgree(v)"><i class="el-icon-check"></i>({{v.agree}})</a>
                                            <a @click="clickOppose(v)"><i class="el-icon-close"></i>({{v.oppose}})</a>
                                            <el-popover
                                                    placement="left-start"
                                                    width="600"
                                                    trigger="click">
                                                <div>
                                                    <el-input
                                                            type="textarea"
                                                            :rows="2"
                                                            placeholder="欢迎对课程进行点评，具备参考价值的评论对其他人更有帮助"
                                                            v-model="reply">
                                                    </el-input>
                                                    <div style="text-align: right; margin: 5px 0 0 0">
                                                        <el-button size="mini" type="danger" @click="replyComment(v)">回复评论</el-button>
                                                    </div>
                                                </div>
                                                <a slot="reference"><i class="el-icon-back"></i></a>
                                            </el-popover>
                                        </div>
                                        <hr v-if="(item.parents.length !== 1) && ((item.parents.length - 1) !== k)">
                                    </el-col>
                                </el-row>
                            </div>

                            <div class="comment-support"
                                 :courseId="item.vproCommentCourseId"
                                 :lessonId="item.vproCommentLessonId"
                                 :reply_id="item.vproCommentReplyId"
                                 :reply_main_id="item.vproCommentReplyMainId"
                                 :comment_id="item.vproCommentId"
                            >
                                <a @click="clickAgree(item)"><i class="el-icon-check"></i>({{item.agree}})</a>
                                <a @click="clickOppose(item)"><i class="el-icon-close"></i>({{item.oppose}})</a>
                                <el-popover
                                        placement="left-start"
                                        width="600"
                                        trigger="click">
                                    <div>
                                        <el-input
                                                type="textarea"
                                                :rows="2"
                                                placeholder="欢迎对课程进行点评，具备参考价值的评论对其他人更有帮助"
                                                v-model="reply">
                                        </el-input>
                                        <div style="text-align: right; margin: 5px 0 0 0">
                                            <el-button size="mini" type="danger" @click="replyComment(item)">回复评论</el-button>
                                        </div>
                                    </div>
                                    <a slot="reference"><i class="el-icon-back"></i></a>
                                </el-popover>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row v-if="!comments.length">
                        <el-col :span="24">
                            <div style="color: #cccccc; text-align: center; padding: 20px 0;">
                                <span>还未有人评论~</span>
                            </div>
                        </el-col>
                    </el-row>
                    <hr>
                </div>
                <comments-pagination
                        class="comment-pagination"
                        @pageChange="handlePageChange"
                        :pageSize="this.pages.pageSize"
                        :total="pages.total"
                        v-if="pages.total > this.pages.pageSize"></comments-pagination>
            </div>
        </div>
    </el-card>
</template>
<style>
    .play-container{
        margin: 1%;
    }
    .clearfix{
        clear: both
    }
    .comment-single{
        margin: 10px;
    }
    .comment{
        margin: 10px 0;
        padding: 10px 0;
    }
    .comment-title{

    }
    .comment-single .comment-avatar{
        text-align: center;
    }
    .comment-single .comment-avatar img{
        border-radius: 25px;
    }
    .comment-summary{
        text-align: center;
    }
    .comment-single .user-name{
        display: block;
        float:left;
        margin: 0 0 10px 0;
    }
    .comment-single .time{
        display: block;
        float: right;
        margin: 0 0 10px 0;
        color: #ccc;
        font-size: 14px;
    }
    .comment-single .comment-support{
        text-align: right;
        margin: 5px 0 0 0;
    }
    .comment-single .comment-support a{
        color: #ccc;
        font-size: 14px;
        margin: 0 5px;
        text-decoration: none;
        cursor: pointer
    }
    .comment-single .comment-support a:hover{
        color: #FF4949;
    }
    .comment-single .replys{
        background-color: #F8F8F8;
        border: 1px solid #ddd;
        padding: 0 10px 0 0;
    }
    .comment-single .replys .comment-omission {
        text-align: center;
        color: #999;
        font-size: 12px;
        padding: 10px 0;
        border: none;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
    }
    .comment-omission a{
        cursor: pointer;
        text-decoration: none;
    }
    .comment-omission a:hover{
        cursor: pointer;
        color: #FF4949;
    }
    /*.comment-single .replyLine{*/
        /*border-bottom: 1px solid #ddd;*/
    /*}*/
    .comment-single .comment-content{
        color: #666;
        font-size: 16px;

    }
    .play-comment{
        overflow: auto;
        height: 1%;
        margin: 10px 0;
    }
    .play-comment hr{
        border: none;
        margin: 10px 0;
        border-bottom: 1px #eee solid;
    }
    .el-card{
        max-height: none !important;
    }
    .comment-pagination{
        text-align: center
    }
</style>
<script>
  import commentsPagination from './comments-pagination.vue'
  import { parseTime, getCommentsId } from '@/utils/index'
  import { mapGetters } from 'vuex'
  export default{
    computed: {
      ...mapGetters(['cloudRoot'])
    },
    mounted() {
      if (Object.keys(this.$route.query).length > 0) {
        [this.courseId, this.lessonId] = [this.$route.query.courseId, this.$route.query.lessonId]
        this.combineComments()
      }
    },
    data() {
      return {
        courseId: '',
        lessonId: '',
        reply: '',
        pop_is_showed: true,
        comments: [],
        activeComments: [],
        pages: {
          currentPage: 1,
          pageSize: 10,
          total: -1
        },
        loading: false,
        rates: {}
      }
    },
    components: {
      commentsPagination
    },
    methods: {
      combineComments() {
        this.getComment().then(res => {
          console.log(res)
          if (res.total > 0) {
            this.commentsTimeConvert(res.commentList)
            this.getCommentSupportRate(getCommentsId(res.commentList)).then(res => {
              this.addSupportRateToComments(res.data)
            })
          }
        })
      },
      commentsTimeConvert(comments) {
        for (const c of comments) {
          if (c.hasOwnProperty('parent')) {
            this.commentsTimeConvert(c.parent)
          }
          c.vproCommentTime = parseTime(c.vproCommentTime)
        }
      },
      handlePageChange(currentPage) {
        this.pages.currentPage = currentPage
      },
      getCommentSupportRate(commentsId) {
        return this.$store.dispatch('getCommentSupportRate', commentsId)
      },
      getComment(lessonId = this.lessonId, p = this.pages.currentPage, s = this.pages.pageSize) {
        this.loading = true
        return new Promise((resolve, reject) => {
          this.$store.dispatch('getComment', { lessonId, p, s }).then((res) => {
            this.loading = false
            this.comments = res.data.commentList
            this.pages.total = res.data.total
            // resolve(res.data.comments_ids)
            resolve(res.data)
          }).catch(err => {
            reject(err)
          })
        })
      },
      addSupportRateToComments(rates) {
        Object.assign(this.rates, rates)
        console.log(this.rates)
        this.comments = this.comments.map((item, i) => {
          if (item.hasOwnProperty('parents') && item.parents !== null && item.parents.length > 0) {
            item.parents.map(value => {
              value['agree'] = this.rates[value.vproCommentId]['agree']
              value['oppose'] = this.rates[value.vproCommentId]['oppose']
              return value
            })
          }
          item['agree'] = rates[item.vproCommentId]['agree']
          item['oppose'] = rates[item.vproCommentId]['oppose']
          return item
        })
      },
      showOmitComments(obj) {
        if (this.activeComments.indexOf(obj.vproCommentId) < 0) this.activeComments.push(obj.vproCommentId)
        console.log((!this.activeComments.indexOf(obj.vproCommentId) === -1) && obj.parents.length > 2)
      },
      replyComment(obj) {
        this.$store.dispatch('setComment', {
          vproCommentCourseId: obj.vproCommentCourseId,
          vproCommentLessonId: obj.vproCommentLessonId,
          vproCommentReplyId: obj.vproCommentId,
          vproCommentReplyMainId: obj.vproCommentReplyMainId === '0' ? obj.vproCommentId : obj.vproCommentReplyMainId,
          vproCommentIsPublished: 1,
          vproCommentTime: Math.floor(new Date().getTime() / 1000),
          vproCommentContent: this.reply
        }).then(res => {
          this.$message({
            message: '回复成功',
            type: 'success'
          })
          this.reply = ''
        }).catch(err => {
          console.log(err)
          this.$message.error('评论提交失败！')
        })
      },
      clickAgree(obj) {
        this.$store.dispatch('getRateForbidden', { commentId: obj.vproCommentId }).then(res => {
          if (res >= 0) {
            this.$message.error('您已经点过这条评论了')
          } else {
            this.changeSupportRate(obj, 'agree')
          }
        })
      },
      clickOppose(obj) {
        this.$store.dispatch('getRateForbidden', { commentId: obj.vproCommentId }).then(res => {
          if (res >= 0) {
            this.$message.error('您已经点过这条评论了')
          } else {
            this.changeSupportRate(obj, 'oppose')
          }
        })
      },
      /**
       * 循环评论列表，根据被点击的评论，找到评论表里所有该id的评论，支持/反对+1
       * 如果有parent，也要进去找
       * @param v
       * @param type
       */
      changeSupportRate(v, type) {
        for (const i in this.comments) {
          if (this.comments[i].hasOwnProperty('parents')) {
            const parents = this.comments[i].parents
            for (const k in parents) {
              if (parents[k].vproCommentId === v.vproCommentId) {
                parents[k][type] = parseInt(parents[k][type]) + 1
                parents.splice(k, 1, parents[k])
              }
            }
          }
          if (this.comments[i].vproCommentId === v.vproCommentId) {
            this.comments[i][type] = parseInt(this.comments[i][type]) + 1
            this.comments.splice(i, 1, this.comments[i])
          }
        }
        this.$store.dispatch('setCommentSupportRate', { commentAgree: type === 'agree', commentOppose: type !== 'agree', commentId: v.vproCommentId, lessonId: v.vproCommentLessonId }).then(res => {
          console.log(res)
          if (res) {
            this.$store.dispatch('setRateForbidden', { commentId: v.vproCommentId })
          }
        })
      }
    },
    watch: {
      comments: {
        deep: true,
        handler: (to, from) => {}
      },
      'pages.currentPage'(to, from) {
        if (from !== to) {
          this.combineComments()
          window.scrollTo(0, 1250)
        }
      }
    }
  }
</script>
