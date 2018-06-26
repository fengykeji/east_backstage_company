<style lang="less" scoped src='./index.less'>
</style>


<template>
  <div class='maidInfo'>
    <div class='table'>
      <div class='title'>
        <div class='title-text'>结佣申请列表</div>
        <el-button class='pos-btn' type="primary" @click='cancel'>关闭</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="batch_name" label="申请名称" align='center'></el-table-column>
        <el-table-column prop="broker_num" label="申请金额 (￥)" align='center'></el-table-column>
        <el-table-column prop="count_num" label="申请笔数" align='center'></el-table-column>
        <el-table-column prop="create_name" label="申请人员" align='center'></el-table-column>
        <el-table-column prop="create_time" label="申请时间" align='center' width="160px"></el-table-column>
        <el-table-column prop="auditing_name" label="审核人员" align='center'></el-table-column>
        <el-table-column prop="auditing_time" label="审核时间" align='center' width="160px"></el-table-column>
        <el-table-column prop="state" label="申请状态" align='center'>
          <template slot-scope="scope">{{state(scope.row.state)}}</template>
        </el-table-column>
        <el-table-column label="操作" align='center' width="220px">
          <template slot-scope="scope">
            <el-button type='text' v-if="scope.row.state == 1" @click='requestPayment(scope.row)'>付款申请</el-button>
            <el-button type='text' @click='see(scope.row,0)'>查看</el-button>
            <el-button type='text' v-if="scope.row.state == 3" @click='see(scope.row,1)'>修改</el-button>
            <el-button type='text' v-if="scope.row.state == 0 || scope.row.state == 3" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class='title-text'>付款申请列表</div>
      <el-table :data="tableDataS" border style="width: 100%">
        <el-table-column prop="project_code" label="项目编号" align='center'></el-table-column>
        <el-table-column prop="project_name" label="项目名称" align='center'></el-table-column>
        <el-table-column prop="begin_time" label="开始执行时间" align='center'></el-table-column>
        <el-table-column prop="end_time" label="截至执行时间" align='center'></el-table-column>
        <el-table-column prop="developer_name" label="房产商" align='center' width="130px"></el-table-column>
        <el-table-column prop="city" label="区域" align='center'></el-table-column>
        <el-table-column prop="project_hold_name" label="项目负责人" align='center' width="110px"></el-table-column>
        <el-table-column prop="project_hold_phone" label="联系方式" align='center' width="110px"></el-table-column>
        <el-table-column prop="all_price" label="累计金额" align='center'></el-table-column>
        <el-table-column prop="y_price" label="已结金额" align='center'></el-table-column>
        <el-table-column prop="chargebacks_price" label="扣款金额" align='center'></el-table-column>
        <el-table-column prop="n_price" label="未结金额" align='center'></el-table-column>
        <el-table-column prop="notice" label="提醒状态" align='center' width="100px"></el-table-column>
        <el-table-column prop="state" label="状态" align='center'>
          <template slot-scope="scope">{{state(scope.row.state)}}</template>
        </el-table-column>
        <el-table-column label="操作" align='center' width="140px">
          <template slot-scope="scope">
            <el-button type='text'>查看</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      operationType: 0 // 1 修改  0 查看
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
    async requestPayment(row) {
      this.$router.push({
        name: "requestPayment",
        params: {
          project_id: this.project_id,
          batch_id: row.batch_id,
          state: row.state,
          batch_name:row.batch_name,
        }
      });
    },
    async seeCommissionList(type) {
      let res = await this.api.seeCommissionList({
        project_id: this.project_id
      });
      if (res.code == 200) {
        this.tableData = res.data.broker.data;
      }
    },
    async see(row, type) {
      if (type == 1) {
        this.$router.push({
          name: "updateCommission",
          params: {
            project_id: this.project_id,
            batch_id: row.batch_id,
            state: row.state,
            operationType: type
          }
        });
      } else if (type == 0) {
        this.$router.push({
          name: "updateCommission",
          params: {
            project_id: this.project_id,
            batch_id: row.batch_id,
            state: row.state,
            operationType: type
          }
        });
      }
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

