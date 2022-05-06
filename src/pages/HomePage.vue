<template>
  <div>
    <h1>自定义首页, 可以随时用</h1>
    <div class="block">
      <el-carousel trigger="click" height="640px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h1 class="small" style="text-align: center">
            {{item}}
          </h1>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>

export default {
  name: "HomePage",
  data() {
    return {};
  },
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>