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
        <el-form-item label="申请付款批次" class='row'>
          <el-input v-model="submitForm.batch_id" auto-complete="off" placeholder="请输入申请付款批次" class='input'></el-input>
        </el-form-item>
        <!-- <el-form-item label="审核金额(￥)：" class='row'>
                    <el-input v-model="submitForm.count_num" auto-complete="off" class='input'></el-input>
                </el-form-item>
                <el-form-item label="未结金额(￥)：" class='row'>
                    <el-input v-model="submitForm.create_time" auto-complete="off" class='input'></el-input>
                </el-form-item> -->

        <el-form-item label="收款银行：" class='row'>
          <el-input v-model="submitForm.recive_bank" auto-complete="off" class='input' placeholder="请输入收款银行"></el-input>
        </el-form-item>
        <el-form-item label="收款银行卡号：" class='row'>
          <el-input v-model="submitForm.recive_bank_card_id" auto-complete="off" class='input' placeholder="请输入收款银行卡号"></el-input>
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
          <!-- <el-input auto-complete="off" class='input' >{{type(submitForm.broker_type)}}</el-input> -->
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
      submitForm: {},
      batch_id: "",
      state: "",
      project_id:'',
    };
  },
  mounted() {
    this.batch_id = this.$route.params.batch_id;
    this.project_id = this.$route.params.project_id;
    this.state = this.$route.params.state;
    this.getPriceApply();
  },
  methods: {
    async sumbit() {
      let temp = {};
      temp.project_id = this.project_id;
      temp.batch_id = this.submitForm.batch_id;
      temp.recive_bank = this.submitForm.recive_bank;
      temp.recive_bank_card_id = this.submitForm.recive_bank_card_id;
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
        this.submitForm = res.data[0];
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
