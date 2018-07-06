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
        <el-form :model="sumbitForm" :rules="rules" ref="sumbitForm">
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
            <el-button type="primary" @click='addShow'>新增</el-button>
          </span>
        </div>
        <el-table :data="ruleForm" border>
          <el-table-column label="序号" align='center' width="70px">
            <template slot-scope="scope">{{getIndex(scope)}}</template>
          </el-table-column>
          <el-table-column property="project_code" label="物业类型" align='center'></el-table-column>
          <el-table-column property="project_name" label="跳点" align='center'></el-table-column>
          <el-table-column property="absolute_address" label="提成公式" align='center'></el-table-column>
          <el-table-column property="project_hold_name" label="单位" align='center'></el-table-column>
          <el-table-column property="project_hold_phone" label="奖励金额（元/套）" align='center'></el-table-column>
          <el-table-column label="操作" align='center'>
            <template slot-scope="scope">
              <el-button type="text">查看</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class='info'>
        <div class='title'>
          <div class='text'>到访佣金（客户到访后且售楼处确认后产生的佣金</div>
          <span class='btn'>
            <el-button type="primary">新增</el-button>
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
            <el-button type="primary">新增</el-button>
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
      this.$router.push({ name: "distribution" });
    }
    this.getBrokerAgreement();
  },
  methods: {
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
              name: "distribution"
            });
          }
        } else {
          return false;
        }
      });
    },

    addShow() {
      this.$router.push({
        name: "ruleSetting"
      });
    },
    cancel() {
      if (this.$route.params.backUrl) {
        this.$router.push({
          name: this.$route.params.backUrl,
          params: this.$route.params
        });
      } else {
        this.$router.push({
          name: "startApply"
        });
      }
    }
  }
};
</script>
