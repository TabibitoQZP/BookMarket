<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ID" prop="id" sortable> </el-table-column>

      <el-table-column label="时间" prop="date" sortable> </el-table-column>

      <el-table-column label="价格" prop="price" sortable> </el-table-column>

      <el-table-column label="数量" prop="amount" sortable>
      </el-table-column>

      <el-table-column label="状态" prop="status" sortable> </el-table-column>

      <el-table-column label="书籍" prop="bookname" sortable>
      </el-table-column>

      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.status"
            size="mini"
            style="width: 100px"
          >
            <el-option
              label="未付款"
              value="未付款"
              v-show="scope.row.status !== '未付款'"
            ></el-option>
            <el-option
              label="已付款"
              value="已付款"
              v-show="scope.row.status !== '已付款'"
            ></el-option>
            <el-option
              label="已退货"
              value="已退货"
              v-show="scope.row.status !== '已退货'"
            ></el-option>
          </el-select>
          <el-button
            type="primary"
            size="mini"
            style="margin-left: 5px"
            @click="onSubmit(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "OrderForm",
  data() {
    return {
      tableData: "",
      // 修改的状态
      tmpSubmit: "",
    };
  },
  mounted() {
    axios
      .get("api/cargo/", {
        params: {
          gettype: 0,
          // 这里直接拿, 也不做检索了, 没这要求
        },
      })
      .then((res) => {
        var tmp = res.data.res;
        tmp.forEach((item, index) => {
          tmp[index].date = moment(item.date).format("YY-MM-DD");
          if (item.status === "i") {
            tmp[index].status = "未付款";
          } else if (item.status === "j") {
            tmp[index].status = "已发货";
          } else {
            tmp[index].status = "已退货";
          }
        });
        console.log(tmp);
        this.tableData = tmp;
      });
  },
  methods: {
    onSubmit(tmp) {
      console.log(tmp);
      axios.get("api/cargo/", {
        params: {
          gettype: 1,
          row:tmp,
        },
      });
    },
  },
};
</script>

<style>
</style>