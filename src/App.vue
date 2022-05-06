<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex1"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">图书管理</el-menu-item>
      <el-menu-item index="3">订单管理</el-menu-item>
      <!-- 等写好在放出来吧... -->
      <el-menu-item index="4">账单查询</el-menu-item>
    </el-menu>
    <el-container>
      <!-- 手动调的78px -->
      <el-main
        :style="`background-color: #e9eef3; height: ${windowHeight - 78}px`"
        ><transition name="el-zoom-in-top" :appear="true"
          ><router-view></router-view></transition
      ></el-main>
      <el-aside
        :width="`${parseInt(windowWidth * 0.25)}px`"
        :style="`background-color: #d3dce6; height: ${windowHeight - 78}px`"
      >
        <transition name="el-zoom-in-top" :appear="true">
          <UserProfile :totalWidth="windowWidth"
        /></transition>
        <transition name="el-zoom-in-top" :appear="true">
          <AsideCom :totalWidth="windowWidth"
        /></transition>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
// 侧边栏引入
import AsideCom from "./components/AsideCom.vue";
import UserProfile from "./components/UserProfile.vue";

export default {
  name: "App",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      // 默认值不能设置为0, 即使在mounted中有操作
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, "@", keyPath);
      // 这个key是字符串型数据, 但不严格匹配2=="2"是能配上的, 不能配上2==="2"
      if (key === "1") {
        this.$router.replace("homepage");
      } else if (key === "2") {
        this.$router.replace("bookmanage");
      } else if (key === "3") {
        this.$router.replace("orderform");
      } else if (key === "4") {
        this.$router.replace("billsearch");
      }
    },
  },
  components: {
    AsideCom,
    UserProfile,
  },
  mounted() {
    this.$nextTick(() => {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    });
    // window.onunload = function () {
    //   localStorage.clear();
    // };
  },
};
</script>

<style>
</style>
