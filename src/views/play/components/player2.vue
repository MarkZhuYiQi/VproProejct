<template>
    <el-row :gutter='0'>
        <el-col :md='18' :xs='24' :sm='18' :lg='18' :xl='18'>
            <video-player
                    ref='videoPlayer'
                    :options='playerOptions'
                    :playsinline='true'
                    @play='onPlayerPlay($event)'
                    @pause='onPlayerPause($event)'
                    @ended='onPlayerEnded($event)'
                    @waiting='onPlayerWaiting($event)'
                    @playing='onPlayerPlaying($event)'
                    @loadeddata='onPlayerLoadeddata($event)'
                    @timeupdate='onPlayerTimeupdate($event)'
                    @canplay='onPlayerCanplay($event)'
                    @canplaythrough='onPlayerCanplaythrough($event)'
                    @statechanged='playerStateChanged($event)'
                    @ready='playerReadied'>
            </video-player>
        </el-col>
        <el-col :md='6' :xs='24' :sm='6' :lg='6' :xl='6'>
            <div class='vjs-playlist' :style='{ width: scrollSize.width + "px", height: scrollSize.height + "px", backgroundColor: "#333333", display: "inline-block" }'>
                <scroll-bar :style="{ maxHeight: scrollSize.height + 'px', width: scrollSize.width + 'px', backgroundColor: '#333333', cursor: 'pointer' }" ref="myscrollbar">
                    <div>
                        <div
                                v-for="(item, i) in source" :style="{ height: scrollSize.height * 0.12 + 'px' }"
                                :class="{ list: source.length - 1, listitem: true, selecteditem: item.lessonId === itemSelected }"
                                @click="relocate(item, i)"
                        >
                            <el-row :gutter="10">
                                <el-col :span="16">
                                    <span style="color: #eeeeee">{{item.name}}</span>
                                </el-col>
                                <el-col :span="8">
                                    <img :src="item.sources.src + (item.sources.src.indexOf('?') > -1 ? '&' : '?') + 'vframe/jpg/offset/5/w/' + thumbnailSize.width.toFixed(0) + '/h/' + thumbnailSize.height.toFixed(0)" alt="">
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </scroll-bar>
            </div>
        </el-col>
    </el-row>
</template>
<style>
    .list{
        border-bottom: 1px solid #555555;
    }
    .listitem{
        padding: 10px;
    }
    .listitem:hover{
        background-color: #666666;
        transition: background-color 0.2s;
    }
    .selecteditem{
        background-color: #000000 !important;
    }
</style>
<script>
  import { mapGetters } from 'vuex'
  import 'video.js/dist/video-js.css'
  import { videoPlayer } from 'vue-video-player'
  import ScrollBar from 'vue2-scrollbar'
  require('vue2-scrollbar/dist/style/vue2-scrollbar.css')
  export default {
    created() {},
    mounted() {
      if (Object.keys(this.$route.query).length !== 0 && this.$route.query.course_id !== undefined) {
        this.$store.dispatch('getLessonsList', { course_id: this.$route.query.course_id }).then((res) => {
          for (const item of res) {
            if (item.lesson_is_chapter_head === '0') {
              this.source.push({
                name: item.lesson_title,
                lessonId: item.lesson_id,
                courseId: item.lesson_course_id,
                description: '',
                duration: '',
                // sources: [{ src: 'http://ozg76yopg.bkt.clouddn.com/error', type: 'video/mp4' }],
                sources: {
                  src: item.video_file_key && item.video_file_isused ? this.cloudRoot + '/' + item.video_file_key : this.cloudRoot + '/error?v=' + Math.floor((Math.random() * 100) + 1),
                  type: 'video/mp4'
                },
                thumbnail: false
              })
              if (item.lesson_id === this.$route.query.lesson_id) {
                this.$emit('lessonInfo', item)
              }
            }
          }
          if (this.$route.query.lesson_id !== undefined) {
            this.itemSelected = this.$route.query.lesson_id
            for (const i in this.source) {
              if (this.source[i]['lessonId'] === this.itemSelected) {
                this.changeVideo(this.source[i], i)
              }
            }
          }
        })
      }
      this.handleResize()
      // 添加resize的方法
      window.addEventListener('resize', this.handleResize)
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },
    data() {
      return {
        videoSize: {
          width: undefined,
          height: undefined
        },
        scrollSize: {
          width: undefined,
          height: undefined
        },
        scrollLocation: -1,
        thumbnailSize: {
          width: undefined,
          height: undefined
        },
        zIndex: 9999,
        playerOptions: {
          // videojs options
          height: undefined,
          muted: true,
          fluid: true,
          aspectRatio: '16:9',
          preload: 'auto',
          autoplay: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [],
          poster: '/static/images/author.jpg'
          // 自动缩放，自适应
          // fluid: true,
        },
        source: [],
        itemSelected: -1
      }
    },
    methods: {
      handleResize() {
        const originWidth = this.$el.getBoundingClientRect().width
        if (originWidth >= '768') {
          this.videoSize.width = originWidth * 0.75
          this.scrollSize.width = originWidth * 0.25
          this.videoSize.height = this.videoSize.width * 9 / 16
          this.scrollSize.height = this.videoSize.height
        } else if (originWidth < '768') {
          this.videoSize.width = originWidth
          this.videoSize.height = this.videoSize.width * 9 / 16
          this.scrollSize.width = this.videoSize.width
          this.scrollSize.height = this.videoSize.height
        }
        this.thumbnailSize = {
          height: this.scrollSize.height * 0.08,
          width: this.scrollSize.height * 0.08 * 16 / 9
        }
        // this.playerOptions.height = this.videoSize.height
      },
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      // ...player event
      onPlayerEnded(e) {
        // console.log('player ended: ', e)
      },
      onPlayerWaiting(e) {
        // console.log('player is waiting' , e)
      },
      onPlayerPlaying(e) {
        // console.log('player is playing!', e)
      },
      onPlayerLoadeddata(e) {
        this.scrollbar.scrollToY(parseInt(this.scrollLocation))
        // console.log('player data loaded', e)
      },
      onPlayerTimeupdate(e) {
        // console.log('player time update!', e)
      },
      onPlayerCanplay(e) {
        // console.log('player can play. ' , e)
      },
      onPlayerCanplaythrough(e) {
        // console.log('can play through', e)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },

      // player is ready
      playerReadied(player) {
        // console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      },
      changeVideo(item, i) {
        this.itemSelected = item.lessonId
        this.player.src(item.sources)
        this.scrollLocation = (parseInt(this.scrollSize.height * 0.12) + 20) * i
      },
      relocate(item) {
        this.$router.push({ path: '/play', query: { 'course_id': item.courseId, 'lesson_id': item.lessonId }})
      }
    },
    watch: {
      $route: {
        deep: true,
        handler() {
          location.reload()
        }
      },
      scrollLocation(to, from) {
        this.scrollbar.scrollToY(parseInt(to))
      }
    },
    components: { ScrollBar, videoPlayer },
    computed: {
      player() {
        if (this.$refs.videoPlayer.player !== undefined) return this.$refs.videoPlayer.player
      },
      scrollbar() {
        if (this.$refs.myscrollbar !== undefined) return this.$refs.myscrollbar
      },
      ...mapGetters(['cloudRoot'])
    }
  }
</script>
