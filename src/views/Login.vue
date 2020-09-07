<template>
    <div>
      <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
        <h3 class="loginTitle">系统登录</h3>
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名" @keydown.enter.native="submitLogin"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password"  auto-complete="off" placeholder="请输入密码" @keydown.enter.native="submitLogin"></el-input>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
      </el-form>
    </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.postKeyValueRequest('/doLogin',this.loginForm).then(resp =>{
            if (resp){
              window.sessionStorage.setItem("user",JSON.stringify(resp.object))
              let path = this.$route.query.redirect;
              this.$router.replace((path=='/'||path==undefined)?"/home":path);
            }

          })
        } else {
          alert('error submit')
          return false
        }
      })
    }
  }
}
</script>

<style>
  .loginContainer{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: white;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .loginTitle{
    margin: 0px auto 20px auto;
    text-align: center;
    color: #505458;
  }

</style>
