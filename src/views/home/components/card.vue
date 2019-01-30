<template>
    <div class="card-container">
        <el-row :gutter="20">
            <el-col :span="4">
                <img :src="cloudRoot + '/all.png?r=1'" alt="" class="vertImg" />
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" v-for="n in summary.length/3" :key="n">
                    <el-col :span="8" v-for="(item,i) in summary" :key="i" v-if="i>=(n-1)*3 && i<(n*3)">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="image">
                                <img @click="jumpTo(item.courseId)" :src="cloudRoot + '/' + item.vproCoursesCover.courseCoverKey +'?imageView2/1/w/251/h/140/format/jpg/interlace/1/q/100'"  />
                            </div>
                            <div class="des">
                                <span class="projectTitle"><a @click="jumpTo(item.courseId)">{{item.courseTitle}}</a></span>
                                <div class="bottom clearfix">
                                    <time class="time">{{item.courseTime}}</time>
                                    <div class="price">
                                        <span class="original-price">￥1599</span>
                                        <span class="discount-price">{{item.coursePrice}}</span>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="4">
                <img :src="cloudRoot + '/all.png?r=1'" alt="" class="vertImg" />
            </el-col>
        </el-row>
    </div>
</template>
<style>
    .vertImg{
        margin:10px 0;
        width:100%;
    }
    .card-container{
        width:1200px;
        margin:0 auto;
    }
    .learningPlan{
        background-color:#FF4949;
        text-align:center;
        padding:56px 0;
        margin:10px 0;
    }
    .learningPlan h2,.learningPlan span{
        display:block;
        font-weight:bold;
        font-size:30px;
        color:#fff;
        height:50px;
        line-height:50px;
    }
    .learningPlan span{
        font-weight:normal;
        font-size:16px;
    }
    /*
        以下开始是重复部分
        ,可以提取出来重复利用
    */
    .el-card{
        max-height:350px;
        /*width:220px;*/
        width:100%;
        margin:10px 0;
    }
    .projectTitle{
        transition:color 0.2s linear;
        cursor:pointer;
    }
    .projectTitle:hover{
        color:#FF4949;
    }
    .price{
        padding:10px 0 5px 0;
    }
    .price .original-price{
        color:#bbb;
        font-size:15px;
        text-decoration: line-through;
    }
    .price .discount-price{
        display:inline-block;
        color:#FF501A;
        font-size:18px;
    }
    .des{
        padding: 6px;
        /*height:80px;*/
    }
    .des .projectTitle{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size:14px;
        line-height:1.4;
        width:90%;
    }
    .des .time {
        font-size: 13px;
        color: #999;
    }

    .des .bottom {
        padding-top: 10px;
        line-height: 13px;

    }
    .image{
        width:100%;
        height:140px;
        overflow: hidden;
    }
    .image img {
        width: 100%;
        height:140px;
        display: block;
        cursor:pointer;
        transition:transform 0.7s;
    }
    .image img:hover{
        transform: scale(1.2);
        /*zoom:1.2;*/
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>
<script>
  import { mapGetters } from 'vuex'
  import { dateFormat } from '@/utils/index'
  export default{
    created() {
      this.summary = this.summary.map((item, i) => {
        item.courseTime = dateFormat(item.courseTime, 'yyyy-MM-dd')
        if (parseFloat(item.coursePrice).toFixed(2) === '0.00') item.course_price = '免费'
        return item
      })
    },
    props: {
      content: {
        type: Array,
        default: []
      }
    },
    computed: {
      ...mapGetters(['cloudRoot'])
    },
    data() {
      return {
        summary: this.content
      }
    },
    methods: {
      jumpTo(video_id) {
        window.open('http://' + window.location.host + '/#/detail/' + video_id)
        // location.reload()
      }
    }
  }
</script>
