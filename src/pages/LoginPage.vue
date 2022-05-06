<template>
  <div>
    <div style="display: flex; justify-content: center">
      <h1>用户登录</h1>
    </div>
    <div style="display: flex; justify-content: center">
      <el-card class="box-card" style="width: 500px">
        <el-form ref="form" :model="login" label-width="80px">
          <el-form-item label="账号: ">
            <el-input v-model="login.username"></el-input>
          </el-form-item>
          <el-form-item label="密码: ">
            <el-input v-model="login.password" show-password></el-input>
          </el-form-item>
        </el-form>
        <div style="display: flex; justify-content: center">
          <el-button type="primary" @click="updateInfo">登录</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from 'moment';

export default {
  name: "LoginPage",
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    updateInfo() {
      axios
        .get("api/login/", {
          params: {
            username: this.login.username,
            password: this.login.password,
          },
        })
        .then((res) => {
          console.log("bbb", res);
          if (res.data.res == true) {
            console.log('登录成功')
            localStorage.setItem("username", this.login.username);
            localStorage.setItem('date',moment(moment.now()).format('YYYY-MM-DD'));
            this.$router.go(0);
          }
        });
    },
  },
};
</script>

<style>
</style>