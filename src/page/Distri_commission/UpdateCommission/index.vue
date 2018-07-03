<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.updateCommission {
  .el-form-item {
    margin: 0;
  }
  .el-form-item__content {
    line-height: 0;
  }
  .el-form-item__label {
    line-height: 30px;
  }
  .el-table th {
    padding: 5px 0px;
  }
  .el-table td {
    padding: 4px 0px;
  }
  .el-input__inner {
    height: 35px;
  }
}
</style>
<template>
  <div class='updateCommission'>
    <div class='table'>
      <div class='title'>
        <el-button class='pos-btn-1' v-if="operationType==1||operationType==3" type="primary" @click='sumbit(2)'>提交</el-button>
        <el-button class='pos-btn' @click='cancel' type="primary">关闭</el-button>
      </div>
      <div v-if='operationType==2||operationType==3'>
        <div class='title-text'>付款申请信息</div>
        <el-form :model="form" class='form' :disabled="operationType==2" :rules="rules" ref="form">
          <el-form-item label="单据号" class='row' v-if='!operationType==3||form&&form.examine_state==1'>
            <el-input v-model="form.document_num" auto-complete="off" class='input' :disabled="operationType==3"></el-input>
          </el-form-item>
          <el-form-item label="付款银行" class='row' v-if='!operationType==3||form&&form.examine_state==1'>
            <el-input v-model="form.send_bank" auto-complete="off" class='input'></el-input>
          </el-form-item>
          <el-form-item label="付款人" class='row' v-if='!operationType==3||form&&form.examine_state==1'>
            <el-input v-model="form.apply_name" auto-complete="off" class='input'></el-input>
          </el-form-item>
          <el-form-item label="付款银行卡号" class='row' v-if='!operationType==3||form&&form.examine_state==1'>
            <el-input v-model="form.send_bank_card" auto-complete="off" class='input'></el-input>
          </el-form-item>
          <el-form-item label="申请付款批次名称" class='row'>
            <el-input :disabled="true" v-model="submitForm.batch_name" auto-complete="off" class='input'></el-input>
          </el-form-item>
          <el-form-item label="收款银行" class='row' prop="recive_bank">
            <el-select v-model="form.recive_bank" placeholder="请选择收款银行" @change="getBankOptions">
              <el-option v-for="item in bankOptions" :key="item.param_id" :label="item.param" :value="item.param"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收款银行卡号" class='row' prop="recive_bank_card">
            <el-input v-model="form.recive_bank_card" auto-complete="off" class='input'></el-input>
          </el-form-item>
          <el-form-item label="收款户名：" class='row' prop="recive_name">
            <el-input v-model="form.recive_name" auto-complete="off" class='input'></el-input>
          </el-form-item>
          <el-form-item label="申请付款金额(￥)：" class='row'>
            <el-input :disabled="true" v-model="submitForm.broker_num" auto-complete="off" class='input'></el-input>
          </el-form-item>
          <el-form-item label="申请人员：" class='row'>
            <el-input v-model="form.apply_name" auto-complete="off" class='input' :disabled="operationType==3"></el-input>
          </el-form-item>
          <el-form-item label="申请时间：" class='row'>
            <el-input v-model="form.create_time" auto-complete="off" class='input' :disabled="operationType==3"></el-input>
          </el-form-item>
          <el-form-item label="审核人" class='row' v-if="form&&form.examine_state==1||form&&form.examine_state==0" :disabled="operationType==3">
            <el-input v-model="form.check_name" auto-complete="off" class='input' :disabled="operationType==3"></el-input>
          </el-form-item>
          <el-form-item label="审核时间" class='row' v-if="form&&form.examine_state==1||form&&form.examine_state==0" :disabled="operationType==3">
            <el-input v-model="form.create_time" auto-complete="off" class='input' :disabled="operationType==3"></el-input>
          </el-form-item>
          <el-form-item label="审核备注" class='row1' v-if="form&&form.examine_state==1||form&&form.examine_state==0" :disabled="operationType==3">
            <el-input v-model="form.send_desc" type="textarea" auto-complete="off" class='input withd' :disabled="operationType==3"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <div v-if="form&&form.examine_state==1" class='file'>
        <div class='title-text'>附件信息</div>
        <el-table :data="applyFile" border>
          <el-table-column label="文件名称" prop="file_name" align='center'></el-table-column>
          <el-table-column label="附件" align='center'>
            <template slot-scope='scope'>
              <a target="_blank" :href="'http://120.27.21.136:2798/' + scope.row.file_url">查看附件</a>
            </template>
          </el-table-column>
          <el-table-column property="create_name" label="上传人员" align='center'></el-table-column>
          <el-table-column property="create_time" label="上传时间" align='center'></el-table-column>
        </el-table>
      </div>
      <div>
        <div class='title-text'>佣金申请信息</div>
        <el-form v-model="submitForm" class='form' :disabled="operationType==0||operationType==2||operationType==3">
          <el-form-item label="申请名称" class='row'>
            <el-input v-model="submitForm.batch_name" auto-complete="off" class='input'></el-input>
          </el-form-item>
          <el-form-item label="申请笔数" class='row'>
            <el-input v-model="submitForm.count_num" auto-complete="off" class='input' :disabled="operationType==1"></el-input>
          </el-form-item>
          <el-form-item label="佣金金额（￥）：" class='row'>
            <el-input v-model="no_price" auto-complete="off" class='input' :disabled="operationType==1"></el-input>
          </el-form-item>
          <el-form-item label="申请人员" class='row'>
            <el-input v-model="submitForm.create_name" auto-complete="off" class='input'></el-input>
          </el-form-item>
          <el-form-item label="申请时间" class='row'>
            <el-input v-model="submitForm.create_time" auto-complete="off" class='input'></el-input>
          </el-form-item>
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
          <el-form-item label="审核人员" class='row' v-if='operationType==2||operationType==0'>
            <el-input v-model="submitForm.auditing_name" auto-complete="off" class='input'></el-input>
          </el-form-item>
          <el-form-item label="审核时间" class='row' v-if='operationType==2||operationType==0'>
            <el-input v-model="submitForm.auditing_time" auto-complete="off" class='input'></el-input>
          </el-form-item>
          <!-- <el-form-item label="备注" class='row' v-if='operationType==0||operationType==2'>
            <el-input v-model="submitForm.remark" type="textarea" auto-complete="off" class='input withd'></el-input>
          </el-form-item> -->
        </el-form>
      </div>
      <div>
        <div class='title-text'>申请结佣列表</div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align='center' v-if='operationType==1'></el-table-column>
          <el-table-column prop="client_id" label="推荐编号" align='center' width="120px"></el-table-column>
          <el-table-column prop="name" label="经纪人名称" align='center'></el-table-column>
          <el-table-column prop="tel" label="联系电话" align='center'></el-table-column>
          <el-table-column prop="broker_type" label="佣金类型" align='center'>
            <template slot-scope="scope">{{type(scope.row.broker_type)}}</template>
          </el-table-column>
          <el-table-column prop="create_time" label="时间" align='center'></el-table-column>
          <el-table-column prop="broker_num" label="佣金金额" align='center'></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        recive_bank: [
          { required: true, message: "请选择收款银行", change: "change" }
        ],
        recive_name: [
          {
            required: true,
            message: "请输入收款户名,长度为2-5个字符",
            change: "change",
            pattern: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/
          }
        ],
        recive_bank_card: [
          {
            required: true,
            message: "请输入正确的银行卡号",
            change: "change",
            pattern: /^([1-9]{1})(\d{14}|\d{18})$/
          }
        ]
      },
      tableData: [],
      applyFile: [],
      bankOptions: [],
      operationType: 0,
      submitForm: {},
      form: {},
      batch_id: "",
      state: "", //2为提交  3为只是保存
      batch_name: "",
      nail_name: "",
      nail_tel: "",
      second_name: "",
      second_tel: "",
      no_price: 0,
      apply_id: "",
      searchObj: {
        search: ""
      }
    };
  },
  mounted() {
    this.apply_id = this.$route.params.apply_id;
    this.operationType = this.$route.params.operationType;
    this.state = this.$route.params.state;
    this.batch_id = this.$route.params.batch_id;
    if (this.batch_id === undefined) {
      this.$router.push({ name: "distri_commission" });
      return;
    }
    this.updateBroker();
    this.getBankOptions();
  },
  methods: {
    async getBankOptions(param_id) {
      let res = await this.api.getBack({ param_id: param_id });
      if (res.code == 200) {
        this.bankOptions = res.data;
      }
    },

    sumbit(state) {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          if (this.operationType == 1) {
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
              this.$router.push({ name: "distri_commission" });
            }
          } else if (this.operationType == 3) {
            this.$confirm("此操作将提交付重新款申请, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(async () => {
                let temp = {};
                temp.apply_id = this.apply_id;
                temp.recive_bank = this.form.recive_bank;
                temp.recive_bank_card = this.form.recive_bank_card;
                temp.recive_name = this.form.recive_name;
                let res = await this.api.rePriceApplySumbit(temp);
                if (res.code == 200) {
                  this.$router.push({ name: "maidInfo" });
                  this.$message({
                    type: "success",
                    message: "提交成功!"
                  });
                }
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消提交重新申请付款"
                });
              });
          }
        } else {
          return false;
        }
      });
    },
    async updateBroker() {
      let temp = Object.assign({}, this.submitForm);
      temp.batch_id = this.batch_id;
      temp.state = this.state;
      temp.apply_id = this.apply_id;
      let res = {};
      if (this.operationType == 1) {
        res = await this.api.updateBroker(temp);
      } else if (this.operationType == 0) {
        res = await this.api.getBrokerInfo(temp);
      } else if (this.operationType == 3 || this.operationType == 2) {
        res = await this.api.getApplyInfo(temp);
      }
      if (res.code == 200) {
        this.tableData = res.data.brokerList;
        this.$nextTick(() => {
          for (let data of this.tableData) {
            this.$refs.multipleTable.toggleRowSelection(data);
          }
        });
        this.submitForm = res.data.brokerInfo;
        this.form = res.data.applyInfo;
        this.applyFile = res.data.applyFile;
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

