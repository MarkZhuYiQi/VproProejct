<template>
    <el-row>
        <el-col :span="24">
            <div class="guideArea">
                <!--<span v-if="level" class="guideTitle linkTitle" @click="jumpTo('/#/index/'+nav_nickname)">{{title}}</span>-->
                <span v-if="level" class="guideTitle linkTitle" @click="jumpTo('/index/'+navNickname)">{{title}}</span>
                <span class="guideTitle linkTitle" v-if="!level">{{title}}</span>
                <span v-for="(item, i) in navChild" v-if="navChild.length" :key="i">
                    <!--<span v-if="item.level" class="sub_title linkTitle" @click="jumpTo('/#/index/'+item.nav_nickname)">{{item.nav_text}}</span>-->
                    <span v-if="item.level" class="sub_title linkTitle" @click="jumpTo('/index/'+item.navNickname)">{{item.navText}}</span>
                    <span class="sub_title linkTitle" v-if="!item.level" @click="jumpTo('/category/' + item.navNickname)">{{item.navText}}</span>
                </span>
                <!--<span class="more linkTitle" @click="open('/#' + nav_url)">更多 <i class="el-icon-arrow-right" style="font-size:10px;line-height:14px;"></i></span>-->
                <span class="more linkTitle" @click="jumpTo(navUrl)">更多 <i class="el-icon-arrow-right" style="font-size:10px;line-height:14px;"></i></span>
            </div>
        </el-col>
    </el-row>
</template>
<style>
    span{
        display: inline-block;
    }
    .guideArea{
        margin:20px 0 8px 0;
    }
    .guideTitle{
        font-size:25px;
    }
    .sub_title{
        display:inline-block;
        padding:0px 5px 0px;
        color:#666;
    }
    .linkTitle{
        cursor:pointer;
    }
    .linkTitle:hover{
        color:#FF4949;
    }
    .more{
        position:absolute;
        right:0;
        bottom:8px;
        font-size: 14px;
        color:#aaa;
    }
</style>
<script>
  export default{
    props: {
      title: {
        type: String,
        default: () => {
          return ''
        }
      },
      navNickname: {
        type: String,
        default: () => {
          return ''
        }
      },
      child: {
        type: Array,
        default: () => {
          return []
        }
      },
      navUrl: {
        type: String,
        default: () => {
          return ''
        }
      },
      level: {
        type: Boolean,
        default: () => {
          return false
        }
      }
    },
    created() {
      this.navChild = this.child.map(res => {
        res['level'] = res.hasOwnProperty('subNav')
        return res
      })
    },
    data() {
      return {
        navChild: []
      }
    },
    methods: {
      jumpTo(dest) {
        console.log(dest)
        this.$router.push({ path: dest })
      },
      open(dest) {
        window.open('http://' + window.location.host + dest)
      }
    }
  }
</script>
