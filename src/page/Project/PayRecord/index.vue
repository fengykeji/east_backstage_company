<style lang="less" >
.payRecord {
  width: 800px;
  margin: 100px auto 0;
  border: 1px solid #eee;
  .payRecord-table{
    margin-top: 10px;
  }
  .title {
    font-size: 20px;
  }
  .box {
    padding: 10px 20px;
    text-align: left;
  }
  .input {
    width: 200px;
    display: inline-block;
    padding-right: 20px;
  }
  .input1 {
    width: 200px;
  }
  .border {
    border: 1px solid #888;
    padding: 0 10px;
    border-radius: 4px;
    height: 40px;
  }
  .input2 {
    width: 400px;
  }
  .input3 {
    width: 240px;
  }
  .el-form-item {
    margin-bottom: 5px;
  }
  .num_set {
    font-size: 20px;
  }
  .cancel {
    margin-top: 20px;
    text-align: right;
  }
}
</style>




<template>
  <div class='payRecord'>
    <div class='payRecord-table'>
    <div class="title">缴纳记录</div>
    <div class='box'>
      <el-form class='table' v-model="refund">
        <el-form-item class='input1'>
          <div>缴纳金额（￥）</div>
          <div class='border'>{{refund.price}}</div>
        </el-form-item>
        <el-form-item class='input'>
          <div>付款银行</div>
          <div class='border'>{{refund.drawee_bank}}</div>
        </el-form-item>
        <el-form-item class='input'>
          <div>付款银行卡号</div>
          <div class='border'>{{refund.drawee_account}}</div>
        </el-form-item>
        <el-form-item class='input'>
          <div>付款户名</div>
          <div class='border'>{{refund.drawee}}</div>
        </el-form-item>
        <el-form-item class='input3'>
          <div>付款时间</div>
          <div class='border'>{{refund.create_time}}</div>
        </el-form-item>
        <el-form-item class='input'>
          <div>收款银行</div>
          <div class='border'>{{refund.payee_bank}}</div>
        </el-form-item>
        <el-form-item class='input'>
          <div>收款银行卡号</div>
          <div class='border'>{{refund.payee_account}}</div>
        </el-form-item>
        <el-form-item class='input'>
          <div>收款户名</div>
          <div class='border'>{{refund.payee}}</div>
        </el-form-item>
        <el-form-item class='input'>
          <div>交易人</div>
          <div class='border'>{{refund.create_name}}</div>
        </el-form-item>
        <el-form-item class='input'>
          <div>联系电话</div>
          <div class='border'>{{refund.contact_phone}}</div>
        </el-form-item>
        <el-form-item class='input2'>
          <div>备注</div>
          <div class='border'>{{refund.remark}}</div>
        </el-form-item>
        <div class='num_set'>附件</div>
        <el-table :data="refund.file" border>
          <el-table-column label="文件名称" prop="file_name" align='center'></el-table-column>
          <el-table-column label="附件" align='center'>
            <template slot-scope='scope'>
              <a target="_blank" :href="this.base + scope.row.url">查看附件</a>
            </template>
          </el-table-column>
          <el-table-column property="create_name" label="上传人员" align='center'></el-table-column>
          <el-table-column property="create_time" label="上传时间" align='center'></el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="cancel">
        <el-button @click='cancelRefund' type="primary">关 闭</el-button>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      refund: {
        id: "",
        price: ""
      }
    };
  },
  mounted() {
    let params = this.$route.params;
    this.operationType = params.operationType;
    if (this.operationType === undefined) {
      this.$router.push({ name: "project" });
      return;
    }
    this.refund.id = this.$route.params.id;
    if (this.refund.id) {
      this.getBusinessInfo();
    }
  },
  methods: {
    async getBusinessInfo() {
      let res = await this.api.getBusinessInfo({ id: this.refund.id });
      if (res.code == 200) {
        this.refund = res.data;
      }
    },
    cancelRefund() {
      this.$router.push({ name: "addProject", params: this.$route.params });
    }
  }
};
</script>

