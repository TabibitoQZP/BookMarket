<template>
  <!-- 好像不能在外面写...那就写里面吧...
需要做的事情有两个: 发送ajax请求获取用户信息, 发送ajax请求修改用户信息 -->
  <!-- 设置一下边框的内宽比较好一点, 谁知道用户会不会乱搞 -->
  <div :style="`margin: ${parseInt(totalWidth * 0.01)}px`">
    <!-- 好像不用加style宽度配置项:style="`width:${parseInt(totalWidth * 0.25)}`" -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 28px; font-weight: bold">用户信息</span>
        <el-button
          style="float: right; padding: 3px 0; font-size: 28px"
          type="text"
          @click="clearlocal"
          ><i class="el-icon-s-promotion"></i
        ></el-button>
        <el-button
          style="float: right; padding: 3px 0; font-size: 28px"
          type="text"
          @click="dialogFormVisible = true"
          ><i class="el-icon-edit-outline"></i
        ></el-button>
        <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
          <el-form :model="userInfo">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="userInfo.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="工号" :label-width="formLabelWidth">
              <el-input
                v-model="userInfo.id"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-input v-model="userInfo.sex" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="出生日期" :label-width="formLabelWidth">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="userInfo.birth"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="mtd">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div style="text-align: center">
        <!-- 这边的src以后要通过后端api来获取, 顺便这头像居中挺难设置的 -->
        <el-avatar :size="100" :src="avatarUrl" fit="cover"></el-avatar>
      </div>
      <div>
        <p>姓名: {{ userInfo.name }}</p>
        <p>工号: {{ userInfo.id }}</p>
        <p>性别: {{ userInfo.sex }}</p>
        <p>出生日期: {{ changedate(userInfo.birth) }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
// import axios from "axios";
import moment from "moment";
import axios from "axios";

export default {
  name: "AsideCom",
  // 这边设个全局变量可能方便一点...
  props: ["totalWidth"],
  data() {
    return {
      // 驱动表单的, 应该会改
      formLabelWidth: "120px",
      dialogFormVisible: false,

      avatarUrl:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      infoEdit: false,
      userInfo: {
        name: "",
        id: "",
        sex: "",
        birth: "",
      },
    };
  },
  methods: {
    clearlocal() {
      localStorage.clear();
      this.$router.go(0);
    },
    mtd() {
      this.dialogFormVisible = false;
      // 这里要发送ajax请求修改用户信息
      /************************************/
      axios.get("api/userinfo", {
        params: {
          gettype: 1,
          username: localStorage.getItem("username"),
          realname: this.userInfo.name,
          id: this.userInfo.id,
          man: this.userInfo.sex == "男" ? true : false,
          birth: moment(this.userInfo.birth).format("YYYY-MM-DD"),
        },
      });
    },
    // 要么注册成全局组件, 要么就这么麻烦的封装了将就用吧...
    changedate(dt) {
      return moment(dt).format("YYYY-MM-DD");
    },
  },
  mounted() {
    // 这里到时候要发送ajax请求获取用户信息
    /************************************/
    if (localStorage.getItem("username") !== null) {
      console.log("正常获取信息");
      axios
        .get("api/userinfo/", {
          params: {
            gettype: 0,
            username: localStorage.getItem("username"),
          },
        })
        .then((res) => {
          this.userInfo.name = res.data.realname;
          this.userInfo.id = res.data.id;
          this.userInfo.sex = res.data.man == true ? "男" : "女";
          this.userInfo.birth = res.data.birth;
        });
    }
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