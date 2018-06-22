<style lang="less" scoped src="./index.less"></style>
<style lang="less">
.distri_commission {
  .el-table--border,
  .el-table--group {
    margin-top: 20px;
  }
  .el-table th {
    padding: 8px 0px;
  }
  .el-table td {
    padding: 0;
  }
  .el-dialog__body {
    padding-top: 0;
  }
}
</style>
<template>
  <div class='distri_commission'>
    <div class='title'>
      <span class='left'>
        <div class='text1'>当前位置：分销佣金管理</div>
      </span>
      <el-input class='query'></el-input>
      <el-button icon="el-icon-search" circle></el-button>
    </div>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" align='center'> </el-table-column>
        <el-table-column prop="project_name" label="项目名称" align='center'></el-table-column>
        <el-table-column prop="begin_time" label="开始执行时间" align='center' width="110px"></el-table-column>
        <el-table-column prop="end_time" label="截至执行时间" align='center' width="110px"></el-table-column>
        <el-table-column prop="developer_name" label="房产商" align='center' width="140px"></el-table-column>
        <el-table-column prop="city" label="区域" align='center' width="80px"></el-table-column>
        <el-table-column prop="project_hold_name" label="项目负责人" align='center' width="100px"></el-table-column>
        <el-table-column prop="project_hold_phone" label="联系方式" align='center' width="110px"></el-table-column>
        <el-table-column prop="all_price" label="累计金额" align='center'></el-table-column>
        <el-table-column prop="y_price" label="已结金额" align='center'></el-table-column>
        <el-table-column prop="chargebacks_price" label="扣款金额" align='center'></el-table-column>
        <el-table-column prop="n_price" label="未结金额" align='center'></el-table-column>
        <el-table-column prop="state" label="状态" align='center'>
          <template slot-scope="scope">{{state(scope.row.state)}}</template>
        </el-table-column>
        <el-table-column prop="notice" label="提醒状态" align='center' width="100px"></el-table-column>
        <el-table-column label="操作" align='center' width="180px">
          <template slot-scope="scope">
            <el-button type="text" @click='see(scope.row)'>查看佣金记录</el-button>
            <el-button type="text" @click='commissionApply(scope.row)'>佣金申请</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getDistributionList();
  },
  methods: {
    see(row) {
      this.$router.push({
        name: "maidInfo"
      });
    },
    commissionApply(row) {
      this.$router.push({
        name: "commissionApply"
      });
    },

    async getDistributionList() {
      let res = await this.api.getDistributionList();
      if (res.code == 200) {
        this.tableData = res.data.data;
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


