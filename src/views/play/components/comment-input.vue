<template>
            <el-card>
                <el-row>
                    <el-col :span="4">
                        <div class="comment-avatar">
                            <img src="http://ozg76yopg.bkt.clouddn.com/face.jpg?imageView2/1/w/50/h/50/format/jpg/interlace/1/q/75|imageslim" alt="">
                            <div class="avatar-name">
                                <span>{{userName}}</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="20">
                        <el-form :model="commentInput" status-icon :rules="commentRules" ref="commentInput">
                            <el-form-item prop="commentContentInput">
                                <el-input
                                        type="textarea"
                                        :rows="4"
                                        placeholder="欢迎对课程进行点评，具备参考价值的评论对其他人更有帮助"
                                        v-model="commentInput.commentContentInput" :disabled="disabled">
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <div style="text-align: right">
                    <el-button class="postComment" type="danger" @click="postComment">提交评论</el-button>
                </div>
            </el-card>
</template>
<style>
    .comment-avatar{
        text-align: center;
    }
    .comment-avatar img{
        border-radius: 25px;
    }
    .avatar-name{
        margin-top: 10px;
        overflow:hidden;
    }
    .post-comment{
        margin: 10px 0 0 0;
        width: 20%
    }
</style>
<script>
  import { mapGetters } from 'vuex'
  export default{
    mounted() {
      this.userName = this.auth_appid
      if (Object.keys(this.$route.query).length > 0) {
        [this.course_id, this.lesson_id] = [this.$route.query.course_id, this.$route.query.lesson_id]
      }
    },
    data() {
      const checkComment = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入评论内容'))
        } else {
          callback()
        }
      }
      return {
        commentInput: {
          commentContentInput: ''
        },
        disabled: false,
        course_id: '',
        lesson_id: '',
        commentRules: {
          commentContentInput: [
            { validator: checkComment, trigger: 'blur' }
          ]
        },
        userName: ''
      }
    },
    methods: {
      postComment() {
        this.$refs['commentInput'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('setComment', { 'comment_course_id': this.course_id, 'comment_lesson_id': this.lesson_id, 'comment_reply_id': 0, 'comment_reply_main_id': 0, 'comment_content': this.commentInput.commentContentInput }).then(res => {
              if (res.data >= 1) {
                this.$message({
                  message: '评论发送成功',
                  type: 'success'
                })
              } else {
                this.$message.error('评论发送失败')
              }
            })
            this.$refs['commentInput'].resetFields()
          }
        })
      }
    },
    computed: {
      ...mapGetters(['auth_appid'])
    }
  }
</script>