<template>
    <div>
        <div class="panel">
            <div class="panel-container">
                <div class="panel-img">
                    <img :src="cloudRoot + '/face.jpg'" alt="" />
                </div>
                <div class="panel-title">
                    <span class="panel-title-name">{{this.auth_appid}}</span>
                    <span class="panel-title-greetings">，{{this.greeting}}</span>
                </div>
                <div class="panel-content">
                    <span class="panel-detail">美国女神一手拿着火炬，一手拿着书，这是告诉我们停电也要学习。</span>
                </div>
            </div>
        </div>
        <div class="content-container">
            <el-input
                    placeholder="请选择日期"
                    icon="search"
                    v-model="input"
                    :on-icon-click="handleClick">
            </el-input>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="课程" name="first">
                    <div class="cards-container">
                        <el-row :gutter="30">
                            <el-col :span="6" v-for="(item,i) in courses" :key="i">
                                <el-card :body-style="{ padding: '0px' }">
                                    <div class="image" @click="jumpTo(item.course_id)">
                                        <img :src="item.course_cover_address+'?imageView2/1/w/276/h/153/format/jpg/interlace/1/q/100'">
                                    </div>
                                    <div class="des">
                                        <span class="projectTitle" @click="jumpTo(item.course_id)">{{item.course_title}}</span>
                                        <div class="bottom clearfix">
                                            <time class="time">已学习7/24课时</time>
                                        </div>
                                    </div>
                                    <div class="course-progress">
                                        <el-progress :percentage="70"></el-progress>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="计划" name="second">计划</el-tab-pane>
                <el-tab-pane label="收藏夹" name="third">收藏夹</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<style>
    .panel{
        background-color:#333;
        height:270px;
    }
    .panel-container{
        width:1200px;
        height:270px;
        margin:0 auto;
        padding:80px 0 0 120px;
        position:relative;
    }
    .panel-img{
        width:80px;
        height:80px;
        background:#ccc;
        border-radius:40px;
        position:absolute;
        top:85px;
        left:20px;
        display: block;

    }
    .panel-title{
        color:#fff;
        font-size:32px;

    }
    .panel-content{
        color:#fff;
        font-size:22px;
        margin:10px 0;
    }
    .content-container{
        width:1200px;
        margin:15px auto;
    }
    .cards-container{
        width:1200px;
        margin:0 auto;
    }
    .course-progress{
        margin:5px auto;
        width:90%;
    }
    .content-container .el-tabs__item{
        font-size:24px;
    }
    .des{
        padding: 5px 10px;
    }
    .des .time{
        font-size: 12px;
        color: #aaa;
    }
    .projectTitle{
        transition:color 0.2s linear;
        cursor:pointer;
    }
    .projectTitle:hover{
        color:#FF4949;
    }
</style>
<script>
  import { mapGetters } from 'vuex'
  export default {
    mounted() {
      const hour = new Date().getHours()
      if (hour < 6) {
        this.greeting = '凌晨好！'
      } else if (hour < 9) {
        this.greeting = '早上好！'
      } else if (hour < 12) {
        this.greeting = '上午好！'
      } else if (hour < 14) {
        this.greeting = '中午好！'
      } else if (hour < 17) {
        this.greeting = '下午好！'
      } else if (hour < 19) {
        this.greeting = '傍晚好！'
      } else if (hour < 22) {
        this.greeting = '晚上好！'
      } else {
        this.greeting = '夜里好！'
      }
      this.getMyCourses()
    },
    data() {
      return {
        activeName: 'first',
        input: '',
        greeting: '',
        courses: []
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
      getMyCourses() {
        this.$store.dispatch('getMyCourses', { user_id: this.authId }).then(res => {
          this.courses = res.data
          console.log(this.courses)
        })
      },
      jumpTo(course_id) {
        window.open('http://' + window.location.host + '/#/detail/' + course_id)
      }
    },
    computed: {
      ...mapGetters(['auth_appid', 'authId', 'cloudRoot'])
    }}
</script>
