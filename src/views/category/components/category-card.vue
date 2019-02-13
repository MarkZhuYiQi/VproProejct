<template>
    <el-card :body-style="{ padding: '0px' }">
        <div class="image">
            <img @click="jumpTo(sum.courseId)" :src="cloudRoot + '/' + sum.vproCoursesCover.courseCoverKey + '?imageView2/1/w/250/h/140/format/jpg/interlace/1/q/100'" />
        </div>
        <div class="des">
            <span class="projectTitle"><a @click="jumpTo(sum.courseId)">{{sum.courseTitle}}</a></span>
            <div class="bottom clearfix">
                <time class="time">{{  }}</time>
                <div class="price">
                    <span class="original-price" v-if="parseFloat(sum.courseDiscountPrice).toFixed(2) !== '-1.00'">{{sum.courseDiscountPrice}}</span>
                    <span class="discount-price">{{sum.coursePrice}}</span>
                </div>
            </div>
        </div>
    </el-card>
</template>
<style>
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
        cursor: pointer;
        transition:color 0.2s linear;
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
        font-size:20px;
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
  import { dateFormat } from '@/utils/index'
  import { mapGetters } from 'vuex'
  export default {
    props: {
      info: {
        type: Object,
        default: {}
      }
    },
    computed: {
      ...mapGetters(['cloudRoot'])
    },
    created() {
      if (parseFloat(this.sum.coursePrice).toFixed(2) === '0.00') this.sum.coursePrice = '免费'
      this.sum.courseTime = dateFormat(this.sum.courseTime, 'yyyy-MM-dd')
    },
    data() {
      return {
        sum: this.info
      }
    },
    methods: {
      jumpTo(videoId) {
        // this.$router.push({path:'/detail/'+video_id})
        window.open('http://' + window.location.host + '/#/detail/' + videoId)
      }
    }
  }
</script>
