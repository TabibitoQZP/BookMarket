<template>
  <div>
    <div class="block" style="margin-bottom: 10px; text-align: right">
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button type="primary" style="margin-left: 20px" @click="changeTable"
        >日期</el-button
      >
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ID" prop="id" sortable> </el-table-column>

      <el-table-column label="时间" prop="date" sortable> </el-table-column>

      <el-table-column label="盈亏" prop="earn" sortable> </el-table-column>
    </el-table>
    <h1 style="text-align: right">合计:{{ totalEarn }}</h1>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "BillSearch",
  data() {
    return {
      tableData: "",
      value1: "",
      totalEarn: 0,
    };
  },
  mounted() {
    axios
      .get("api/bill/", {
        params: {
          gettype: 0,
        },
      })
      .then((res) => {
        var tmp = res.data.res;
        this.totalEarn = 0;
        var i;
        for (i = 0; i < tmp.length; i++) {
          tmp[i].date = moment(tmp[i].date).format("YY-MM-DD-HH:MM:SS");
          this.totalEarn += parseFloat(tmp[i].earn);
        }
        this.tableData = res.data.res;
      });
  },
  methods: {
    changeTable() {
      // 每次都得重新请求过来过滤
      axios
        .get("api/bill/", {
          params: {
            gettype: 0,
          },
        })
        .then((res) => {
          var tmp = res.data.res;
          this.totalEarn = 0;
          tmp = tmp.filter((item) => {
            return (
              moment(item.date).isAfter(moment(this.value1[0])) &&
              moment(item.date).isBefore(moment(this.value1[1]))
            );
          });
          var i;
          for (i = 0; i < tmp.length; i++) {
            tmp[i].date = moment(tmp[i].date).format("YY-MM-DD-HH:MM:SS");
            this.totalEarn += parseFloat(tmp[i].earn);
          }
          this.tableData = tmp;
        });
      console.log(this.value1);
    },
  },
};
</script>

<style>
</style>