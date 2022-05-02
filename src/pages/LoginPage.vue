<template>
  <h1>这是个登录页</h1>
  
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  mounted() {
    axios.get("/api/books/").then((res) => {
      console.log('a',res.data.res);
    });
  },
};
</script>

<style>
</style>