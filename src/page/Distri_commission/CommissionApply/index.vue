<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.commissionApply {
  .el-form-item {
    margin: 0;
  }
  .el-table th {
    padding: 5px 0px;
  }
  .el-table td {
    padding: 5px 0px;
  }
  .el-input__inner {
    height: 35px;
  }
  .el-form-item__content {
    margin: 0;
  }
}
</style>


<template>
  <div class='commissionApply'>
    <div class='table'>
      <div class='title'>
         <el-button class='pos-btn-1' type="primary" @click='sumbit(2)'>提交</el-button>
        <el-button class='pos-btn-2' type="primary" @click='sumbit(3)'>保存</el-button>
        <el-button class='pos-btn' @click='cancel' type="primary">关闭</el-button>
      </div>
       <div class='title-text'>佣金申请信息</div>
      <el-form :model="sumbitForm" class='form' :rules="rules" ref="sumbitForm">
        <el-form-item label="申请名称" class='row' prop="batch_name">
          <el-input v-model="sumbitForm.batch_name" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="甲方联系人" class='row' prop="nail_name">
          <el-input v-model="sumbitForm.nail_name" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="甲方联系电话" class='row' prop="nail_tel">
          <el-input v-model="sumbitForm.nail_tel" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="乙方联系人" class='row' prop="second_name">
          <el-input v-model="sumbitForm.second_name" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="乙方联系电话" class='row' prop="second_tel">
          <el-input v-model="sumbitForm.second_tel" auto-complete="off" class='input'></el-input>
        </el-form-item>
        <el-form-item label="申请笔数" class='row'>
          <el-input v-model="sumbitForm.count_num" auto-complete="off" class='input' :disabled="!operationType==1"></el-input>
        </el-form-item>
        <el-form-item label="佣金金额（￥）：" class='row'>
          <el-input v-model="no_price" auto-complete="off" class='input' :disabled="!operationType==1"></el-input>
        </el-form-item>
      </el-form>
      <div class='title-text'>申请结佣列表</div>
      <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align='center'></el-table-column>
        <el-table-column prop="client_id" label="推荐编号" align='center' width="120px"></el-table-column>
        <el-table-column prop="name" label="经纪人名称" align='center'></el-table-column>
        <el-table-column prop="tel" label="联系电话" align='center'></el-table-column>
        <el-table-column prop="broker_type" label="佣金类型" align='center' width="180px">
          <template slot-scope="scope">{{type(scope.row.broker_type)}}</template>
        </el-table-column>
        <el-table-column prop="create_time" label="时间" align='center' width="160px"></el-table-column>
        <el-table-column prop="broker_num" label="佣金金额" align='center'></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        batch_name: [
          { required: true, message: "请输入申请名称", change: "change" },
          {
            max: 20,
            message: "最大长度为20个字符",
            trigger: "change"
          }
        ],
        nail_name: [
          { required: true, message: "请输入甲方联系人", change: "change" },
          {
            pattern: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
            message: "长度为2-5个字符",
            trigger: "change"
          }
        ],
        nail_tel: [
          { required: true, message: "电话号码必须填写", change: "change" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确的电话号码",
            change: "change"
          }
        ],
        second_name: [
          { required: true, message: "请输入乙方联系人", change: "change" },
          {
            pattern: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
            message: "长度为2-5个字符",
            trigger: "change"
          }
        ],
        second_tel: [
          { required: true, message: "电话号码必须填写", change: "change" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确的电话号码",
            change: "change"
          }
        ]
      },
      tableData: [],
      sumbitForm: {
        batch_name: "",
        nail_name: "",
        nail_tel: "",
        second_name: "",
        second_tel: "",
        broker_id: "",
        state: 3,
        count_num: 0
      },
      no_price: 0,
      rule_id: "",
      project_id: "",
      operationType: 0 // 1 修改  0 查看
    };
  },
  mounted() {
    this.broker_id = this.$route.params.broker_id;
    this.project_id = this.$route.params.project_id;
    this.operationType = this.$route.params.operationType;
    if (!this.project_id) {
      this.$router.push({ name: "distri_commission" });
      return;
    }
    let d = new Date();
    this.sumbitForm.batch_name =
      d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
    this.rule_id = this.$route.params.rule_id;
    this.getBrokerApply();
  },
  methods: {
    sumbit(state) {
      this.$refs["sumbitForm"].validate(async valid => {
        if (valid) {
          this.$confirm("此操作将提交成功, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(async () => {
              let temp = Object.assign({}, this.sumbitForm);
              temp.project_id = this.project_id;
              temp.state = state;
              let res = await this.api.brokerApply(temp);
              if (res.code == 200) {
                this.$message({ type: "success", message: "提交成功!" });
                this.$router.push({ name: "maidInfo" });
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消提交佣金申请"
              });
            });
        } else {
          return false;
        }
      });
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

