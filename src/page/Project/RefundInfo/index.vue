<style lang="less" scoped>
.payRecord {
  width: 800px;
  margin: 0 auto;
  border: 1px solid #eee;
}
.title {
  font-size: 20px;
}
.box {
  padding: 15px 20px;
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
.input2 {
  width: 400px;
}
.el-form-item {
  margin-bottom: 5px;
}
.num_set {
  padding-top: 15px;
  font-size: 20px;
}
.cancel {
  margin-top: 20px;
  text-align: right;
}
</style>
<template>
      <div class='payRecord'>
        <div class="title">退款信息</div>
        <div class='box'>
                <el-form class='table' v-model="refund">
                <el-form-item label="退款金额（￥）" class='input1'>
                  <div class='border'>{{refund.price}}</div>
                </el-form-item>
                <el-form-item label="付款银行" class='input'>
                  <div class='border'>{{refund.drawee_bank}}</div>
                </el-form-item>
                <el-form-item label="付款银行卡号" class='input'>
                    <div class='border'>{{refund.drawee_account}}</div>
                </el-form-item>
                <el-form-item label="付款户名" class='input'>
                    <div class='border'>{{refund.drawee}}</div>
                </el-form-item>
                <el-form-item label="付款时间" class='input1'>
                    <div class='border'>{{refund.create_time}}</div>
                </el-form-item>
                <el-form-item label="收款银行" class='input'>
                    <div class='border'>{{refund.payee_bank}}</div>
                </el-form-item>
                <el-form-item label="收款银行卡号" class='input'>
                    <div class='border'>{{refund.payee_account}}</div>
                </el-form-item>
                 <el-form-item label="收款户名" class='input'>
                    <div class='border'>{{refund.payee}}</div>
                </el-form-item>
                <el-form-item label="交易人" class='input'>
                    <div class='border'>{{refund.create_name}}</div>
                </el-form-item>
                <el-form-item label="联系电话" class='input'>
                    <div class='border'>{{refund.contact_phone}}</div>
                </el-form-item>
                <el-form-item label="备注" class='input2'>
                    <div class='border'>{{refund.remark}}</div>
                </el-form-item>
                    <div class='num_set'>附件</div>
                <el-table :data="refund.file"  border>
                    <el-table-column label="文件名称" prop="file_name" align='center'></el-table-column>
                    <el-table-column label="附件" align='center'>
                        <template slot-scope='scope'>
                            <a target="_blank" :href="'http://120.27.21.136:2798/' + scope.row.url">查看附件</a>
                        </template>
                    </el-table-column>
                    <el-table-column property="create_name" label="上传人员" align='center'></el-table-column>
                    <el-table-column property="create_time" label="上传时间" align='center'></el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="cancel">
                <el-button @click='cancelRefund' type="primary" >关 闭</el-button>
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
    } else {
      this.$nextTick(() => {
        this.initMap();
      });
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

