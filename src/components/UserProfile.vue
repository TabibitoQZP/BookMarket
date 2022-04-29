<template>
  <!-- 设置一下边框的内宽比较好一点, 谁知道用户会不会乱搞 -->
  <div :style="`margin: ${parseInt(totalWidth * 0.01)}px`">
    <!-- 好像不用加style宽度配置项:style="`width:${parseInt(totalWidth * 0.25)}`" -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 28px; font-weight: bold">用户信息</span>
        <el-button
          style="float: right; padding: 3px 0; font-size: 28px"
          type="text"
          @click="infoEdit = !infoEdit"
          ><i class="el-icon-edit"></i
        ></el-button>
      </div>
      <!-- 不可以编辑时显示 -->
      <div v-if="!infoEdit">
        <div style="text-align: center">
          <!-- 这边的src以后要通过后端api来获取, 顺便这头像居中挺难设置的 -->
          <el-avatar :size="100" :src="avatarUrl" fit="cover"></el-avatar>
        </div>
        <hr>
        <div>
          <p>姓名: {{ userInfo.name }}</p>
          <p>工号: {{ userInfo.id }}</p>
          <p>性别: {{ userInfo.sex }}</p>
          <p>出生日期: {{ changedate(userInfo.birth) }}</p>
        </div>
      </div>
      <!-- 可以编辑时显示 -->
      <div v-else>
        <div style="text-align: center">
          <!-- 这边的src以后要通过后端api来获取, 顺便这头像居中挺难设置的 -->
          <el-avatar :size="100" :src="avatarUrl" fit="cover"></el-avatar>
        </div>
        <hr>
        <div>
          <p>姓名: <input type="text" v-model="userInfo.name" /></p>
          <p>工号: <input type="text" v-model="userInfo.id" /></p>
          <p>性别: <input type="text" v-model="userInfo.sex" /></p>
          <p>
            出生日期:
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="userInfo.birth"
            ></el-date-picker>
          </p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "AsideCom",
  // 这边设个全局变量可能方便一点...
  props: ["totalWidth"],
  data() {
    return {
      avatarUrl:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      infoEdit: false,
      userInfo: {
        name: "邱梓鹏",
        id: "1",
        sex: "男",
        birth: "",
      },
    };
  },
  methods: {
    mtd() {
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
    // 要么注册成全局组件, 要么就这么麻烦的封装了将就用吧...
    changedate(dt){
        return moment(dt).format("YY-MM-DD");
    }
  },
  mounted() {
    
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