<style lang="less" scoped>
.paymentRequest {
  margin-top: 90px;
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
      <el-form :model="submitForm" class='form' :rules="rules" ref="submitForm">
        <el-form-item label="申请付款批次名称" class='row'>
          <el-input :disabled="true" v-model="submitForm.batch_name" auto-complete="off" placeholder="请输入申请付款批次名称" class='input'></el-input>
        </el-form-item>
        <el-form-item label="收款银行" class='row' prop="recive_bank">
          <el-select v-model="submitForm.recive_bank" placeholder="请选择收款银行" @change="getBankOptions">
            <el-option v-for="item in bankOptions" :key="item.param_id" :label="item.param" :value="item.param"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款银行卡号：" class='row' prop="recive_bank_card">
          <el-input v-model="submitForm.recive_bank_card" auto-complete="off" class='input' placeholder="请输入收款银行卡号"></el-input>
        </el-form-item>
        <el-form-item label="收款户名：" class='row' prop="recive_name">
          <el-input v-model="submitForm.recive_name" auto-complete="off" class='input' placeholder="请输入收款户名"></el-input>
        </el-form-item>
        <el-form-item label="申请付款金额(￥)：" class='row'>
          <el-input :disabled="true" v-model="submitForm.broker_num" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="申请人员：" class='row'>
          <el-input :disabled="true" v-model="submitForm.name" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="申请时间：" class='row'>
          <el-input :disabled="true" v-model="submitForm.create_time" auto-complete="off" class='input'></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rules: {
        recive_bank: [
          { required: true, message: "请选择收款银行", change: "change" },
          {
            max: 20,
            message: "最大长度为20个字符",
            trigger: "change"
          }
        ],
        recive_name: [
          { required: true, message: "请输入收款户名", change: "change" },
          {
            pattern: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
            message: "最大长度为5个字符",
            trigger: "change"
          }
        ],
        recive_bank_card: [
          { required: true, message: "请输入收款银行卡号", change: "change" },
          {
            pattern: /^([1-9]{1})(\d{14}|\d{18})$/,
            message: "请输入正确的银行卡号",
            change: "change"
          }
        ]
      },
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
      bankOptions: [],
      operationType: 0
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
      let res = await this.api.getBack({ param_id: param_id });
      if (res.code == 200) {
        this.bankOptions = res.data;
      }
    },
    sumbit() {
      this.$refs["submitForm"].validate(async valid => {
        if (valid) {
          this.$confirm("此操作将提交付款申请, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(async () => {
              let temp = {};
              temp.project_id = this.project_id;
              temp.batch_id = this.batch_id;
              temp.recive_bank = this.submitForm.recive_bank;
              temp.recive_bank_card = this.submitForm.recive_bank_card;
              temp.recive_name = this.submitForm.recive_name;
              let res = await this.api.priceApplySumbit(temp);
              if (res.code == 200) {
                this.$message({ type: "success", message: "提交成功!" });
                this.$router.push({ name: "maidInfo" });
              } else {
                this.$message({ type: "error", message: "提交失败" });
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消提交申请付款"
              });
            });
        } else {
          return false;
        }
      });
    },

    async getPriceApply() {
      console.log(this.state);
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
