<template>
  <!-- 设置一下边框的内宽比较好一点, 谁知道用户会不会乱搞 -->
  <div :style="`margin: ${parseInt(totalWidth * 0.01)}px`">
    <!-- 好像不用加style宽度配置项:style="`width:${parseInt(totalWidth * 0.25)}`" -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 28px; font-weight: bold">一言API</span>
        <el-button
          style="float: right; padding: 3px 0; font-size: 28px"
          type="text"
          @click="mtd"
          ><i class="el-icon-refresh-left"></i
        ></el-button>
      </div>
      <div>
        <p style="font-style: italic">{{ hitokoto }}</p>
        <p style="float: right">——{{ hitokotoFrom }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AsideCom",
  // 这边设个全局变量可能方便一点...
  props: ["totalWidth"],
  data() {
    return {
      hitokoto: "",
      hitokotoFrom: "",
    };
  },
  methods: {
    mtd() {
      //样式为acg好看一点
      axios.get("https://v1.hitokoto.cn/?c=a&c=b&c=c").then(
        (response) => {
          this.hitokoto = response.data.hitokoto;
          this.hitokotoFrom = response.data.from;
          console.log("successs", response.data);
        },
        (error) => {
          console.log("fail", error.message);
        }
      );
    },
  },
  mounted() {
    axios.get("https://v1.hitokoto.cn").then(
      (response) => {
        this.hitokoto = response.data.hitokoto;
        this.hitokotoFrom = response.data.from;
        console.log("successs", response.data);
      },
      (error) => {
        console.log("fail", error.message);
      }
    );
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>