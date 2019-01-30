<template>
    <div class="multimenu-main">
        <ul class="multimenu-list">
            <li @mouseenter="showMultiMenu(item)" @mouseleave="hideMultiMenu" v-for="(item, i) in navData">
                <a :href="'/#/index/' + item.navUrl" target="_blank">{{item.navText}}</a>
            </li>
        </ul>
        <transition name="el-fade-in-linear">
            <div class="multimenu-detail" v-if="subMenuShowed" @mouseenter="showMultiMenu" @mouseleave="hideMultiMenu">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div  v-for="(value, key) in navDetail" >
                            <span><a :href="'/#/index/' + value.navUrl" class="main" target="_blank">{{value.navText}}</a></span>
                            <ul class="detail-list" :key="key">
                                <li v-for="(item, i) in value.subNav" class="divide" :key="i">
                                    <a :href="'/#/category/' + item.navUrl" class="list-item" target="_blank">{{item.navText}}</a>
                                </li>
                            </ul>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <ul class="hot-list">
                            <li v-for="(item, i) in [0, 1, 2, 3, 4]" :key="i"><a href="" :class="{ 'list-item': true, 'main': i===0 }">热门课程</a></li>
                        </ul>
                    </el-col>
                </el-row>
            </div>
        </transition>
    </div>
</template>
<style>
    .multimenu-main{
        position: relative;
    }
    .multimenu-detail{
        position:absolute;
        padding: 30px 30px;
        left: 100%;
        z-index: 9999;
        background-color: rgba(255, 255, 255, 0.9);
        width:840.5px;
        height:283px;
    }
    .multimenu-main a:hover {
        color: #FF4949;
        transition: color 0.2s;
    }
    .hot-list {
        display: inline-block;
    }
    .hot-list li{
        padding: 3px 0;
    }
    .detail-list{
        display: inline-block;
        margin: 5px 0;
    }

    .detail-list li {
        display: inline-block;
        padding: 0 12px;
    }
    .detail-list .divide {
        border-right: 1px solid #ccc;
    }
    .list-item{
        text-decoration: none;
        color: #333;
        font-size: 12px;
    }
    .main {
        font-size: 15px !important;
        color: #000000 !important;
        text-decoration: none;
    }
    .multimenu-list{
        float: left;
        list-style: none;
        width: 100%;
        background-color: rgba(0,0,0,0.3);
    }
    .multimenu-list li{}
    .multimenu-list li a{
        color: #FFFFFF;
        width: 100%;
        text-decoration: none;
        float: left;
        text-align: center;
        font-size: 14px;
        line-height:48px;
        height: 48px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        transition: background-color 0.3s linear, color 0.3s linear;
    }
    .multimenu-list li a:hover{
        text-decoration: none;
        background-color: #FFFFFF;
        color: #666666;
    }
</style>
<script>
  // import { mapGetters } from 'vuex'
  export default {
    props: {
      indexNavbar: {
        type: Object,
        default: {}
      }
    },
    mounted() {
      this.navData = this.iterNav(this.indexNavbar.subNav)
    },
    data() {
      return {
        subMenuShowed: false,
        navData: [],
        navDetail: []
      }
    },
    methods: {
      /**
       * 有2层 最外部是6个主体，每个主体导航中有一个children二级分类，二级分类里面又拥有多个小分类（三级分类）
       * @param data
       */
      iterNav(data) {
        const navData = []
        if (data.length > 0) {
          for (const item of data) {
            let temp = {}
            temp = {
              navUrl: item.navUrl.split('/')[2],
              navText: item.navText
            }
            if (item.hasOwnProperty('subNav')) {
              temp['subNav'] = []
              temp['subNav'] = this.iterNav(item.subNav)
            }
            navData.push(temp)
          }
        }
        return navData
      },
      toggleShow() {
        setTimeout(() => {
          this.subMenuShowed = !this.subMenuShowed
        }, 150)
      },
      showMultiMenu(item) {
        this.subMenuShowed = true
        if (!item.hasOwnProperty('navText')) return
        this.navDetail = item.subNav
      },
      hideMultiMenu() {
        this.subMenuShowed = false
      }
    }
  }
</script>
