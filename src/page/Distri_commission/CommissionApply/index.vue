<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.maidInfo {
  .el-form-item {
    margin: 0;
  }
}
</style>


<template>
  <div class='maidInfo'>
    <div class='table'>
      <div class='title'>
        <div class='title-text'>申请信息</div>
        <el-button class='pos-btn-1' type="primary" @click='sumbit(2)'>提交</el-button>
        <el-button class='pos-btn-2' type="primary" @click='sumbit(3)'>保存</el-button>
        <el-button class='pos-btn' @click='cancel' type="primary">关闭</el-button>
      </div>
      <el-form v-model="sumbitForm" class='form'>
        <el-form-item label="申请名称" class='row'>
          <el-input v-model="sumbitForm.batch_name" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="申请笔数" class='row'>
          <el-input v-model="sumbitForm.count_num" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="佣金金额（￥）：" class='row'>
          <el-input v-model="no_price" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <!-- <el-form-item label="扣款金额（￥）：" class='row' v-if='operationType==1'>
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

      <div class='title-text'>申请结佣列表</div>
      <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align='center'></el-table-column>
        <el-table-column prop="client_id" label="推荐编号" align='center' width="120px"></el-table-column>
        <el-table-column prop="name" label="经纪人名称" align='center' width="180px"></el-table-column>
        <el-table-column prop="tel" label="联系电话" align='center' width="180px"></el-table-column>
        <el-table-column prop="broker_type" label="佣金类型" align='center' width="180px">
          <template slot-scope="scope">{{type(scope.row.broker_type)}}</template>
        </el-table-column>
        <el-table-column prop="create_time" label="时间" align='center'></el-table-column>
        <el-table-column prop="broker_num" label="佣金金额" align='center' width="160px"></el-table-column>
        <!-- <el-table-column prop="project_hold_phone" label="扣款金额" align='center' v-if='operationType==1'></el-table-column>
        <el-table-column prop="all_price" label="审核金额" align='center' v-if='operationType==1'></el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      sumbitForm: {
        batch_name: "",
        nail_name: "",
        nail_tel: "",
        second_name: "",
        second_tel: "",
        broker_id: [],
        state: 3,
        count_num: ""
      },
      no_price: 0,
      rule_id: "",
      project_id: "",
      operationType: 0 // 1 修改  0 查看
    };
  },
  mounted() {
    this.project_id = this.$route.params.project_id;
    this.operationType = this.$route.params.operationType;
    if (!this.project_id) {
      this.$router.push({ name: "distri_commission" });
      return;
    }
    this.rule_id = this.$route.params.rule_id;
    this.getBrokerApply();
  },
  methods: {
    async sumbit(state) {
      let temp = Object.assign({}, this.sumbitForm);
      temp.project_id = this.project_id;
      temp.state = state;
      console.log(temp);
      let res = await this.api.brokerApply(temp);
      if (res.code == 200) {
         this.$router.push({ name: "distri_commission" });
      }
    },
    async getBrokerApply() {
      let res = await this.api.getBrokerApply({
        project_id: this.project_id,
        rule_id: this.rule_id
      });
      if (res.code == 200) {
        this.tableData = res.data;
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
    },
    handleSelectionChange(val) {
      let arr = [];
      let count = 0;
      for (let v of val) {
        count += v.broker_num;
        arr.push(v.broker_id);
      }
      this.sumbitForm.broker_id = arr.join(",");
      this.sumbitForm.count_num = arr.length;
      this.no_price = count;
    }
  }
};
</script>

