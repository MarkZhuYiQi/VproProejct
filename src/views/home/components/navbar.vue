<template>
    <div class="nav-container">
        <div id="navbar">
            <el-row>
                <el-col :span="3">
                    <span style="font-size: 30px; color: #FFFFFF; display: inline-block; height: 80px; line-height: 80px; cursor: pointer" @click="redirectToIndex">云课堂</span>
                    <!--<img id="logo" src="/imgs/logo.png" alt="" @click="redirectToIndex" style="cursor:pointer" />-->
                </el-col>
                <el-col :span="12" >
                    <el-menu></el-menu>
                </el-col>
                <el-col :span="9">
                    <el-menu mode="horizontal" @select="handleSelect" :router="false" background-color="#FF4949" active-text-color="#F4D19F" text-color="#FFFFFF">
                        <el-menu-item index="personal">我的学习</el-menu-item>
                        <el-menu-item index="cart">购物车</el-menu-item>
                        <el-menu-item index="message">消息</el-menu-item>
                        <el-menu-item index="" v-if="!isLogin"><a @click="show">登录</a>/<a @click="register">注册</a></el-menu-item>
                        <el-menu-item index="logout" v-if="isLogin">注销</el-menu-item>
                        <el-menu-item index="" v-if="isLogin">
                        <el-dropdown placement="bottom" @command="dropDownCommand">
                            <span class="el-dropdown-link">
                            <img id="head" @click="show" :src="cloudRoot + '/face.jpg'" alt="">
                                <!--<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                            </span>
                                <el-dropdown-menu slot="dropdown" size="medium" click="">
                                    <el-dropdown-item command="">我的消息</el-dropdown-item>
                                    <el-dropdown-item command="orders">我的订单</el-dropdown-item>
                                    <el-dropdown-item divided command="logout">退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <!--<img id="head" @click="show" src="/imgs/head.jpg" alt="">-->
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
            <modal name="demo-login" transition="pop-out" :width="modalWidth" :height="400" @before-close="beforeClose">
                <div class="box">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="手机登录" name="first">
                            <el-form :model="loginByPhone" :rules="telRules" ref="loginByPhone" label-width="100px">
                                <el-form-item label="手机号：" prop="appId" >
                                    <el-input v-model="loginByPhone.appId" auto-complete="off" size="large" placeholder="请输入手机号码" :disabled="true">
                                        <template slot="prepend">+86</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="密码：" prop="appKey">
                                    <el-input type="password" v-model="loginByPhone.appKey" size="large" placeholder="请输入密码" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="UserLogin('loginByPhone')" size="large">提交</el-button>
                                    <el-button @click="" size="large">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="邮箱登录" name="second">
                            <el-form :model="loginByEmail" :rules="emailRules" ref="loginByEmail" label-width="100px">
                                <el-form-item label="邮箱：" prop="appId" >
                                    <el-autocomplete
                                            v-model="loginByEmail.appId"
                                            auto-complete="off"
                                            size="large"
                                            placeholder="请输入邮箱地址"
                                            :fetch-suggestions="emailComplete"
                                            :trigger-on-focus="false"
                                            style="width:100%"x
                                            :disabled="true"
                                    ></el-autocomplete>
                                </el-form-item>
                                <el-form-item label="密码：" prop="appKey">
                                    <el-input type="password" v-model="loginByEmail.appKey" size="large" placeholder="请输入密码" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="UserLogin('loginByEmail')" size="large">提交</el-button>
                                    <el-button @click="" size="large">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="用户名登录" name="third">
                            <el-form :model="loginByUser" :rules="userRules" ref="loginByUser" label-width="100px">
                                <el-form-item label="用户名：" prop="appId" >
                                    <el-input type="text" v-model="loginByUser.appId" size="large" placeholder="请输入用户名"></el-input>
                                </el-form-item>
                                <el-form-item label="密码：" prop="appKey">
                                    <el-input type="password" v-model="loginByUser.appKey" size="large" placeholder="请输入密码"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="UserLogin('loginByUser')" size="large">提交</el-button>
                                    <el-button @click="" size="large">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </modal>
        </div>
        <textarea name="pubkey" ref="pubkey" cols="30" rows="10" style="display: none">-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDwYV4IPkfNau3aUVojBYAlTH0Z
K+4qGxYpmUMvbVy/cPBl++LNZjxa18IDvrbmeBUIJK3KwbTq8STA6bEPWQUtCU7Z
+gGPuzmOJDFUttRrkHNcgA1RnBwfdSg0x4wVN0vwnNYn1Wzni9urTC3weDEYTLpF
/DBPATaN1lnCFzwciwIDAQAB
-----END PUBLIC KEY-----</textarea>
    </div>
</template>
<script>
  import { encrypt, verifyTokenExpiration } from '@/utils/auth'
  import { mapGetters } from 'vuex'
  const MODAL_WIDTH = 656
  export default {
    created() {
      this.modalWidth = window.innerWidth < MODAL_WIDTH
        ? MODAL_WIDTH / 2
        : MODAL_WIDTH
      this.isLogin = !!((this.auth_token) && verifyTokenExpiration(this.auth_token))
    },
    mounted() {
      this.$root.$on('showLogin', function() {
        this.show()
      }.bind(this))
    },
    watch: {
      $route: function(to, from) {
        if (to.name !== 'index') return
        this.$router.push({ path: to.path })
        this.$router.go(0)
      },
      loginRequired(to, from) {
        if (to) {
          this.show()
        }
      }
    },
    data() {
      const validateTel = (rule, value, callback) => {
        value = /^\s+(.+?)\s+$/.exec(value)
        if (value === '') {
          callback(new Error('请输入手机号码！'))
        } else if (!/^\d{11}$/.test(value)) {
          callback(new Error('请填写正确的手机号码！'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码！'))
        } else if (!/[0-9]+/.test(value) || !/[a-zA-Z]+/.test(value) || value.length < 6 || value.length > 20) {
          callback(new Error('密码格式不正确！'))
        } else {
          callback()
        }
      }
      const validateEmail = (rule, value, callback) => {
        if (/^\s*(.+?)\s*$/.exec(value))value = /^\s*(.+?)\s*$/.exec(value)[1]
        if (value === '') {
          callback(new Error('请输入邮箱地址！'))
        } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+?[\w\-\u4e00-\u9fa5]+@[a-z0-9][a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
          callback(new Error('请填写正确的邮箱地址！'))
        } else {
          callback()
        }
      }
      const validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else if (value.length < 4 || value.length > 300) {
          callback(new Error('用户名格式不正确!'))
        } else {
          callback()
        }
      }
      return {
        isLogin: false,
        showModal: false,
        modalWidth: MODAL_WIDTH,
        activeName: 'third',
        emailAds: [
          '@qq.com',
          '@163.com',
          '@126.com',
          '@hotmail.com',
          '@gmail.com',
          '@sina.com',
          '@yahoo.com',
          '@vip.qq.com'
        ],
        loginByPhone: {
          appId: '',
          appKey: ''
        },
        telRules: {
          appId: [
            { validator: validateTel, trigger: 'blur' }
          ],
          appKey: [
            { validator: validatePass, trigger: 'blur' }
          ]
        },
        loginByEmail: {
          appId: '',
          appKey: ''
        },
        emailRules: {
          appId: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          appKey: [
            { validator: validatePass, trigger: 'blur' }
          ]
        },
        loginByUser: {
          appId: 'mark',
          appKey: 'Ups123'
        },
        userRules: {
          appId: [
            { validator: validateUser, trigger: 'blur' }
          ],
          appKey: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      emailComplete(queryString, callback) {
        var ads = this.emailAds.map((ads) => {
          if (queryString.indexOf('@') === -1) {
            return { value: queryString + ads }
          } else {
            if (/@(.*)/.exec(queryString)[1] === '') {
              return { value: queryString.substring(0, queryString.indexOf('@')) + ads }
            } else {
              const serverPattern = /@(.*)/.exec(queryString)[1]
              if (ads.match(new RegExp(serverPattern)) !== null) {
                return { value: queryString.substring(0, queryString.indexOf('@')) + ads }
              }
            }
          }
        })
        ads = ads.filter((item) => {
          if (item !== undefined) return item
        })
        callback(ads)
      },
      handleSelect(key, keyPath) {
        if (key === 'logout') {
          this.logout()
        } else {
          this.$router.push({ path: '/' + key })
        }
      },
      login() {
        self.location = '/user#/login'
      },
      register() {
        // self.location = '/user#/reg'
        this.$alert('敬请期待', '注册', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `谢谢`
            })
          }
        })
      },
      logout() {
        this.$store.dispatch('frontUserLogout')
      },
      show() {
        if (!this.isLogin) {
          if (!this.showModal) {
            this.$modal.show('demo-login')
            return
          }
          this.$modal.hide('demo-login')
        }
      },
      beforeClose(e) {
        for (const item of ['cart', 'orders']) {
          if (this.$route.path.indexOf(item) >= 0) {
            this.$router.go(-1)
          }
        }
      },
      handleClick(index, event) {},
      redirectToIndex() {
        window.location.href = '/#/home'
      },
      UserLogin(formName) {
        this.$refs[formName].validate((v) => {
          if (v) {
            const userInfo = {
              appId: this[formName]['appId'],
              appKey: this[formName]['appKey']
            }
            console.log(userInfo)
            const userEnData = encrypt(userInfo, this.$refs.pubkey.value)
            this.$store.dispatch('frontUserLogin', { data: userEnData }).then(() => {
              location.reload()
            })
          } else {
            alert('userName or password must input!')
          }
        })
      },
      dropDownCommand(command) {
        if (command === 'logout') {
          this.logout()
          return
        }
        if (command !== '' || command !== undefined || command !== null) {
          this.$router.push({ path: '/' + command })
        }
      }
    },
    computed: {
      ...mapGetters(['auth_token', 'loginRequired', 'cloudRoot'])
    }
  }
</script>
