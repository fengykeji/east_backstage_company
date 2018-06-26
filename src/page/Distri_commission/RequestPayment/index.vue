<style lang="less" scoped>
.paymentRequest {
  margin-top: 50px;
  margin-left: 180px;
  .table {
    margin: 0 auto;
    width: 1000px;
    text-align: left;
    position: relative;
    padding-top: 20px;
    .text {
      font-size: 20px;
      padding-bottom: 20px;
    }
    .btn {
      position: absolute;
      right: 0;
      top: 15px;
    }
    .form {
      border: 1px solid #eee;
      padding: 10px 20px;
      .row {
        display: inline-block;
        padding-right: 20px;
        .input {
          width: 200px;
        }
      }
    }
  }
}
</style>
<template>
  <div class='paymentRequest'>
    <div class='table'>
      <div class='text'>付款申请信息</div>
      <div class='btn'>
        <el-button type='primary' @click='sumbit'>提交</el-button>
        <el-button @click="cancel" type='primary'>关闭</el-button>
      </div>
      <el-form v-model="submitForm" class='form'>
        <el-form-item label="申请付款批次名称" class='row'>
          <el-input v-model="submitForm.batch_name" auto-complete="off" placeholder="请输入申请付款批次名称" class='input'></el-input>
        </el-form-item>
        <!-- <el-form-item label="审核金额(￥)：" class='row'>
                    <el-input v-model="submitForm.count_num" auto-complete="off" class='input'></el-input>
                </el-form-item>
                <el-form-item label="未结金额(￥)：" class='row'>
                    <el-input v-model="submitForm.create_time" auto-complete="off" class='input'></el-input>
                </el-form-item> -->
        <el-form-item label="收款银行" class='row' prop="payee_bank">
          <el-select v-model="submitForm.recive_bank" placeholder="请选择收款银行" @change="getBankOptions">
            <el-option v-for="item in bankOptions" :key="item.param_id" :label="item.param" :value="item.param"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款银行卡号：" class='row'>
          <el-input v-model="submitForm.recive_bank_card" auto-complete="off" class='input' placeholder="请输入收款银行卡号"></el-input>
        </el-form-item>
        <el-form-item label="收款户名：" class='row'>
          <el-input v-model="submitForm.recive_name" auto-complete="off" class='input' placeholder="请输入收款户名"></el-input>
        </el-form-item>
        <el-form-item label="申请付款金额(￥)：" class='row'>
          <el-input v-model="submitForm.broker_num" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="申请人员：" class='row'>
          <el-input v-model="submitForm.name" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="申请时间：" class='row'>
          <el-input v-model="submitForm.create_time" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="佣金类型" class='row'>
          <span>{{type(submitForm.broker_type)}}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      submitForm: {
        batch_name: "",
        recive_bank: "",
        recive_bank_card: "",
        recive_name: "",
        broker_num: "",
        name: "",
        create_time: "",
        broker_type: ""
      },
      batch_id: "",
      state: "",
      project_id: "",
      bankOptions: []
    };
  },
  mounted() {
    this.submitForm.batch_name = this.$route.params.batch_name;
    this.batch_id = this.$route.params.batch_id;
    this.project_id = this.$route.params.project_id;
    this.state = this.$route.params.state;
    if (this.batch_id === undefined) {
      this.$router.push({ name: "distri_commission" });
      return;
    }
    this.getPriceApply();
    this.getBankOptions();
  },
  methods: {
    async getBankOptions(param_id) {
      let res = await this.api.getBack({param_id:param_id});
      if (res.code == 200) {
        this.bankOptions = res.data;
      }
    },
    async sumbit() {
      let temp = {};
      temp.project_id = this.project_id;
      temp.batch_id = this.batch_id;
      temp.recive_bank = this.submitForm.recive_bank;
      temp.recive_bank_card = this.submitForm.recive_bank_card;
      temp.recive_name = this.submitForm.recive_name;
      let res = await this.api.priceApplySumbit(temp);
      if (res.code == 200) {
        this.$router.push({ name: "distri_commission" });
      }
    },
    async getPriceApply() {
      let res = await this.api.getPriceApply({
        batch_id: this.batch_id,
        state: this.state
      });
      if (res.code == 200) {
        Object.assign(this.submitForm, res.data[0]);
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
        name: "maidInfo",
        params: this.$route.params
      });
    }
  }
};
</script>
