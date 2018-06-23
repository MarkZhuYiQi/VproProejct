<template>
    <div>
        <div class="panel">
            <div class="panel-container">
                <div class="panel-img">
                    <img src="" alt="" />
                </div>
                <div class="panel-title">
                    <span class="panel-title-name">markamrkamrkmark</span>
                    <span class="panel-title-greetings">，早上好</span>
                </div>
                <div class="panel-content">
                    <span class="panel-detail">美国女神一手拿着火炬，一手拿着书，这是告诉我们停电也要学习。</span>
                </div>
            </div>
        </div>
        <div class="content-container">
            <el-row>
                <el-col :span="12">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="12" style="border-bottom:1px solid #E5D3D1;height:42px;">
                    <el-input
                            placeholder="请选择日期"
                            icon="search"
                            v-model="input"
                            :on-icon-click="handleIconClick">
                    </el-input>
                </el-col>
            </el-row>
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
        margin:10px auto;
    }
</style>
<script>
    export default {
      data() {
        return {
          activeName: 'second',
          input: ''
        }
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event)
        }
      }
    }
</script>