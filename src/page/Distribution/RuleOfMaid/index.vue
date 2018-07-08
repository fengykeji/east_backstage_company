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
          <el-button type="primary" @click='sumbit'>提交</el-button>
          <el-button type="primary" @click='cancel'>关闭</el-button>
        </span>
      </div>
      <div class='infoform'>
        <div class='text'>合同信息（甲方为项目方，乙方为销售方）</div>
        <el-form :model="sumbitForm" :disabled="operationType == 0" :rules="rules" ref="sumbitForm">
          <!-- <el-form-item label="甲方单位：" class='input'>
                        <el-input v-model="sumbitForm.deposit"></el-input>
                    </el-form-item> -->
          <el-form-item label="甲方对接人" class='input' prop="project_docker">
            <el-input v-model="sumbitForm.project_docker"></el-input>
          </el-form-item>
          <el-form-item label="甲方对接人电话" class='input' prop="project_docker_tel">
            <el-input v-model="sumbitForm.project_docker_tel"></el-input>
          </el-form-item>
          <!-- <el-form-item label="乙方单位：" class='input'>
                        <el-input v-model="sumbitForm.sell_docker"></el-input>
                    </el-form-item> -->
          <el-form-item label="乙方对接人" class='input' prop="sell_docker">
            <el-input v-model="sumbitForm.sell_docker"></el-input>
          </el-form-item>
          <el-form-item label="乙方对接人电话" class='input' prop="sell_docker_tel">
            <el-input v-model="sumbitForm.sell_docker_tel"></el-input>
          </el-form-item>
          <el-form-item label="合同开始日期" class='input' prop="compact_begin">
            <el-date-picker v-model="sumbitForm.compact_begin" type="date" placeholder="选择日期" class="block"></el-date-picker>
          </el-form-item>
          <el-form-item label="合同截至日期" class='input' prop="compact_end">
            <el-date-picker v-model="sumbitForm.compact_end" type="date" placeholder="选择日期" class="block"></el-date-picker>
          </el-form-item>
          <el-form-item label="实际开始日期" class='input' prop="act_start">
            <el-date-picker v-model="sumbitForm.act_start" type="date" placeholder="选择日期" class="block"></el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="实际截至日期" class='input'>
                        <el-input v-model="sumbitForm.allow"></el-input>
                    </el-form-item> -->
        </el-form>
      </div>
      <div class='info'>
        <div class='title'>
          <div class='text'>公司证明资料</div>
          <span class='btn'>
            <el-upload :auto-upload="false" action="" :on-change="fileUpload">
              <el-button ref="uploadBtn" type="primary" :show-file-list="false">点击上传</el-button>
            </el-upload>
          </span>
        </div>
        <el-table :data="refund" border>
          <el-table-column label="文件名称" prop="file_name" align='center'></el-table-column>
          <el-table-column label="附件" align='center'>
            <template slot-scope='scope'>
              <a target="_blank" :href="this.base + scope.row.url">查看附件</a>
            </template>
          </el-table-column>
          <el-table-column property="uploader" label="上传人员" align='center'></el-table-column>
          <el-table-column property="update_time" label="上传时间" align='center'></el-table-column>
          <el-table-column label="操作" align='center'>
            <template slot-scope="scope">
              <el-button type='text' @click='remove(scope.row)'>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class='info'>
        <div class='title'>
          <div class='text'>成交佣金（推荐的客户在该项目购置房源后产生的佣金）</div>
          <span class='btn'>
            <el-button type="primary" @click='showAdd(1,1)'>新增</el-button>
          </span>
        </div>
        <el-table :data="ruleForm.deal" border>
          <el-table-column label="序号" align='center' width="70px">
            <template slot-scope="scope">{{getIndex(scope)}}</template>
          </el-table-column>
          <el-table-column property="property_type" label="物业类型" align='center'></el-table-column>
          <el-table-column label="跳点" align='center'>
            <template slot-scope="scope">{{ scope.row.is_jump == 1 ? '是 ' : '否' }}</template>
          </el-table-column>
          <el-table-column property="commission_way" label="提成公式" align='center'></el-table-column>
          <el-table-column property="money_type" label="单位" align='center'></el-table-column>
          <el-table-column property="param" label="奖励金额（元/套）" align='center'></el-table-column>
          <el-table-column label="操作" align='center'>
            <template slot-scope="scope">
              <el-button type="text" @click="showAdd(1, 3 , scope.row )">查看</el-button>
              <el-button type="text" @click="showAdd(1, 2 , scope.row )">编辑</el-button>
              <el-button v-if="distribution.state==2" type="text" @click="removeRule(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class='info'>
        <div class='title'>
          <div class='text'>到访佣金（客户到访后且售楼处确认后产生的佣金</div>
          <span class='btn'>
            <el-button type="primary" @click="showAdd(2 , 1)">新增</el-button>
          </span>
        </div>
        <el-table :data="ruleForm.visit" border>
          <el-table-column label="序号" align='center' width="70px">
            <template slot-scope="scope">{{getIndex(scope)}}</template>
          </el-table-column>
          <el-table-column property="money_type" label="单位" align='center'></el-table-column>
          <el-table-column property="param" label="奖励金额（元/套）" align='center'></el-table-column>
          <el-table-column label="操作" align='center'>
            <template slot-scope="scope">
              <el-button type="text" @click="showAdd(2,2,scope.row)">编辑</el-button>
              <el-button type="text" @click="removeRule(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class='info'>
        <div class='title'>
          <div class='text'>推荐佣金（经纪人将客户推荐给项目后的佣金）</div>
          <span class='btn'>
            <el-button type="primary" @click="showAdd(3 , 1)">新增</el-button>
          </span>
        </div>
        <el-table :data="ruleForm.recommend" border>
          <el-table-column label="序号" align='center' width="70px">
            <template slot-scope="scope">{{getIndex(scope)}}</template>
          </el-table-column>
          <el-table-column property="money_type" label="单位" align='center'></el-table-column>
          <el-table-column property="param" label="奖励金额（元/套）" align='center'></el-table-column>
          <el-table-column label="操作" align='center'>
            <template slot-scope="scope">
              <el-button type="text" @click="showAdd(3, 2 , scope.row)">编辑</el-button>
              <el-button type="text" @click="removeRule(scope.row)">删除</el-button>
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
      rules: {
        project_docker: [
          {
            pattern: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
            required: true,
            message: "请输入姓名,2-5个字符，必须是中文",
            change: "change"
          }
        ],
        project_docker_tel: [
          {
            required: true,
            message: "请输入电话号码，11位手机号码格式",
            change: "change",
            pattern: /^1[34578]\d{9}$/
          }
        ],
        sell_docker: [
          {
            pattern: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
            required: true,
            message: "请输入姓名,2-5个字符，必须是中文",
            change: "change"
          }
        ],
        sell_docker_tel: [
          {
            required: true,
            message: "请输入电话号码，11位手机号码格式",
            change: "change",
            pattern: /^1[34578]\d{9}$/
          }
        ],
        compact_begin: [
          {
            required: true,
            message: "请选择合同开始日期"
          }
        ],
        compact_end: [
          {
            required: true,
            message: "请选择合同截至日期"
          }
        ],
        act_start: [
          {
            required: true,
            message: "请选择实际开始日期"
          }
        ]
      },
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
      ruleForm: {
        deal: [],
        visit: [],
        recommend: []
      },
      project_id: "",
      company_rule_id: "",
      moneyTypeOption: [],
      //到访佣金增删改
      visitForm: {},
      visitDialogFormVisible: false,
      distribution: {},
      operationType: 0
    };
  },
  mounted() {
    this.distribution = this.$store.state.distribution.distribution;
    this.operationType = this.$store.state.operationType;
    if (!this.distribution) {
      this.$router.push({ name: "distribution" });
      return;
    }
    this.project_id = this.distribution.project_id;
    this.company_rule_id = this.distribution.rule_id;
    this.getBrokerAgreement();
    this.getCommissionRuleInfo();
    this.getMoneyType();
    this.getCompanyRuleInfo();
  },
  methods: {
    getIndex(row) {
      // let index = row.$index + 1 + (this.searchObj.page - 1) * this.pageSize;
      let index = row.$index + 1;
      return index;
    },
    async getCompanyRuleInfo() {
      if (!this.company_rule_id) return;
      let result = await this.api.getCompanyRuleInfo({
        company_rule_id: this.company_rule_id
      });
      if (result.code == 200) {
        Object.assign(this.sumbitForm, result.data);
      }
    },
    async getCommissionRuleInfo() {
      if (!this.company_rule_id) return;
      let result = await this.api.getCommissionRuleInfo({
        company_rule_id: this.company_rule_id
      });
      if (result.code == 200) {
        this.ruleForm = result.data;
      }
    },
    async getMoneyType() {
      let res = await this.api.getMoneyType();
      if (res.code == 200) {
        this.moneyTypeOption = res.data;
      }
    },
    async fileUpload(fileObj) {
      this.fileObject = fileObj;
      let flag = false;
      if (
        this.fileObject.name.indexOf(".docx") > -1 ||
        this.fileObject.name.indexOf(".xlcx") > -1 ||
        this.fileObject.name.indexOf(".doc") > -1 ||
        this.fileObject.name.indexOf(".jpg") > -1 ||
        this.fileObject.name.indexOf(".zip") > -1 ||
        this.fileObject.name.indexOf(".rar") > -1 ||
        this.fileObject.name.indexOf(".csv") > -1 ||
        this.fileObject.name.indexOf(".png") > -1 ||
        this.fileObject.name.indexOf(".pdf") > -1
      ) {
        flag = true;
      }
      if (!flag) {
        this.$message({
          type: "error",
          message:
            "文件上传格式有误，请上传docx,doc,xlcx,jpg,zip,rar,csv,png,pdf格式"
        });
        return;
      }
      let size = fileObj.size / 1024 / 1024;
      if (size > 5) {
        this.$message({
          type: "error",
          message:
            "文件大于5m，请重新上传"
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
        this.addBrokerAgreement();
      }
    },
    async addBrokerAgreement() {
      let temp = {};
      temp.file_name = this.refund[0].file_name;
      temp.file_url = this.refund[0].url;
      temp.uploader = this.refund[0].uploader;
      temp.rule_id = this.company_rule_id;
      let res = await this.api.addBrokerAgreement(temp);
      if (res.code == 200) {
      }
    },
    async getBrokerAgreement() {
      if (!this.company_rule_id) return;
      let res = await this.api.getBrokerAgreement({
        rule_id: this.company_rule_id
      });
      if (res.code == 200) {
        this.refund = res.data;
      }
    },
    remove(index) {
      this.refund.splice(index, 1);
    },
    sumbit() {
      this.$refs["sumbitForm"].validate(async valid => {
        if (valid) {
          let temp = Object.assign({}, this.sumbitForm);
          temp.project_id = this.project_id;
          temp.rule_id = this.company_rule_id;
          let res = await this.api.addRule(temp);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "提交成功!"
            });
            this.$router.push({
              name: "distribution"
            });
          }
        } else {
          return false;
        }
      });
    },

    showAdd(type, operationState, item) {
      if (type == 1) {
        let dealList = this.ruleForm.deal;
        let arr = [];
        for (let detail of dealList) {
          let property_type = detail.property_type;
          if (property_type.length <= 0) continue;
          else {
            let tempArr = property_type.split(",");
            arr = arr.concat(tempArr);
          }
        }
        this.distribution.property_type = arr;
      }
      this.$store.commit("distribution", this.distribution);
      //规则类型 1成交 2到访 3推荐
      //operationState 操作状态 1新增 2修改 3查看
      this.$router.push({
        name: "ruleSetting",
        query: {
          broker_type: type,
          rule_id: item ? item.rule_id : undefined,
          operationState: operationState
        }
      });
    },
    cancel() {
      if (this.company_rule_id) {
        this.$router.push({
          name: "projectInfo"
        });
      } else {
        this.$router.push({
          name: "startApply"
        });
      }
    },
    removeRule(row) {
      this.$confirm("此操作将删除成功, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.api.delBrokeRule({
            rule_id: row.rule_id,
            company_rule_id: this.company_rule_id
          });
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
          this.getCommissionRuleInfo();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
