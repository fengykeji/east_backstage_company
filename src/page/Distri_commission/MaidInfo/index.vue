<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.maidInfo {
  .el-table th {
    padding: 3px 0px;
     color: #333;
  }
  .el-table td {
    padding: 0px 0px;
     color: #333;
  }
}
</style>


<template>
  <div class='maidInfo'>
    <div class='table'>
      <div class='title'>
        <div class='title-text'>结佣申请列表</div>
        <el-button class='pos-btn' type="primary" @click='cancel'>关闭</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column property="id" label="序号" align='center' width="70px">
          <template slot-scope="scope">{{getIndex(scope)}}</template>
        </el-table-column>
        <el-table-column prop="batch_name" label="申请名称" align='center'></el-table-column>
        <el-table-column prop="broker_num" label="申请金额 (￥)" align='center'></el-table-column>
        <el-table-column prop="count_num" label="申请笔数" align='center'></el-table-column>
        <el-table-column prop="create_name" label="申请人员" align='center'></el-table-column>
        <el-table-column prop="create_time" label="申请时间" align='center' width="160px"></el-table-column>
        <el-table-column prop="state" label="申请状态" align='center'>
          <template slot-scope="scope">{{state(scope.row.state)}}</template>
        </el-table-column>
        <el-table-column label="操作" align='center' width="180px">
          <template slot-scope="scope">
            <el-button type='text' v-if="scope.row.state == 1" @click='requestPayment(scope.row,4)'>付款申请</el-button>
            <el-button type='text' @click='see(scope.row,0)'>查看</el-button>
            <el-button type='text' v-if="scope.row.state == 3" @click='see(scope.row,1)'>修改</el-button>
            <el-button type='text' v-if="scope.row.state == 0 || scope.row.state == 3" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background class='page' layout="prev, pager, next" :page-size="pageSize" :current-page="searchObj.page" :total="total" @current-change="pageChange">
      </el-pagination>
      <div class='title-text'>付款申请列表</div>
      <el-table :data="tableDataS" border style="width: 100%">
        <el-table-column property="id" label="序号" align='center' width="70px">
          <template slot-scope="scope">{{getIndex(scope)}}</template>
        </el-table-column>
        <el-table-column prop="batch_name" label="申请名称" align='center'></el-table-column>
        <el-table-column prop="broker_num" label="申请金额 (￥)" align='center'></el-table-column>
        <el-table-column prop="chargebacks_price" label="扣款金额(￥)" align='center'></el-table-column>
        <el-table-column prop="" label="审核金额(￥)" align='center' width="160px">
          <template slot-scope="scope">{{scope.row.broker_num - scope.row.chargebacks_price}}</template>
        </el-table-column>
        <el-table-column prop="count_num" label="申请笔数" align='center'></el-table-column>
        <el-table-column prop="create_name" label="申请人员" align='center'></el-table-column>
        <el-table-column prop="create_time" label="申请时间" align='center' width="160px"></el-table-column>
        <el-table-column prop="examine_state" label="审核状态" align='center'>
          <template slot-scope="scope">{{examineState(scope.row.examine_state)}}</template>
        </el-table-column>
        <el-table-column label="操作" align='center' width="140px">
          <template slot-scope="scope">
            <el-button type='text' @click='seePayment(scope.row,2)'>查看</el-button>
            <el-button type='text' v-if="scope.row.examine_state == 0" @click='seePayment(scope.row,3)'>重新申请</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background class='page' layout="prev, pager, next" :page-size="pageSize1" :current-page="searchObj.page" :total="total1" @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tableData: [],
      tableDataS: [],
      batch_id: "",
      searchObj: {
        page: 1
      },
      pageSize1: 0,
      total1: 0,
      pageSize: 0,
      total: 0,
      operationType: 0 // 1 修改  0 查看 2审核信息的查看
    };
  },
  mounted() {
    this.project_id = this.$route.params.project_id;
    this.operationType = this.$route.params.operationType;
    if (this.project_id === undefined) {
      this.$router.push({ name: "distri_commission" });
      return;
    }
    this.seeCommissionList();
  },
  methods: {
    requestPayment(row, type) {
      this.$router.push({
        name: "requestPayment",
        params: {
          project_id: this.project_id,
          batch_id: row.batch_id,
          state: row.state ? row.state : row.examine_state,
          batch_name: row.batch_name,
          operationType: type
        }
      });
    },
    getIndex(row) {
      let index = row.$index + 1 + (this.searchObj.page - 1) * this.pageSize;
      return index;
    },
    pageChange(page) {
      this.searchObj.page = page;
      this.changeProjectList();
    },
    async seeCommissionList(type) {
      let res = await this.api.seeCommissionList({
        project_id: this.project_id
      });
      if (res.code == 200) {
        this.tableData = res.data.broker.data;
        this.tableDataS = res.data.price.data;
        this.total = res.data.broker.total;
        this.pageSize = res.data.broker.per_page;
        this.total1 = res.data.price.total;
        this.pageSize1 = res.data.price.per_page;
      }
    },
    async see(row, type) {
      this.$router.push({
        name: "updateCommission",
        params: {
          project_id: this.project_id,
          operationType: this.operationType,
          batch_id: row.batch_id,
          state: row.state,
          operationType: type
        }
      });
    },
    async seePayment(row, type) {
      this.$router.push({
        name: "updateCommission",
        params: {
          project_id: this.project_id,
          operationType: this.operationType,
          apply_id: row.apply_id,
          batch_id: row.batch_id,
          operationType: type
        }
      });
    },
    remove(item) {
      this.$confirm("此操作将删除结佣申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let temp = {};
          temp.batch_id = item.batch_id;
          temp.state = item.state;
          let res = await this.api.delBroker(temp);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.seeCommissionList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除结佣申请"
          });
        });
    },
    examineState(row) {
      if (row == 0) {
        return "拒绝";
      } else if (row == 1) {
        return "通过";
      } else if (row == 2) {
        return "待审核";
      }
    },
    state(row) {
      if (row == 0) {
        return "拒绝";
      } else if (row == 1) {
        return "通过 ";
      } else if (row == 2) {
        return "待审核";
      } else if (row == 3) {
        return "待提交";
      }
    },
    cancel() {
      this.$router.push({
        name: "distri_commission"
      });
    }
  }
};
</script>

