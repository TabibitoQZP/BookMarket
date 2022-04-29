<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" style="text-align:right">
      <el-form-item label="查询内容">
        <el-input v-model="search.info" placeholder="查询内容"></el-input>
      </el-form-item>
      <el-form-item label="查询类型">
        <el-select v-model="search.type" placeholder="查询类型">
          <el-option label="综合" value="0"></el-option>
          <el-option label="ISBN" value="1"></el-option>
          <el-option label="书名" value="2"></el-option>
          <el-option label="作者" value="3"></el-option>
          <el-option label="出版社" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="100">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column label="ISBN" width="120">
        <template slot-scope="scope">
          {{ scope.row.ISBN }}
        </template>
      </el-table-column>

      <el-table-column label="书名" width="160">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="作者" width="160">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>

      <el-table-column label="出版社" width="160">
        <template slot-scope="scope">
          {{ scope.row.public }}
        </template>
      </el-table-column>

      <el-table-column label="剩余" width="80">
        <template slot-scope="scope">
          {{ scope.row.remain }}
        </template>
      </el-table-column>

      <el-table-column label="零售价" width="80">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 方法先存着handleEdit(scope.$index, scope.row) -->
          <el-button
            size="mini"
            @click="dialogFormVisible = true"
            style="margin-right: 5px"
            >编辑</el-button
          >
          <el-dialog title="修改图书信息" :visible.sync="dialogFormVisible">
            <el-form :model="scope.row">
              <el-form-item label="ISBN" :label-width="formLabelWidth">
                <el-input
                  v-model="scope.row.ISBN"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="名字" :label-width="formLabelWidth">
                <el-input
                  v-model="scope.row.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="作者" :label-width="formLabelWidth">
                <el-input
                  v-model="scope.row.author"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="出版社" :label-width="formLabelWidth">
                <el-input
                  v-model="scope.row.public"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="剩余" :label-width="formLabelWidth">
                <el-input
                  v-model="scope.row.remain"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="价格" :label-width="formLabelWidth">
                <el-input
                  v-model="scope.row.price"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
                >确 定</el-button
              >
            </div>
          </el-dialog>

          <el-button
            size="mini"
            type="info"
            @click="importFormVisible = true"
            style="margin-right: 5px"
            >进货</el-button
          >
          <el-dialog title="进货表单" :visible.sync="importFormVisible">
            <el-form :model="scope.row">
              <el-form-item label="进货数量" :label-width="formLabelWidth">
                <el-input
                  v-model.number="importNum"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="进货价格" :label-width="formLabelWidth">
                <el-input
                  v-model.number="importPrice"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="importFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="handleImport(scope.$index, scope.row)"
                >确 定</el-button
              >
            </div>
          </el-dialog>

          <el-button
            size="mini"
            type="primary"
            @click="saleFormVisible = true"
            style="margin-right: 5px"
            >销售</el-button
          >

          <el-dialog title="销售表单" :visible.sync="saleFormVisible">
            <el-form :model="scope.row">
              <el-form-item label="销售数量" :label-width="formLabelWidth">
                <el-input
                  v-model.number="saleNum"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="importFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="handleSale(scope.$index, scope.row)"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin: 20px; text-align: center">
      <el-pagination layout="prev, pager, next" :total="100"> </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这边是浅拷贝, 因此改一个会改掉全部的, 深拷贝得自己写函数, 因此这里从后端拿
      tableData: Array(10).fill({
        // date到时候应该会删掉...
        date: "21-2-29",
        ISBN: 1234567890,
        name: "魔女之旅",
        author: "白石定规",
        public: "PA",
        remain: 20,
        price: 32,
      }),
      // 驱动表单的, 应该会改
      formLabelWidth: "120px",
      dialogFormVisible: false, // 这个是编辑表单
      importFormVisible: false, // 这个是进货表单
      // 进货数量, 进货价格
      importNum: 0,
      importPrice: 0,
      saleFormVisible: false, // 这个是销售表单
      // 销售数量
      saleNum: 0,
      // 查询用表单
      search:{
        info:'',
        // 双绑, 这里默认综合查询
        type:'0',
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      // index是第几个, row是该行输入的数据(不是显示的)
      console.log(index, row);
      this.dialogFormVisible = false;
      // row中数据可以直接用于发送ajax请求了...这边请求修改的api
      /*******************************/
    },
    handleImport(index, row) {
      console.log(index, row, this.importNum, this.importPrice); // 需要这两个数据, 因为需要知道进货了哪些
      this.importFormVisible = false;
      // row数据用于发送ajax请求, 注意把进货数量importNum和价格importPrice打包带走
      /*******************************/
    },
    handleSale(index, row) {
      this.saleFormVisible = false;
      console.log(index, row, this.saleNum); // 需要这两个数据, 因为需要知道买了哪本书
      // row数据用于发送ajax请求, 注意把销售数量saleNum带走
      /*******************************/
    },
    onSubmit(){
      console.log(this.search.info,this.search.type);
      // 这里发送ajax请求把search发送上去就行了
      /*******************************/
    }
  },
};
</script>