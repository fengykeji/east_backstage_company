<style lang="less" >
.requestRefund {
  width: 960px;
  margin: 50px auto 0;
  display: inline-block;
  text-align: left;
  .el-form-item {
    margin-bottom: 5px;
  }
  .text {
    margin-top: 6%;
    font-size: 18px;
    position: relative;
    padding-bottom: 10px;
  }
  .btn {
    position: absolute;
    top: 0;
    right: 0;
  }
  .table {
    margin-top: 15px;
    border: 1px solid #eee;
    padding: 20px 30px;
    .input {
      width: 200px;
      display: inline-block;
      padding-right: 20px;
    }
    .input1 {
      width: 300px;
    }
  }
}
</style>
<template>
  <div class='requestRefund'>
    <!-- <button @click="go">查看退款</butston> -->
    <div>
      <div class='text'>
        申请退款
        <span class='btn'>
          <el-button type="primary" @click="submit">确定</el-button>
          <el-button @click="close">返回</el-button>
        </span>
      </div>

      <el-form :model="requestRefund" class='table' :rules="rules" ref="requestRefund">
        <el-form-item label="可退金额" class='input1'>
          <div> {{allow}} </div>
          <!-- <el-button type='text' class='text'>查看</el-button> -->
        </el-form-item>
        <el-form-item label="本次退款金额" class='input' prop="price">
          <el-input v-model="requestRefund.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收款银行" class='input' prop="payee_bank">
          <el-select v-model="requestRefund.payee_bank" placeholder="请选择收款银行" class='select-1' @change="getBankOptions">
            <el-option v-for="item in bankOptions" :key="item.param_id" :label="item.param" :value="item.param"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款银行卡号" class='input' prop="payee_account">
          <el-input v-model="requestRefund.payee_account" class='input'></el-input>
        </el-form-item>
        <el-form-item label="收款人" class='input' prop="payee">
          <el-input v-model="requestRefund.payee" class='input'></el-input>
        </el-form-item>
        <el-form-item label="退款原因" class='input1' prop='refund_remarks'>
          <el-input v-model="requestRefund.refund_remarks" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="备注" class='input1'>
          <el-input v-model="requestRefund.remark" type="textarea"></el-input>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requestRefund: {
        project_id: "",
        price: "",
        refund_remarks: "",
        payee: "",
        payee_account: "",
        remark: "",
        payee_bank: ""
      },
      allow: "",
      bankOptions: [],
      rules: {
        price: [
          { required: true, message: "请输入退款金额", change: "change" },
          {
            pattern: /^[0-9]+(.[0-9]{1,2})?$/,
            message: "请输入正确的金额",
            change: "change"
          }
        ],
        payee: [
          { required: true, message: "请输入收款人姓名", change: "change" },
          {
            pattern: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
            message: "最大长度为6个字符",
            trigger: "change"
          }
        ],
        payee_account: [
          { required: true, message: "请输入收款人账号", change: "change" },
          {
            pattern: /^([1-9]{1})(\d{14}|\d{18})$/,
            message: "请输入正确的银行卡号",
            change: "change"
          }
        ],
        payee_bank: [
          { required: true, message: "请选择收款银行", change: "change" },
          {
            max: 20,
            message: "最大长度为20个字符",
            trigger: "change"
          }
        ],
        refund_remarks: [
          { required: true, message: "请输入退款原因", change: "change" },
          {
            max: 255,
            message: "最大长度为255个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    this.getBankOptions();
    let params = this.$route.params;
    if (params.project_id === undefined) {
      this.$router.push({ name: "project" });
    }
    Object.assign(this.requestRefund, params.project_id);
    this.requestRefund.project_id = params.project_id;
    this.allow = params.allow;
  },
  methods: {
    close() {
      this.$router.push({ name: "addProject", params: this.$route.params });
    },
    async submit() {
      this.$refs["requestRefund"].validate(async valid => {
        if (valid) {
          let res = await this.api.getRefund(this.requestRefund);
          if (res.code == 200) {
            this.$router.push({
              name: "addProject",
              params: this.$route.params
            });
          } else {
            this.$message({ type: "error", message: res.msg });
          }
        } else {
          return false;
        }
      });
    },
    async getBankOptions(param_id) {
      let res = await this.api.getBack({ param_id: param_id });
      if (res.code == 200) {
        this.bankOptions = res.data;
      }
    }
    // go(row) {
    //     this.$router.push({name: 'refundDetail' , params: { id: row,  operationType : this.$route.params.operationType , project_id: this.$route.params.project_id } });
    // },
  }
};
</script>

