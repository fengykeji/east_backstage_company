<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.updateCommission {
  .el-form-item {
    margin: 0;
  }
}
</style>
<template>
  <div class='updateCommission'>
    <div class='table'>
      <div class='title'>
        <div class='title-text'>申请信息</div>
        <el-button class='pos-btn-1' type="primary" @click='sumbit(2)'>提交</el-button>
        <el-button class='pos-btn' @click='cancel' type="primary">关闭</el-button>
      </div>
      <el-form v-model="sumbitForm" class='form'>
        <el-form-item label="申请名称" class='row'>
          <el-input v-model="sumbitForm.batch_name" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="申请笔数" class='row'>
          <el-input v-model="sumbitForm.count_num" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="申请时间" class='row'>
          <el-input v-model="sumbitForm.create_time" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <!-- <el-form-item label="佣金金额（￥）：" class='row'>
          <el-input v-model="no_price" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="扣款金额（￥）：" class='row' v-if='operationType==1'>
          <el-input v-model="sumbitForm.allow" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="审核金额（￥）：" class='row' v-if='operationType==1'>
          <el-input v-model="sumbitForm.allow" auto-complete="off" class='input'></el-input>
        </el-form-item> -->
        <el-form-item label="甲方联系人" class='row'>
          <el-input v-model="sumbitForm.nail_name" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="甲方联系电话" class='row'>
          <el-input v-model="sumbitForm.nail_tel" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="乙方联系人" class='row'>
          <el-input v-model="sumbitForm.second_name" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="乙方联系电话" class='row'>
          <el-input v-model="sumbitForm.second_tel" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <!-- <el-form-item label="申请类型" class='row' v-if='operationType==1'>
          <el-input v-model="sumbitForm.allow" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="申请人员" class='row' v-if='operationType==1'>
          <el-input v-model="sumbitForm.allow" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="申请时间" class='row' v-if='operationType==1'>
          <el-input v-model="sumbitForm.allow" auto-complete="off" class='input'></el-input>
        </el-form-item> -->
      </el-form>
      <div class='title-text'>未结列表
        <el-button type="primary" @click='showAdd(scope.row)' class='add'>添加</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55" align='center'></el-table-column>
        <el-table-column prop="client_id" label="推荐编号" align='center' width="120px"></el-table-column>
        <el-table-column prop="name" label="经纪人名称" align='center' width="180px"></el-table-column>
        <el-table-column prop="tel" label="联系电话" align='center' width="180px"></el-table-column>
        <el-table-column prop="broker_type" label="佣金类型" align='center' width="180px">
          <template slot-scope="scope">{{type(scope.row.broker_type)}}</template>
        </el-table-column>
        <el-table-column prop="create_time" label="时间" align='center'></el-table-column>
        <el-table-column prop="broker_num" label="佣金金额" align='center' width="160px"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      sumbitForm: {},
      batch_id: "",
      state: "",
      searchObj: {
        search: ""
      }
    };
  },
  mounted() {
    this.state = this.$route.params.state;
    this.batch_id = this.$route.params.batch_id;
    this.updateBroker();
  },
  methods: {
    showAdd(row) {},
    async updateBroker() {
      let temp = Object.assign({}, this.sumbitForm);
      temp.batch_id = this.batch_id;
      temp.state = this.state;
      let res = await this.api.updateBroker(temp);
      if (res.code == 200) {
        this.tableData = res.data.brokerList;
        this.sumbitForm = res.data.brokerInfo;
      }
    },
    type(row) {
      if (row == 1) {
        return "成交";
      } else if (row == 2) {
        return "到访";
      } else if (row == 3) {
        return "推荐";
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

