<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <User class="svg-container" size="14" />
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <Lock class="svg-container" size="14" />
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin(loginFormRef)"
        />
        <View size="14" class="show-pwd" @click="showPwd" />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px; height: 40px"
        @click.native.prevent="handleLogin(loginFormRef)"
        >登录</el-button
      >
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px; margin-left: 0; height: 40px"
        @click.native.prevent="handleRegister(loginFormRef)"
        >注册</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
// import { validUsername } from '@/utils/validate'
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { User, View, Lock } from "@element-plus/icons-vue";
import { store } from "@/store";
import * as Api from "@/api/login";
const loginFormRef = ref();

let loginForm = reactive({
  username: "admin",
  password: "admin1234",
});
const loginRules = reactive({
  username: [{ required: true, trigger: "blur" }],
  password: [{ required: false, trigger: "blur" }],
  // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  // password: [{ required: true, trigger: 'blur', validator: validatePassword }]
});
let loading = ref(false);
let passwordType = ref("password");
let router = useRouter();
let route = useRoute();
let redirect = route.query.redirect;
const showPwd = () => {
  if (passwordType.value === "password") {
    passwordType.value = "";
  } else {
    passwordType.value = "password";
  }
};
const handleLogin = (formEl) => {
  formEl.validate((valid) => {
    if (valid) {
      console.log(2222);
      loading.value = true;
      store
        .dispatch("user/login", loginForm)
        .then((res) => {
          console.log(res);
          ElMessage.success("登录成功");
          // localStorage.setItem("token", res.token);
          router.push({ path: redirect || "/" });
          loading.value = false;
        })
        .catch((err) => {
          console.log(err);
          loading.value = false;
        });
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
const handleRegister = (formEl) => {
  formEl.validate((valid) => {
    if (valid) {
      Api.register(loginForm)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

.login-container {
  height: 100vh;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .el-input {
    display: inline-block;
    height: 40px;
    // width: 100%;
    flex: 1;

    :deep(.el-input__wrapper) {
      background-color: transparent;
      box-shadow: none;
      width: 100%;
      padding: 0px;
    }
    :deep(input) {
      border: 0px;
      background: transparent;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 40px;
      caret-color: $cursor;
      box-shadow: none !important;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 20px;
  }

  .login-form {
    position: relative;
    width: 440px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    height: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
    top: 0px;
    bottom: 0;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
    margin: auto;
  }
}
</style>
