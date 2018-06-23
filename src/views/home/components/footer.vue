<template>
    <div class="footer">
        <div class="content">
            <el-row :gutter="20">
                <el-col :span="12" class="cols">
                    <el-row :gutter="40">
                        <el-col :span="12" class="label">
                            <div>Author: </div>
                            <div>Email: </div>
                        </el-col>
                        <el-col :span="12" class="info">
                            <div>Mark Zhu</div>
                            <div>zhuyiqi_026@163.com</div>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row :gutter="40">
                        <el-col :span="12" class="label">
                            <div>Constructed by: </div>
                        </el-col>
                        <el-col :span="12" class="info">
                            <div>Vue</div>
                            <div>Vuex</div>
                            <div>Vue-router</div>
                            <div>Element-ui</div>
                            <div>Swiper</div>
                            <div>Axios</div>
                            <div>videojs</div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <div class="end">
                <div>京ICP00000000</div>
            </div>
        </div>
    </div>
</template>
<style>
    .footer{
        position: relative;
        min-height: 200px;
        width: 100%;
        font-size: 15px;
        background-color: #333333;
    }
    .footer .content{
        color: #aaaaaa;
        width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }
    .content .cols{}
    .content .label div{
        text-align: right;
    }
    .content .info div{
        text-align: left;
    }
    .footer .end{
        position: absolute;
        bottom: 10px;
        left: 50%;
        width: 1200px;
        margin-left: -600px;
    }
    .footer .end div{
        text-align: center;
    }
</style>
<script>

</script>