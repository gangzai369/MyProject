<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h4>工作人员登录</h4>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="loginForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="loginForm.password"
          clearable
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getUserLogin } from "../util/axios";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted(){},
  methods: {
    // 取到调用获取用户的异步事件
    ...mapActions(['getUserLoginAction']),
    // 登录事件
    submitForm(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          // 登录逻辑
          // 调用登录接口
          getUserLogin({
            username: this.loginForm.username,
            password: this.loginForm.password,
          })
            .then((res) => {
              if (res.data.code == 200) {
                //登录成功之后，调用函数，把登录数据存储到本地存储中
                this.getUserLoginAction(res.data.list);
                this.$message({
                  message: "登录成功！！！",
                  type: "success",
                });
                this.$router.push("/home");
              } else {
                this.$message({
                  message: "用户名或密码错误",
                  type: "warning",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // 输入内容为空时结束
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang='stylus' scoped>
@import '../stylus/index.styl';

.login {
  height: 100vh;
  width: 100vw;
  background-color: $bgoneColor;

  .demo-ruleForm {
    position: absolute;
    width: 300px;
    height: 300px;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -150px;
    background-color: #CC99FF;
    padding: 10px;
  }
}
</style>