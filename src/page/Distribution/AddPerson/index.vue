<style lang="less" scoped src='./index.less'>
</style>
<template>
  <div class='addPerson'>
    <div class='box'>
      <span class='num_set'>到访确认人信息</span>
      <span class='btn'>
        <el-button type="primary" @click='sumbit' v-if='!operationType==1' :disabled="!isDisable()">确定</el-button>
        <el-button type="primary" @click='exAgent(1)' v-if='operationType==1'>审核通过</el-button>
        <el-button type="primary" @click='exAgent(0)' v-if='operationType==1'>审核不通过</el-button>
        <el-button class='btn-1' @click="close">返回</el-button>
      </span>
      <el-form v-model="submitForm">
        <el-form-item class='input1'>
          <div>到访确认人</div>
          <div class='border'>{{submitForm ? submitForm.name : ''}}</div>
        </el-form-item>
        <span>
          <el-button type="primary" class='button' @click='choice' :disabled="!isDisable()">选择</el-button>
        </span>
        <div class='num_set'>员工信息</div>
        <el-form v-model="submitForm">
          <el-form-item class='input1'>
            <div>姓名</div>
            <div class='border'>{{submitForm ? submitForm.name : ''}}</div>
          </el-form-item>
          <el-form-item class='input1'>
            <div>入职时间</div>
            <div class='border'>{{submitForm ?submitForm.entry_time: ''}}</div>
          </el-form-item>
          <el-form-item class='input1'>
            <div>云算号</div>
            <div class='border'>{{submitForm ?submitForm.account: ''}}</div>
          </el-form-item>
          <el-form-item class='input1'>
            <div>所属部门</div>
            <div class='border'>{{submitForm ?submitForm.department: ''}}</div>
          </el-form-item>
          <el-form-item class='input1'>
            <div>职位</div>
            <div class='border'>{{submitForm ?submitForm.position: ''}}</div>
          </el-form-item>
          <div class='num_set'>基础信息</div>
          <el-form-item class='input1'>
            <div>性别</div>
            <div class='border'>
              {{sex(submitForm ?submitForm.sex: '')}}
            </div>
          </el-form-item>
          <el-form-item class='input1'>
            <div>电话号码</div>
            <div class='border'>{{submitForm ?submitForm.tel: ''}}</div>
          </el-form-item>
          <el-form-item class='input1'>
            <div>出生年月</div>
            <div class='border'>{{submitForm ?submitForm.birth: ''}}</div>
          </el-form-item>
          <el-form-item class='input1'>
            <div>通讯地址</div>
            <div class='border width'>{{submitForm ?submitForm.tabsolute_addressel: ''}}</div>
          </el-form-item>
          <div v-if='operationType==0'>
            <div class='num_set'>分配信息</div>
            <el-form-item class='input1'>
              <div>分配人</div>
              <div class='border'>{{submitForm ?submitForm.fp_name: ''}}</div>
            </el-form-item>
            <el-form-item class='input1'>
              <div>分配时间</div>
              <div class='border'>{{submitForm ?submitForm.fp_time: ''}}</div>
            </el-form-item>
            <el-form-item class='input1-br'>
              <div>备注</div>
              <div class='border width-1'>{{submitForm ?submitForm.remark: ''}}</div>
            </el-form-item>
          </div>
        </el-form>
      </el-form>
      <el-dialog title="拒绝" :visible.sync="refuseInfo" class='dialog' @close="cancelRefuseInfo">
        <el-form>
          <el-form-item label="审核不通过原因">
            <el-input v-model="remark" class='textarea' type="textarea" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelRefuseInfo">取 消</el-button>
          <el-button type="primary" @click="exAgent(0)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      submitForm: {
        tabsolute_addressel: "",
        birth: "",
        tel: "",
        sex: "",
        position: "",
        department: "",
        account: "",
        entry_time: "",
        name: "",
        project_id: "",
        id: "",
        agent_id: "",
        fp_name: "",
        fp_time: "",
        remark: "",
        ex_id: "",
        type: 0 //0为拒绝 1为通过
      },
      remark: "",
      refuseInfo: false,
      operationType: 0 //0 查看  1 审核  2 审核的查看
    };
  },
  mounted() {
    this.operationType = this.$route.params.operationType;
    this.ex_id = this.$route.params.ex_id;
    this.type = this.$route.params.type;
    this.project_id = this.$route.params.project_id;
    this.id = this.$route.params.id;
    this.agent_id = this.$route.params.agent_id;
    if(!this.agent_id && !this.$route.params.agentInfo) return;
    if (this.$route.params.agentInfo === undefined) {
      this.getAgentInfo();
    } else {
      this.agent_id = this.$route.params.agentInfo.id;
      this.submitForm = this.$route.params.agentInfo;
      this.getAgentInfo();
    }
  },
  methods: {
    async exAgent(type) {
      this.submitForm.type = type;
      let temp = Object.assign({}, this.submitForm);
      temp.agent_id = this.agent_id;
      temp.ex_id = this.ex_id;
      temp.project_id = this.project_id;
      temp.type = type;
      temp.remark = this.remark;
      if (type == 0) {
        this.refuseInfo = true;
        let res = await this.api.exAgent(temp);
        if (res.code == 200) {
          this.close();
          this.cancelRefuseInfo();
          this.getAgentInfo();
        }
      } else {
        this.$confirm("此操作将审核成功, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            let res = await this.api.exAgent(temp);
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "审核成功!"
              });
              this.close();
              this.cancelRefuseInfo();
              this.getAgentInfo();
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
          });
      }
    },
    cancelRefuseInfo() {
      this.refuseInfo = false;
      this.remark = "";
    },
    async sumbit() {
      this.submitForm.project_id = this.project_id;
      this.submitForm.id = this.id;
      this.submitForm.agent_id = this.agent_id;
      let res = await this.api.agentAdd(this.submitForm);
      if (res.code == 200) {
        this.$router.push({
          name: "fastDistribution",
          params: { submitForm: this.submitForm }
        });
      }
    },
    isDisable() {
      if (this.operationType == 1) {
        return false;
      } else if (this.operationType == 0) {
        return false;
      } else if (this.operationType == 2) {
        return false;
      } else {
        return true;
      }
    },
    async getAgentInfo() {
      let res = await this.api.getAgentInfo({ agent_id: this.agent_id });
      if (res.code == 200) {
        Object.assign(this.submitForm, res.data);
      }
    },
    sex(row) {
      if (row == 1) {
        return "男";
      } else if (row == 2) {
        return "女";
      } else if (row == 0) {
        return "未设置";
      }
    },
    choice() {
      this.$router.push({
        name: "choicePeople",
        params: { project_id: this.project_id }
      });
    },
    close() {
      this.$router.push({
        name: "fastDistribution",
        params: this.$route.params
      });
    }
  }
};
</script>


