<style lang="less" scoped src="./index.less" ></style>
<style lang="less">
body {
  background-color: #fafafc;
}
.storeAuthorization {
  .el-form-item__label {
    float: none;
  }
  .el-dialog__body {
    padding-top: 0;
  }
  .el-dialog {
    width: 63%;
    top: -10%;
  }
  .el-table--border,
  .el-table--group {
    margin-top: 5px;
  }
  .el-table th {
    padding: 8px 0px;
    font-size: 14px;
    color: #333;
  }
  .el-table td {
    padding: 0;
    color: #333;
  }
}
</style>
<template>
  <div class='storeAuthorization project'>
    <div class='title'>
      <div class='left'>
        <div class="tab-block">
          <div class='text1'>当前位置：门店授权管理</div>
          <div class="tab-block-inner">
            <el-input v-model="searchObj.search" class='query' placeholder="可按项目编号/项目名称进行查询"></el-input>
            <el-button @click="search" icon="el-icon-search" circle></el-button>
            <el-button type="primary" @click='showAdd(3)'>新增</el-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%" class="mt-30">
        <el-table-column prop="" label="序号" align='center' width="70px">
          <template slot-scope="scope">{{getIndex(scope)}}</template>
        </el-table-column>
        <el-table-column prop="store_code" label="门店编号" align='center' width="90px"></el-table-column>
        <el-table-column prop="gave_code" label="授权编号" align='center'></el-table-column>
        <el-table-column prop="store_name" label="门店名称" align='center'></el-table-column>
        <el-table-column prop="contact" label="门店店长" align='center'></el-table-column>
        <el-table-column prop="contact_tel" label="联系方式" align='center' width="110px"></el-table-column>
        <el-table-column prop="address" label="门店地址" align='center' width="230px"></el-table-column>
        <el-table-column prop="is_distribution" label="帐号分配" align='center' width="80px"></el-table-column>
        <el-table-column label="授权状态" align='center'>
          <template slot-scope="scope">{{ex_state (scope.row.ex_state)}}</template>
        </el-table-column>
        <el-table-column prop="start_time" label="授权开始时间" align='center'></el-table-column>
        <el-table-column prop="end_time" label="授权结束时间" align='center'></el-table-column>
        <el-table-column prop="operation" label="操作" align='center' width="170px">
          <template slot-scope="scope">
            <el-button type="text" @click='edit(scope.row,0)'>查看</el-button>
            <el-button type="text" @click='edit(scope.row,1)'>修改</el-button>
            <el-button type="text" @click='authorization(scope.row)'>申请授权</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background class='page' layout="prev, pager, next" :page-size="pageSize" :current-page="searchObj.page" :total="total" @current-change="pageChange">
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      searchObj: {
        search: "",
        tag_search: "",
        page: 1
      },
      pageSize: 0,
      total: 0,
      tableData: [],
      operationType: 0, //0 查看  1 修改
      store_id: ""
    };
  },
  mounted() {
    this.getStoreList();
  },
  methods: {
    async authorization(row) {
      this.$confirm("此操作将授权成功, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.api.applyAuth({ store_id: row.store_id });
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "授权申请成功!"
            });
          }
          this.getStoreList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消授权"
          });
        });
    },
    async edit(row, type) {
      this.$router.push({
        name: "seeInfo",
        query: {
          operationType: type,
          store_id: row.store_id
        }
      });
    },
    showAdd(type) {
      this.$router.push({
        name: "seeInfo",
        query: {
          operationType: type
        }
      });
    },
    getIndex(row) {
      let index = row.$index + 1 + (this.searchObj.page - 1) * this.pageSize;
      return index;
    },
    clickTip(index) {
      this.tipActiveIndex = index;
      this.searchObj.tag_search = index;
      this.search();
    },
    search() {
      this.searchObj.page = 1;
      this.getStoreList();
    },
    async getStoreList() {
      let res = await this.api.getStoreList(this.searchObj);
      if (res.code == 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageSize = res.data.per_page;
      }
    },
    accoutState(row) {},
    authorizationState(row) {},
    pageChange(page) {
      this.searchObj.page = page;
      this.getStoreList();
    },
    ex_state(row) {
      if (row == 1) {
        return "已授权";
      } else if (row == 2) {
        return "申请中";
      } else {
        return "未授权";
      }
    }
  }
};
</script>


