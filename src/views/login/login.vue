<template>
    <div class="login-container" :style="loginWin">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
                 class="card-box login-form">
            <h3 class="title">云课堂登录</h3>
            <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
                <el-input name="username" type="text" v-model="loginForm.appId" autoComplete="on" placeholder="username" />
            </el-form-item>
            <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
                <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.appKey" autoComplete="on"
                          placeholder="password"></el-input>
                <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                    Sign in
                </el-button>
            </el-form-item>
            <div class="tips">
                <!--<span style="margin-right:20px;">username: admin</span>-->
                <!--<span> password: admin</span>-->
            </div>
        </el-form>
        <textarea name="pubkey" ref="pubkey" cols="30" rows="10" style="display: none">
          -----BEGIN PUBLIC KEY-----
          MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD5MPAoPanethCu9+P6QrwSzWCZ
          E/iiRPyS5vq0HQBIpICv6Syx45N5Y/A6bec6KLefhYX8CpYquFbNTu2V9BW4QLQf
          l78yBJS90EkEh2Q/+Ep6fIjlU3Lud3jy3vOqiCm/HwTBiiic20TBmxC84wXOY7r0
          s3usGiDpXPS2HmH5fQIDAQAB
          -----END PUBLIC KEY-----
        </textarea>
    </div>
</template>
<style>
.login-container{
    background: #EEEEEE url("https://vpro-1258194404.cos.ap-shanghai.myqcloud.com/vue.jpg") no-repeat fixed top;
    text-align: center
}
.login-container input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
}
.login-container input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: #eee;
    height: 47px;
}
.login-container .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
}
.login-container .el-input .el-input__inner{
    background-color: transparent !important;
    border: none !important;
    color: #FFFFFF;
}
.tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
}
.svg-container {
    padding: 6px 5px 6px 15px;
    color: #EEEEEE;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
}
.svg-container_login {
    font-size: 20px;
}
.title {
    font-size: 26px;
    font-weight: 400;
    color: #333;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
}
.login-container .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
}
.login-container .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
}
.show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select:none;
}
.thirdparty-button{
    position: absolute;
    right: 35px;
    bottom: 28px;
}
</style>
<script>
  import { isvalidUsername } from '@/utils/validate'
  import { encrypt } from '@/utils/auth'
  export default {
    mounted() {
      this.loginWin.height = (window.screen.height - 280) + 'px'
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      return {
        loginWin: {
          height: '0px'
        },
        loginForm: {
          appId: 'mark',
          appKey: 'Ups123'
        },
        loginRules: {
          appId: [{ required: true, trigger: 'blur', validator: validateUsername }],
          appKey: [{ required: true, trigger: 'blur', validator: validatePass }]
        },
        loading: false,
        pwdType: 'password'
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        const pubKey = this.$refs.pubkey.value
        const w = window
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('frontUserLogin', { data: encrypt(this.loginForm, pubKey) }).then(() => {
              this.loading = false
              if (this.$route.query.hasOwnProperty('s')) {
                w.location.href = w.location.protocol + '//' + this.$route.query.s
                location.reload()
              } else {
                this.$router.push({ path: '/' })
                location.reload()
              }
              return false
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    computed: {
    }
  }
</script>
