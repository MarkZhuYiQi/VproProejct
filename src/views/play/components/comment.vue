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
                                <span class="user-name">{{item.auth_appid}}</span>
                                <span class="time">{{item.vpro_comment_time}}</span>
                            </div>
                            <div class="clearfix"></div>
                            <div class="replys" v-if="item.parent !== undefined">
                                <div v-show="active_comments.indexOf(item.vpro_comment_id) === -1 && item.parent.length > 2" class="comment-omission">
                                    <a @click="showOmitComments(item)"> <i class="el-icon-more"></i> 显示更多 <i class="el-icon-more"></i> </a>
                                </div>
                                <!-- -------------------------------------------------------------------------------- -->
                                <el-row :gutter="20" :class="{ comment: true, replyLine: (item.parent.length !== 1) && ((item.parent.length - 1) !== k) }" v-for="(v, k) in item.parent" :key="k" v-show="k === item.parent.length - 1 || active_comments.indexOf(item.vpro_comment_id) >= 0">
                                    <el-col :span="4">
                                        <div class="comment-avatar">
                                            <img :src="cloudRoot + '/face.jpg'" alt="">
                                        </div>
                                    </el-col>
                                    <el-col :span="20">
                                        <div class="comment-summary">
                                            <span class="user-name">{{v.auth_appid}}</span>
                                            <span class="time">{{v.vpro_comment_time}}</span>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="comment-content">
                                            <span>{{v.vpro_comment_content}}</span>
                                        </div>
                                        <div class="comment-support"
                                             :courseId="v.vpro_commentCourseId"
                                             :lessonId="v.vpro_comment_lessonId"
                                             :reply_id="v.vpro_comment_reply_id"
                                             :reply_main_id="v.vpro_comment_reply_main_id"
                                             :comment_id="v.vpro_comment_id"
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
                                        <hr v-if="(item.parent.length !== 1) && ((item.parent.length - 1) !== k)">
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="comment-content">
                                <span>{{item.vpro_comment_content}}</span>
                            </div>
                            <div class="comment-support"
                                 :courseId="item.vpro_commentCourseId"
                                 :lessonId="item.vpro_comment_lessonId"
                                 :reply_id="item.vpro_comment_reply_id"
                                 :reply_main_id="item.vpro_comment_reply_main_id"
                                 :comment_id="item.vpro_comment_id"
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
  import { parseTime } from '@/utils/index'
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
        active_comments: [],
        pages: {
          currentPage: 1,
          pageSize: 10,
          total: -1
        },
        loading: false
      }
    },
    components: {
      commentsPagination
    },
    methods: {
      combineComments() {
        this.getComment().then(res => {
          if (res.comments_length > 0) {
            this.commentsTimeConvert(res.comments)
            this.getCommentSupportRate(res.comments_ids).then(res => {
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
          c.vpro_comment_time = parseTime(c.vpro_comment_time)
        }
      },
      handlePageChange(currentPage) {
        this.pages.currentPage = currentPage
      },
      agree(comment_id) {
        this.$store.dispatch('agree', { comment_id }).then(res => {
          // 给点上+1
        })
      },
      reject(comment_id) {
        this.$store.dispatch('reject', { comment_id }).then(res => {
          // 给点上+1
        })
      },
      getCommentSupportRate(comments_ids) {
        return this.$store.dispatch('getCommentSupportRate', { comments_ids })
      },
      getComment(lessonId = this.lessonId, p = this.pages.currentPage) {
        this.loading = true
        return new Promise((resolve, reject) => {
          this.$store.dispatch('getComment', { lessonId, p }).then((res) => {
            this.loading = false
            this.comments = res.data.comments
            this.pages.total = res.data.comments_length
            // resolve(res.data.comments_ids)
            resolve(res.data)
          }).catch(err => {
            reject(err)
          })
        })
      },
      addSupportRateToComments(agree_oppose) {
        // console.log(agree_oppose)
        this.comments = this.comments.map((item, i) => {
          if (item.hasOwnProperty('parent')) {
            item.parent.map(value => {
              for (const k in agree_oppose) {
                if (value.vpro_comment_id === k) {
                  [value['agree'], value['oppose']] = agree_oppose[k]
                  return value
                }
              }
            })
          }
          [item['agree'], item['oppose']] = agree_oppose[item.vpro_comment_id]
          return item
        })
      },
      showOmitComments(obj) {
        if (this.active_comments.indexOf(obj.vpro_comment_id) < 0) this.active_comments.push(obj.vpro_comment_id)
        console.log((!this.active_comments.indexOf(obj.vpro_comment_id) === -1) && obj.parent.length > 2)
      },
      replyComment(obj) {
        this.$store.dispatch('setComment', {
          commentCourseId: obj.vpro_commentCourseId,
          comment_lessonId: obj.vpro_comment_lessonId,
          comment_reply_id: obj.vpro_comment_id,
          comment_reply_main_id: obj.vpro_comment_reply_main_id === '0' ? obj.vpro_comment_id : obj.vpro_comment_reply_main_id,
          comment_content: this.reply
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
        this.$store.dispatch('getRateForbidden', { commentId: obj.vpro_comment_id }).then(res => {
          if (res >= 0) {
            this.$message.error('您已经点过这条评论了')
          } else {
            this.changeSupportRate(obj, 'agree')
          }
        })
      },
      clickOppose(obj) {
        this.$store.dispatch('getRateForbidden', { commentId: obj.vpro_comment_id }).then(res => {
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
          if (this.comments[i].hasOwnProperty('parent')) {
            const parent = this.comments[i].parent
            for (const k in parent) {
              if (parent[k].vpro_comment_id === v.vpro_comment_id) {
                parent[k][type] = parseInt(parent[k][type]) + 1
                parent.splice(k, 1, parent[k])
              }
            }
          }
          if (this.comments[i].vpro_comment_id === v.vpro_comment_id) {
            this.comments[i][type] = parseInt(this.comments[i][type]) + 1
            this.comments.splice(i, 1, this.comments[i])
          }
        }
        this.$store.dispatch('setCommentSupportRate', { type, comment_id: v.vpro_comment_id, lessonId: v.vpro_comment_lessonId }).then(res => {
          if (parseInt(res) > 0) {
            this.$store.dispatch('setRateForbidden', { commentId: v.vpro_comment_id })
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
