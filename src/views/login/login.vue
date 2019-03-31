<template>
  <div class="home">
    <img src="../../../static/img/home/background.jpg" alt="" width="100%" height="100%">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">太会玩后台管理系统</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import api from './api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit() {
        // form校验
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true
            let loginParams = { userName: this.ruleForm2.account, password: this.ruleForm2.checkPass }
            api.login(loginParams).then(res => {
              console.log("登陆请求返回结果：", res)
              this.logining = false
              let { msg, result, data } = res.data
              if (result !== 1) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                localStorage.setItem('userInfo', JSON.stringify(data))
                // this.$router.push({ path: '/table' })
                console.log("跳转页面")
              }
            });
          } else {
            console.log('form表单校验失败')
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .home {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    // background: url('../../../static/img/home/timg.jpg');
    justify-content:center;//子元素水平居中
    align-items:center;//子元素垂直居中
    display:-webkit-flex;
  }
  .login-container {
    position: absolute;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    // margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: transparent;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>