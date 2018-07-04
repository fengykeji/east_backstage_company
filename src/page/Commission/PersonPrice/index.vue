<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.personPrice {
  .el-table--border,
  .el-table--group {
    margin-top: 10px;
  }
  .el-table th {
    padding: 8px 0px;
    color: #333;
  }
  .el-table td {
    padding: 5px 0;
    color: #333;
  }
  .el-dialog__body {
    padding-top: 0;
  }
}
</style>
<template>
  <div class='personPrice'>
    <div class='table' v-if='personType==0'>
      <div class='title'>
        <span class='title-text'>个人累计列表</span>
        <span class='search-block'>
          <span>
            <el-input v-model="searchObj.search" class='query' placeholder="可查询推荐编号/经纪人名称"></el-input>
            <el-button @click="getPersonInfoList" icon="el-icon-search" circle class='mt-10'></el-button>
          </span>
          <el-button class='pos-btn' type="primary" @click='cancel'>关闭</el-button>
        </span>
      </div>
      <div class='text'>
        <span class='price'>累计金额:{{sumbitForm.total_price}}</span>
        <span class='price'>累计笔数:{{sumbitForm.count}}笔</span>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="" label="序号" align='center' width="70px">
          <template slot-scope="scope">{{getIndex(scope)}}</template>
        </el-table-column>
        <el-table-column prop="client_id" label="推荐编号" align='center'></el-table-column>
        <el-table-column prop="project_name" label="项目名称" align='center'></el-table-column>
        <el-table-column prop="house_info" label="房间号" align='center'></el-table-column>
        <el-table-column prop="name" label="经纪人名称" align='center'></el-table-column>
        <el-table-column prop="tel" label="联系电话" align='center'></el-table-column>
        <el-table-column prop="broker_type" label="佣金类型" align='center'>
          <template slot-scope="scope">{{brokerType(scope.row.broker_type)}}</template>
        </el-table-column>
        <el-table-column prop="create_time" label="时间" align='center' width="160px"></el-table-column>
        <el-table-column prop="broker_num" label="佣金金额" align='center'></el-table-column>
        <el-table-column prop="commission_way" label="计算规则" align='center' width="120px"></el-table-column>
        <el-table-column prop="pay_state" label="状态" align='center'>
          <template slot-scope="scope">{{state(scope.row.pay_state)}}</template>
        </el-table-column>
        <el-table-column prop="create_time" label="确认时间" align='center' width="160px"></el-table-column>
      </el-table>
      <el-pagination background class='page' layout="prev, pager, next" :page-size="pageSize" :current-page="searchObj.page" :total="total" @current-change="pageChange">
      </el-pagination>
    </div>
    <div class='table' v-if='personType==1'>
      <div class='title'>
        <span class='title-text'>个人已结列表</span>
        <el-input v-model="searchObj.search" class='query' placeholder="可查询付款单据号"></el-input>
        <el-button @click="getPersonInfoList" icon="el-icon-search" circle></el-button>
        <el-button class='pos-btn' type="primary" @click='cancel'>关闭</el-button>
      </div>
      <div class='text'>
        <span class='price'>已结金额:{{sumbitForm.total_price}}</span>
        <span class='price'>已结笔数:{{sumbitForm.count}}笔</span>
      </div>
      <el-table :data="tableDataS" border style="width: 100%">
        <el-table-column prop="" label="序号" align='center' width="70px">
          <template slot-scope="scope">{{getIndex(scope)}}</template>
        </el-table-column>
        <el-table-column prop="batch_name" label="批次名称" align='center'></el-table-column>
        <el-table-column prop="apply_name" label="申请人员" align='center'></el-table-column>
        <el-table-column prop="create_time" label="申请时间" align='center'></el-table-column>
        <el-table-column prop="broker_num" label="申请金额" align='center' width="80px"></el-table-column>
        <el-table-column prop="chargebacks_price" label="扣款金额" align='center' width="80px"></el-table-column>
        <el-table-column label="审核金额" align='center'>
          <template slot-scope="scope">{{scope.row.broker_num-scope.row.chargebacks_price}}</template>
        </el-table-column>
        <el-table-column prop="check_name" label="审核人员" align='center'></el-table-column>
        <el-table-column prop="check_time" label="审核时间" align='center'></el-table-column>
        <el-table-column prop="document_num" label="付款单据号" align='center' width="110px"></el-table-column>
        <el-table-column prop="recive_bank" label="收款银行" align='center'></el-table-column>
        <el-table-column prop="recive_bank_card" label="收款银行卡号" align='center' width="120px"></el-table-column>
        <el-table-column prop="recive_name" label="收款户名" align='center'></el-table-column>
        <el-table-column prop="update_time" label="确认时间" align='center'></el-table-column>
      </el-table>
      <el-pagination background class='page' layout="prev, pager, next" :page-size="pageSize" :current-page="searchObj.page" :total="total" @current-change="pageChange">
      </el-pagination>
    </div>
    <div class='table' v-if='personType==2'>
      <div class='title'>
        <span class='title-text'>个人未结列表</span>
        <span class='search-block'>
          <span>
            <el-input v-model="searchObj.search" class='query' placeholder="可查询推荐编号/经纪人名称"></el-input>
            <el-button @click="getPersonInfoList" icon="el-icon-search" circle class='mt-10'></el-button>
          </span>
          <el-button class='pos-btn' type="primary" @click='cancel'>关闭</el-button>
        </span>
      </div>
      <div class='text'>
        <span class='price'>未结金额:{{sumbitForm.total_price}}</span>
        <span class='price'>未结笔数:{{sumbitForm.count}}笔</span>
      </div>
      <el-table :data="tableDataSa" border style="width: 100%">
        <el-table-column prop="" label="序号" align='center' width="70px">
          <template slot-scope="scope">{{getIndex(scope)}}</template>
        </el-table-column>
        <el-table-column prop="client_id" label="推荐编号" align='center'></el-table-column>
        <el-table-column prop="project_name" label="项目名称" align='center'></el-table-column>
        <el-table-column prop="house_info" label="房间号" align='center'></el-table-column>
        <el-table-column prop="name" label="经纪人名称" align='center' width="110px"></el-table-column>
        <el-table-column prop="tel" label="联系电话" align='center'></el-table-column>
        <el-table-column prop="broker_type" label="佣金类型" align='center'>
          <template slot-scope="scope">{{brokerType(scope.row.broker_type)}}</template>
        </el-table-column>
        <!-- <el-table-column prop="create_time" label="时间" align='center' width="160px"></el-table-column> -->
        <el-table-column prop="broker_num" label="佣金金额" align='center'></el-table-column>
        <el-table-column prop="commission_way" label="计算规则" align='center'></el-table-column>
        <el-table-column prop="create_time" label="确认时间" align='center' width="160px"></el-table-column>
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
      tableData: [],
      tableDataS: [],
      tableDataSa: [],
      project_id: "",
      company_rule_id: "",
      searchObj: {
        search: "",
        page: 1
      },
      pageSize: 0,
      total: 0,
      sumbitForm: {
        total_price: "",
        count: ""
      },
      personType: 0 //0公司累计金额   1  公司已结金额  2 公司未结金额
    };
  },
  mounted() {
    this.company_id = this.$route.params.company_id;
    this.personType = this.$route.params.personType;
    this.project_id = this.$route.params.project_id;
    if (!this.project_id) {
      this.$router.push({ name: "commission" });
      return;
    }
    this.company_rule_id = this.$route.params.company_rule_id;
    this.getPersonInfoList();
  },
  methods: {
    pageChange(page) {
      this.searchObj.page = page;
      this.getPersonInfoList();
    },
    getIndex(row) {
      let index = row.$index + 1 + (this.searchObj.page - 1) * this.pageSize;
      return index;
    },
    search() {
      this.searchObj.page = 1;
      this.getPersonInfoList();
    },
    async getPersonInfoList() {
      if (this.personType == 0) {
        let res = await this.api.getPersonInfoList({
          project_id: this.project_id,
          search: this.searchObj.search,
          page: this.searchObj.page
        });
        if (res.code == 200) {
          this.tableData = res.data.broker_info.data;
          this.sumbitForm.total_price = res.data.total_price;
          this.sumbitForm.count = res.data.count;
          this.total = res.data.broker_info.total;
          this.pageSize = res.data.broker_info.per_page;
        }
      } else if (this.personType == 2) {
        //   else if (this.personType == 1) {
        //     let res = await this.api.getCompanyYInfo({
        //       project_id: this.project_id,
        //       company_id: this.company_id,
        //       search: this.searchObj.search
        //     });
        //     if (res.code == 200) {
        //       this.tableDataS = res.data.batch_list.data;
        //       this.sumbitForm.total_price = res.data.total_price;
        //       this.sumbitForm.count = res.data.count;
        //     }
        //   }
        let res = await this.api.getPersonNInfo({
          project_id: this.project_id,
          search: this.searchObj.search,
          page: this.searchObj.page
        });
        if (res.code == 200) {
          this.tableDataSa = res.data.broker_info.data;
          this.sumbitForm.total_price = res.data.total_price;
          this.sumbitForm.count = res.data.count;
          this.total = res.data.broker_info.total;
          this.pageSize = res.data.broker_info.per_page;
        }
      }
    },
    cancel() {
      this.$router.push({
        name: "commission",
        params: this.$route.params
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
