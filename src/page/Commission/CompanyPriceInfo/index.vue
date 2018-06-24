<style lang="less" scoped>
.companyPriceInfo {
  .table {
    margin: 50px 100px 50px 200px;
    .text {
      font-size: 15px;
      text-align: left;
      padding-bottom: 10px;
      .price {
        padding-right: 20px;
      }
    }
    .title {
      position: relative;
      padding-bottom: 20px;
      text-align: left;
      .title-text {
        padding-right: 360px;
        font-size: 20px;
        padding-bottom: 15px;
      }
      .pos-btn {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    .query {
      width: 300px;
    }
  }
}
</style>
<style lang="less">
.companyPriceInfo {
  .el-table--border,
  .el-table--group {
    margin-top: 20px;
  }
  .el-table th {
    padding: 8px 0px;
  }
  .el-table td {
    padding: 5px 0;
  }
  .el-dialog__body {
    padding-top: 0;
  }
}
</style>
<template>
    <div class='companyPriceInfo'>
        <div class='table'>
            <div class='title'>
                <span class='title-text'>链家公司累计列表</span>
                <el-input v-model="searchObj.search" class='query' placeholder="可查询推荐编号/经纪人名称"></el-input>
                <el-button @click="getCompanyAllInfo" icon="el-icon-search" circle></el-button>
                <el-button class='pos-btn' type="primary" @click='cancel'>关闭</el-button>
            </div>
            <div class='text'>
                <span class='price'>累计金额:{{sumbitForm.total_price}}</span>
                <span class='price'>累计笔数:{{sumbitForm.count}}笔</span>
            </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="" label="序号" align='center' width="70px"></el-table-column>
                <el-table-column prop="client_id" label="推荐编号" align='center'></el-table-column>
                <el-table-column prop="project_name" label="项目名称" align='center'></el-table-column>
                <el-table-column prop="house_info" label="房间号" align='center'></el-table-column>
                <el-table-column prop="name" label="经纪人名称" align='center' width="110px"></el-table-column>
                <el-table-column prop="tel" label="联系电话" align='center'></el-table-column>
                <el-table-column prop="broker_type" label="佣金类型" align='center'>
                    <template slot-scope="scope">{{brokerType(scope.row.broker_type)}}</template>
                </el-table-column>
                <el-table-column prop="create_time" label="时间" align='center' width="160px"></el-table-column>
                <el-table-column prop="broker_num" label="佣金金额" align='center'></el-table-column>
                <el-table-column prop="commission_way" label="计算规则" align='center'></el-table-column>
                <el-table-column prop="pay_state" label="状态" align='center'>
                    <template slot-scope="scope">{{state(scope.row.pay_state)}}</template>
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
      project_id: "",
      company_rule_id: "",
      searchObj: {
        search: ""
      },
      sumbitForm: {
        total_price: "",
        count: ""
      }
    };
  },
  mounted() {
    this.project_id = this.$route.params.project_id;
    if (!this.project_id) {
      this.$router.push({ name: "companyPrice" });
      return;
    }
    this.company_rule_id = this.$route.params.company_rule_id;
    this.getCompanyAllInfo();
  },
  methods: {
    async getCompanyAllInfo() {
      let res = await this.api.getCompanyAllInfo({
        project_id: this.project_id,
        company_rule_id: this.company_rule_id,
        search: this.searchObj.search
      });
      if (res.code == 200) {
        this.tableData = res.data.data;
        this.sumbitForm.total_price = res.data.data.total_price;
        this.sumbitForm.count = res.data.data.count;
      }
    },
    cancel() {
      this.$router.push({
        name: "companyPrice",
        params:this.$route.params,
      });
    },
    brokerType(row) {
      if (row == 1) {
        return "成交";
      } else if (row == 2) {
        return "到访";
      } else if (row == 3) {
        return "推荐";
      }
    },
    state(row) {
      if (row == 1) {
        return "已经付款";
      } else if (row == 2) {
        return "未付款";
      } else if (row == 0) {
        return "付款失败";
      }
    }
  }
};
</script>
