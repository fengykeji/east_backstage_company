<style lang="less" scoped src='./index.less'></style>
<style lang="less">
body {
  background-color: #fafafc;
}
.ruleOfMaid {
  .el-upload-list {
    width: 0;
    height: 0;
    overflow: hidden;
  }
  .el-table th {
    padding: 5px 0px;
  }
  .el-table td {
    padding: 0;
  }
  .el-form-item {
    padding-bottom: 15px;
  }
}
</style>

<template>
  <div class='ruleOfMaid'>
    <div class='ruleOfMaid-box'>
      <div class='title'>
        <span class='btn'>
          <el-button type="primary" @click='cancel'>关闭</el-button>
        </span>
      </div>
      <div class='infoform'>
        <div class='text'>规则信息</div>
        <el-form :model="sumbitForm" disabled='disabled'>
          <el-form-item label="规则名称" class='input' prop="rule_name">
            <el-input v-model="sumbitForm.rule_name"></el-input>
          </el-form-item>
          <el-form-item label="合同开始日期" class='input' prop="plan_start">
            <el-input v-model="sumbitForm.plan_start"></el-input>
          </el-form-item>
          <el-form-item label="合同截至日期" class='input' prop="plan_end">
            <el-input v-model="sumbitForm.plan_end"></el-input>
          </el-form-item>
          <el-form-item label="实际开始日期" class='input' prop="act_start">
            <el-input v-model="sumbitForm.act_start"></el-input>
          </el-form-item>
          <el-form-item label="佣金规则" class='input1' prop="commission_describe">
            <el-input type="textarea" v-model="sumbitForm.commission_describe"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class='info'>
        <div class='title'>
          <div class='text'>成交佣金（推荐的客户在该项目购置房源后产生的佣金）</div>
          <span class='btn'>
            <el-button type="primary" @click='addShow' class='add'>新增</el-button>
          </span>
        </div>
        <el-table :data="ruleForm" border>
          <el-table-column label="序号" align='center' width="70px">
            <template slot-scope="scope">{{getIndex(scope)}}</template>
          </el-table-column>
          <el-table-column property="project_code" label="物业类型" align='center'></el-table-column>
          <el-table-column property="absolute_address" label="提成公式" align='center'></el-table-column>
          <el-table-column property="project_hold_name" label="参数" align='center'></el-table-column>
          <el-table-column label="操作" align='center'>
            <template slot-scope="scope">
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class='info'>
        <div class='title'>
          <div class='text'>到访佣金（客户到访后且售楼处确认后产生的佣金</div>
          <span class='btn'>
            <el-button type="primary" class='add'>新增</el-button>
          </span>
        </div>
        <el-table :data="ruleForm" border>
          <el-table-column label="序号" align='center' width="70px">
            <template slot-scope="scope">{{getIndex(scope)}}</template>
          </el-table-column>
          <el-table-column property="project_code" label="单位" align='center'></el-table-column>
          <el-table-column property="project_hold_phone" label="奖励金额（元/套）" align='center'></el-table-column>
          <el-table-column label="操作" align='center'>
            <template slot-scope="scope">
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class='info'>
        <div class='title'>
          <div class='text'>推荐佣金（经纪人将客户推荐给项目后的佣金）</div>
          <span class='btn'>
            <el-button type="primary" class='add'>新增</el-button>
          </span>
        </div>
        <el-table :data="ruleForm" border>
          <el-table-column label="序号" align='center' width="70px">
            <template slot-scope="scope">{{getIndex(scope)}}</template>
          </el-table-column>
          <el-table-column property="project_code" label="单位" align='center'></el-table-column>
          <el-table-column property="project_hold_phone" label="奖励金额（元/套）" align='center'></el-table-column>
          <el-table-column label="操作" align='center'>
            <template slot-scope="scope">
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sumbitForm: {
        project_docker: "",
        project_docker_tel: "",
        sell_docker: "",
        sell_docker_tel: "",
        compact_begin: "",
        compact_end: "",
        act_start: ""
      },
      refund: [],
      ruleForm: [],
      project_id: "",
      rule_id: ""
    };
  },
  mounted() {
    this.project_id = this.$route.params.project_id;
    this.rule_id = this.$route.params.rule_id;
    if (this.$route.params.rule_id) {
    } else {
      this.$router.push({ name: "peopleProject" });
    }
    this.getBrokerAgreement();
  },
  methods: {
    async getRuleContract() {
      let res = await this.api.getRuleContract({ rule_id: this.rule_id });
      if (res.code == 200) {
        Object.assign(this.sumbitForm, res.data);
      }
    },
    async fileUpload(fileObj) {
      this.fileObject = fileObj;
      let flag = false;
      if (
        this.fileObject.name.indexOf(".docx") > -1 ||
        this.fileObject.name.indexOf(".doc") > -1
      ) {
        flag = true;
      }
      if (!flag) {
        this.$message({
          type: "error",
          message: "文件上传格式有误，请上传docx或者doc格式"
        });
        return;
      }
      let file = this.fileObject.raw;
      let formData = new FormData();
      formData.append("url", file);
      let res = await this.api.uploadBrokerCommission(formData);
      if (res.code == 200) {
        let temp = {};
        temp.uploader = res.data.uploader;
        temp.url = res.data.img_url;
        temp.create_time = res.data.create_time;
        temp.file_name = fileObj.name;
        this.refund = [];
        this.refund.push(temp);
        console.log(temp);
        this.addBrokerAgreement();
      }
    },
    async addBrokerAgreement() {
      let temp = {};
      temp.file_name = this.refund[0].file_name;
      temp.file_url = this.refund[0].url;
      temp.uploader = this.refund[0].uploader;
      temp.rule_id = this.rule_id;
      let res = await this.api.addBrokerAgreement(temp);
      console.log(this.refund);
      if (res.code == 200) {
      }
    },
    async getBrokerAgreement() {
      let res = await this.api.getBrokerAgreement({ rule_id: this.rule_id });
      if (res.code == 200) {
        this.refund = res.data;
      }
      this.getRuleContract();
    },
    remove(index) {
      this.refund.splice(index, 1);
    },
    sumbit() {
      this.$refs["sumbitForm"].validate(async valid => {
        if (valid) {
          let temp = Object.assign({}, this.sumbitForm);
          temp.project_id = this.project_id;
          temp.rule_id = this.rule_id;
          let res = await this.api.addRule(temp);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "提交成功!"
            });
            this.$router.push({
              name: "peopleProject"
            });
          }
        } else {
          return false;
        }
      });
    },

    addShow() {
      //   this.$router.push({
      //     name: "ruleSetting"
      //   });
    },
    cancel() {
      this.$router.push({
        name: "peopleProjectInfo",
        params: this.$route.params
      });
    }
  }
};
</script>
