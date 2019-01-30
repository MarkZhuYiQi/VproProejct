<template>
    <div>
        <div class="carousel-side" :style="{ 'backgroundColor': this.$route.name === 'home' ? this.carouselBackgroundColor : 'rgb(255, 255, 255, 0)'}">
            <div class="carousel">
                <el-row :gutter="0">
                    <el-col :span="3">
                        <div style="width: 150px; height: 343px">
                            <Multimenu v-if="Object.keys(this.indexNavbar).length > 0 && $route.name==='home'" :indexNavbar = indexNavbar></Multimenu>
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <Carousel></Carousel>
                    </el-col>
                    <el-col :span="3">
                        <div class="carousel-right" v-if="$route.name==='home'">

                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <Cards v-show="Object.keys(indexCourses.length) > 0" />
    </div>
</template>
<style>
    .home-carousel{
        /*background-color: rgb(250,220,36);*/
    }
    .carousel{
        width: 1200px;
        margin: 0 auto;
    }
    .carousel-side{
        transition: background-color 0.1s ease-out;
    }
    .carousel-right{
        height: 343px;
        background-color: rgba(255, 255, 255, 0.7);
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }

</style>
<script>
  import { mapGetters } from 'vuex'
  import Carousel from './components/carousel.vue'
  import Cards from './components/cards.vue'
  import Multimenu from './components/multimenu.vue'

  export default{
    data() {
      return {}
    },
    components: {
      Carousel,
      Cards,
      Multimenu
    },
    computed: {
      ...mapGetters(['carouselBackgroundColor', 'indexCourseList', 'indexNavbar', 'indexCourses'])
    }
  }
</script>
