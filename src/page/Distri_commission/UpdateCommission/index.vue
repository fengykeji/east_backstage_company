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
        <el-button class='pos-btn-1' v-if="operationType==1" type="primary" @click='sumbit(2)'>提交</el-button>
        <el-button class='pos-btn' @click='cancel' type="primary">关闭</el-button>
      </div>
      <el-form v-model="submitForm" class='form' :disabled="operationType==0">
        <el-form-item label="申请名称" class='row'>
          <el-input v-model="submitForm.batch_name" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="申请笔数" class='row'>
          <el-input v-model="submitForm.count_num" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="申请时间" class='row'>
          <el-input v-model="submitForm.create_time" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="佣金金额（￥）：" class='row'>
          <el-input v-model="no_price" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <!-- <el-form-item label="扣款金额（￥）：" class='row' v-if='operationType==1'>
          <el-input v-model="submitForm.allow" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="审核金额（￥）：" class='row' v-if='operationType==1'>
          <el-input v-model="submitForm.allow" auto-complete="off" class='input'></el-input>
        </el-form-item> -->
        <el-form-item label="甲方联系人" class='row'>
          <el-input v-model="submitForm.nail_name" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="甲方联系电话" class='row'>
          <el-input v-model="submitForm.nail_tel" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="乙方联系人" class='row'>
          <el-input v-model="submitForm.second_name" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="乙方联系电话" class='row'>
          <el-input v-model="submitForm.second_tel" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <!-- <el-form-item label="申请类型" class='row' v-if='operationType==1'>
          <el-input v-model="submitForm.allow" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="申请人员" class='row' v-if='operationType==1'>
          <el-input v-model="submitForm.allow" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="申请时间" class='row' v-if='operationType==1'>
          <el-input v-model="submitForm.allow" auto-complete="off" class='input'></el-input>
        </el-form-item> -->
      </el-form>
      <div class='title-text'>申请结佣列表
        <el-button type="primary" v-if="operationType==1" @click='showAdd(scope.row)' class='add'>添加</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column v-if="operationType==1" type="selection" width="55" align='center'></el-table-column>
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
      operationType: 0,
      submitForm: {},
      batch_id: "",
      state: "", //2为提交  3为只是保存
      batch_name: "",
      nail_name: "",
      nail_tel: "",
      second_name: "",
      second_tel: "",
      no_price: 0,
      searchObj: {
        search: ""
      }
    };
  },
  mounted() {
    this.operationType = this.$route.params.operationType;
    this.state = this.$route.params.state;
    this.batch_id = this.$route.params.batch_id;
    if (this.batch_id === undefined) {
      this.$router.push({ name: "distri_commission" });
      return;
    }
    this.updateBroker();
  },
  methods: {
    showAdd(row) {},
    async sumbit(state) {
      let temp = {};
      temp.state = state;
      temp.batch_id = this.submitForm.batch_id;
      temp.batch_name = this.submitForm.batch_name;
      temp.nail_name = this.submitForm.nail_name;
      temp.nail_tel = this.submitForm.nail_tel;
      temp.second_name = this.submitForm.second_name;
      temp.second_tel = this.submitForm.second_tel;
      let res = await this.api.updateBrokerSumbit(temp);
      if (res.code == 200) {
      }
      this.$router.push({ name: "distri_commission" });
    },
    async updateBroker() {
      let temp = Object.assign({}, this.submitForm);
      temp.batch_id = this.batch_id;
      temp.state = this.state;
      let res = {};
      if (this.operationType == 1) {
        res = await this.api.updateBroker(temp);
      } else {
        res = await this.api.getBrokerInfo(temp);
      }
      if (res.code == 200) {
        this.tableData = res.data.brokerList;
        this.$nextTick(() => {
          for (let data of this.tableData) {
            this.$refs.multipleTable.toggleRowSelection(data);
          }
        });

        this.submitForm = res.data.brokerInfo[0];
      }
    },
    handleSelectionChange(val) {
      let arr = [];
      let count = 0;
      for (let v of val) {
        count += v.broker_num;
        arr.push(v.broker_id);
      }
      this.submitForm.broker_id = arr.join(",");
      this.submitForm.count_num = arr.length;
      this.no_price = count;
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
        name: "maidInfo",
        params: this.$route.params
      });
    }
  }
};
</script>

