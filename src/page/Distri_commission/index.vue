<style lang="less" scoped src="./index.less"></style>
<style lang="less">
body {
  background-color: #fafafc;
}
.distri_commission {
  .el-table thead {
    color: #333;
  }
  .el-table--border,
  .el-table--group {
    margin-top: 20px;
  }
  .el-table th {
    padding: 5px 0px;
  }
  .el-table td {
    padding: 2px 0;
  }
  .el-dialog__body {
    padding-top: 0;
  }
}
</style>
<template>
  <div class='distri_commission'>
    <div class='title'>
      <div class='table-title'>
        <div class='text1'>当前位置：分销佣金管理</div>
        <div class="search-block">
          <el-input class='query' v-model="searchObj.search" placeholder="可按项目名称进行查询"></el-input>
          <el-button icon="el-icon-search" @click='getDistributionList' circle></el-button>
        </div>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="序号" align='center' width="70px">
        <template slot-scope="scope">{{getIndex(scope)}}</template>
      </el-table-column>
      <el-table-column prop="project_name" label="项目名称" align='center' width="120px"></el-table-column>
      <el-table-column prop="developer_name" label="房产商" align='center' width="150px"></el-table-column>
      <el-table-column prop="city" label="区域" align='center' width="100px"></el-table-column>
      <el-table-column prop="project_hold_name" label="项目负责人" align='center' width="100px"></el-table-column>
      <el-table-column prop="project_hold_phone" label="联系方式" align='center' width="110px"></el-table-column>
      <el-table-column prop="all_price" label="累计金额" align='center'></el-table-column>
      <el-table-column prop="y_price" label="已结金额" align='center'></el-table-column>
      <el-table-column prop="chargebacks_price" label="扣款金额" align='center'></el-table-column>
      <el-table-column prop="n_price" label="未结金额" align='center'></el-table-column>
      <el-table-column prop="notice" label="是否可申请退款" align='center' width="140px"></el-table-column>
      <el-table-column label="操作" align='center' width="180px">
        <template slot-scope="scope">
          <el-button type="text" @click='commissionApply(scope.row)'>佣金申请</el-button>
          <el-button type="text" @click='see(scope.row)'>查看佣金记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background class='page' layout="prev, pager, next" :page-size="limit" :current-page="searchObj.page" :total="total" @current-change="pageChange">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      project_id: "",
      searchObj: {
        serach: "",
        page: 1
      },
      limit: 10,
      total: 0
    };
  },
  mounted() {
    this.getDistributionList();
  },
  methods: {
    getIndex(row) {
      let index = row.$index + 1 + (this.searchObj.page - 1) * 10;
      return index;
    },
    see(row) {
      this.$router.push({
        name: "maidInfo",
        params: {
          project_id: row.project_id
        }
      });
    },
    commissionApply(row) {
      if (row.n_price == 0) {
        this.$message({
          type: "error",
          message: "暂无可申请未结佣金"
        });
        return;
      }
      this.$router.push({
        name: "commissionApply",
        params: {
          project_id: row.project_id,
          rule_id: row.rule_id
        }
      });
    },

    search() {
      this.searchObj.page = 1;
      this.getDistributionList();
    },
    pageChange(page) {
      this.searchObj.page = page;
      this.getDistributionList();
    },

    async getDistributionList() {
      let res = await this.api.getDistributionList(this.searchObj);
      if (res.code == 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
      }
    },
    state(row) {
      if (row == 1) {
        return "申请佣金";
      } else if (row == 2) {
        return "查看佣金详情 ";
      } else if (row == 3) {
        return "申请付款";
      } else if (row == 4) {
        return "重新申请付款";
      }
    }
  }
};
</script>


