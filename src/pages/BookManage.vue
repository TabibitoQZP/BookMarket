<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" style="text-align: right">
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
        <el-button type="info" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="newBookVisible = true"
          >新建</el-button
        >
      </el-form-item>
    </el-form>

    <el-dialog title="新建图书信息" :visible.sync="newBookVisible">
      <el-form :model="newBook">
        <el-form-item label="ISBN" :label-width="formLabelWidth">
          <el-input v-model="newBook.ISBN" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名字" :label-width="formLabelWidth">
          <el-input v-model="newBook.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input v-model="newBook.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth">
          <el-input v-model="newBook.public" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="剩余" :label-width="formLabelWidth">
          <el-input v-model="newBook.remain" type="number" step="1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="newBook.price" type="number" step="0.01" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newBookVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNew">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%" :default-sort="{prop:'ISBN',order:'desending'}">
      <el-table-column label="ISBN" prop="ISBN" sortable> </el-table-column>

      <el-table-column label="书名" prop="name" sortable> </el-table-column>

      <el-table-column label="作者" prop="author" sortable>
        <!-- <template slot-scope="scope">
          {{ scope.row.author }}
        </template> -->
      </el-table-column>

      <el-table-column label="出版社" prop="public" sortable>
        <!-- <template slot-scope="scope">
          {{ scope.row.public }}
        </template> -->
      </el-table-column>

      <el-table-column label="剩余" prop="remain" sortable>
        <!-- <template slot-scope="scope">
          {{ scope.row.remain }}
        </template> -->
      </el-table-column>

      <el-table-column label="零售价" prop="price" sortable>
        <!-- <template slot-scope="scope">
          {{ scope.row.price }}
        </template> -->
      </el-table-column>

      <el-table-column label="操作" width="240px">
        <template slot-scope="scope">
          <!-- 方法先存着handleEdit(scope.$index, scope.row) -->
          <el-button
            size="mini"
            @click="
              dialogFormVisible = true;
              tmprow = scope.row;
            "
            style="margin-right: 5px"
            >编辑</el-button
          >
          <el-dialog title="修改图书信息" :visible.sync="dialogFormVisible">
            <el-form :model="tmprow">
              <el-form-item label="ISBN" :label-width="formLabelWidth">
                <el-input
                  v-model="tmprow.ISBN"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="名字" :label-width="formLabelWidth">
                <el-input v-model="tmprow.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="作者" :label-width="formLabelWidth">
                <el-input v-model="tmprow.author" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="出版社" :label-width="formLabelWidth">
                <el-input v-model="tmprow.public" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="剩余" :label-width="formLabelWidth">
                <el-input v-model="tmprow.remain" type="number" step="1" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="价格" :label-width="formLabelWidth">
                <el-input v-model="tmprow.price" type="number" step="0.01" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="handleEdit(scope.$index, tmprow)"
                >确 定</el-button
              >
            </div>
          </el-dialog>

          <el-button
            size="mini"
            type="info"
            @click="
              importFormVisible = true;
              tmprow = scope.row;
            "
            style="margin-right: 5px"
            >进货</el-button
          >
          <el-dialog title="进货表单" :visible.sync="importFormVisible">
            <el-form :model="tmprow">
              <el-form-item label="进货数量" :label-width="formLabelWidth">
                <el-input
                  v-model.number="importNum"
                  autocomplete="off"
                  type="number"
                  step="1"
                ></el-input>
              </el-form-item>
              <el-form-item label="进货价格" :label-width="formLabelWidth">
                <el-input
                  v-model.number="importPrice"
                  autocomplete="off"
                  type="number"
                  step="0.01"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="importFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="handleImport(scope.$index, tmprow)"
                >确 定</el-button
              >
            </div>
          </el-dialog>

          <el-button
            size="mini"
            type="primary"
            @click="
              saleFormVisible = true;
              tmprow = scope.row;
            "
            style="margin-right: 5px"
            >销售</el-button
          >

          <el-dialog title="销售表单" :visible.sync="saleFormVisible">
            <el-form :model="tmprow">
              <el-form-item label="销售数量" :label-width="formLabelWidth">
                <el-input
                  v-model.number="saleNum"
                  autocomplete="off"
                  type="number"
                  step="1"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="importFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="handleSale(scope.$index, tmprow)"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // 拿数据需要从头开始拿, 初始表单在mounted里拿
      tableData: "",
      // index为页码
      index: 1,
      // 驱动表单的, 应该会改(算了不改了)
      formLabelWidth: "120px",
      dialogFormVisible: false, // 这个是编辑表单
      importFormVisible: false, // 这个是进货表单
      newBookVisible: false, // 添加新书表单
      newBook: {
        ISBN: "",
        name: "",
        author: "",
        public: "",
        remain: "",
        price: "",
      },
      // 进货数量, 进货价格
      importNum: 0,
      importPrice: 0,
      saleFormVisible: false, // 这个是销售表单
      // 销售数量
      saleNum: 0,
      // 查询用表单
      search: {
        info: "",
        // 双绑, 这里默认综合查询
        type: "0",
      },
      // 由于未知原因, 表单不能和表格双绑
      tmprow: "",
    };
  },
  mounted() {
    axios
      .get("/api/books/", {
        params: {
          // 0代表默认操作
          gettype: 0,
          index: this.index,
          search: this.search,
        },
      })
      .then((res) => {
        this.tableData = res.data.res;
      });
  },
  methods: {
    handleEdit(index, row) {
      // index是第几个, row是该行输入的数据(不是显示的)
      console.log(index, row);
      this.dialogFormVisible = false;
      // row中数据可以直接用于发送ajax请求了...这边请求修改的api
      /*******************************/
      // 这里直接上传就行了, 不用多余操作
      axios.get("/api/books/", {
        params: {
          // 0代表默认操作
          gettype: 1,
          row,
        },
      });
    },
    handleImport(index, row) {
      console.log(index, row, this.importNum, this.importPrice); // 需要这两个数据, 因为需要知道进货了哪些
      this.importFormVisible = false;
      // row数据用于发送ajax请求, 注意把进货数量importNum和价格importPrice打包带走
      /*******************************/
      axios.get("/api/books/", {
        params: {
          gettype: 4,
          row,
          amount: this.importNum,
          price: this.importPrice,
        },
      });
    },
    handleSale(index, row) {
      this.saleFormVisible = false;
      console.log(index, row, this.saleNum); // 需要这两个数据, 因为需要知道买了哪本书
      // row数据用于发送ajax请求, 注意把销售数量saleNum带走
      /*******************************/
      if (row.remain >= this.saleNum) {
        axios.get("/api/books/", {
          params: {
            gettype: 2,
            row,
            saleNum: this.saleNum,
          },
        });
        row.remain -= this.saleNum;
      } else {
        alert("李在赣神魔!!!");
      }
    },
    onSubmit() {
      console.log(this.search.info, this.search.type);
      // 这里发送ajax请求把search发送上去就行了
      /*******************************/
      axios
        .get("/api/books/", {
          params: {
            gettype: 3,
            search: this.search,
          },
        })
        .then((res) => {
          this.tableData = res.data.res;
        });
      // 重置为1页码
      this.index = 1;
    },
    addNew() {
      this.newBookVisible=false;
      if (this.newBook.ISBN !== "") {
        axios.get("/api/books/", {
          params: {
            gettype: 5,
            newBook: this.newBook,
          },
        });
      }
    },
  },
};
</script>