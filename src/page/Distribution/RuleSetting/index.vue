<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
body {
  background-color: #fafafc;
}
</style>
<template>
  <div class='ruleSetting'>
    <div class='ruleSetting-box'>
      <div class='title'>
        <span class='btn'>
          <el-button type="primary" v-if="operationState!=3" @click='submit'>提交</el-button>
          <el-button type="primary" @click='cancel'>关闭</el-button>
        </span>
      </div>
      <div v-if="broker_type == 1">
        <div class='infoform'>
          <div class='text'>规则设置</div>
          <el-form :model="form" :disabled="operationState==3" :rules="rules" ref="form">
            <el-form-item prop="property_type">
              <el-checkbox v-model="form.property_type" v-for="item in typeOptions" :key="item.param_id" :label="item.param">{{item.param}}</el-checkbox>
            </el-form-item>
            <el-form-item label="提成方式" class='input' prop="commission_way">
              <el-select clearable placeholder="请选择提成方式" v-model="form.commission_way">
                <el-option v-for="item in commissionWayOption" :key="item.param_id" :label="item.param" :value="item.param_id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单位" class='input' prop="money_type">
              <el-select clearable placeholder="请选择币种" v-model="form.money_type">
                <el-option v-for="item in moneyTypeOption" :key="item.param_id" :label="item.param" :value="item.param_id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="参数" class='input' prop="param">
              <el-input v-model="form.param"></el-input>
            </el-form-item>
            <el-form-item label="跳点提成累积" class='input'>
              <el-radio-group v-model="form.is_total">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="跳点" class='input2'>
              <el-radio-group v-model="form.is_jump">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <div class='info' v-if="form.rule_id && form.is_jump == 1">
          <div class='title'>
            <div class='text'>跳点规则</div>
            <span class='btn'>
              <el-button type="primary" v-if="operationState!=3" @click="showAddJumpRule()">新增</el-button>
            </span>
          </div>
          <el-table :data="refund" border>
            <el-table-column label="序号" align='center' width="70px">
              <template slot-scope="scope">{{getIndex(scope)}}</template>
            </el-table-column>
            <el-table-column property="start" label="起始数" align='center'></el-table-column>
            <el-table-column property="end" label="截止数" align='center'></el-table-column>
            <!-- <el-table-column property="" label="提成公式" align='center'></el-table-column> -->
            <el-table-column property="value" label="固定金额" align='center'></el-table-column>
            <el-table-column label="是否累积" align='center'>
              <template slot-scope="scope">{{ scope.row.is_include == 1 ? '是 ' : '否' }}</template>
            </el-table-column>
            <el-table-column property="reward" label="奖励金额（元/套）" align='center'></el-table-column>
            <el-table-column label="操作" align='center' v-if="operationState!=3">
              <template slot-scope="scope">
                <el-button type="text" @click="showAddJumpRule(scope.row , true)">查看</el-button>
                <el-button type="text" @click="showAddJumpRule(scope.row)">修改</el-button>
                <el-button type="text" @click="removeJumpRule(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="跳点规则" :visible.sync="addJumpRuleDialog" @close="addJumpRuleDialog=false">
            <el-form :model="addJumpRuleForm" :disabled="jumpRuleIsDisabled" :rules="rules" ref="addJumpRuleForm">
              <el-form-item label="起始数" class='input11' prop="start">
                <el-input v-model="addJumpRuleForm.start" />
              </el-form-item>
              <el-form-item label="截止数" class='input11' prop="end">
                <el-input v-model="addJumpRuleForm.end" />
              </el-form-item>
              <el-form-item label="固定金额" class='input11' prop="value">
                <el-input v-model="addJumpRuleForm.value" />
              </el-form-item>
              <el-form-item label="奖励金额（元/套）" class='input' prop="reward">
                <el-input v-model="addJumpRuleForm.reward" />
              </el-form-item>
              <el-form-item label="是否累积" class='input11'>
                <el-radio-group v-model="addJumpRuleForm.is_include">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" v-if="!jumpRuleIsDisabled">
              <el-button @click="addJumpRuleDialog=false">取 消</el-button>
              <el-button type="primary" @click="addJumpRuleSubmit">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
      <!--  其他两种规则  -->
      <div v-if="broker_type != 1">
        <div class='infoform'>
          <div class='text'>规则设置</div>
          <el-form :model="form" :disabled="operationState==3" :rules="rules" ref="form">
            <el-form-item label="单位" class='input' prop="money_type">
              <el-select clearable placeholder="请选择币种" v-model="form.money_type">
                <el-option v-for="item in moneyTypeOption" :key="item.param_id" :label="item.param" :value="item.param_id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="参数" class='input' prop="param">
              <el-input v-model="form.param"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      rules: {
        start: [
          {
            required: true,
            message: "请输入起始数",
            change: "change",
            pattern: /^[0-9]+(.[0-9]{0})?$/
          }
        ],
        end: [
          {
            required: true,
            message: "请输入截至数",
            change: "change",
            pattern: /^[0-9]+(.[0-9]{0})?$/
          }
        ],
        value: [
          {
            required: true,
            message: "请输入固定金额，最多可有2位小数",
            change: "change",
            pattern: /^[0-9]+(.[0-9]{1,2})?$/
          }
        ],
        reward: [
          {
            required: true,
            message: "请输入奖励金额（元/套）",
            change: "change",
            pattern: /^[0-9]+(.[0-9]{1,2})?$/
          }
        ],

        property_type: [
          {
            type: "array",
            required: true,
            message: "请选择物业类型",
            change: "change"
          }
        ],
        commission_way: [
          {
            type: "number",
            required: true,
            message: "请选择提成方式",
            change: "change"
          }
        ],
        money_type: [
          {
            type: "number",
            required: true,
            message: "请选择货币单位",
            change: "change"
          }
        ],
        param: [
          {
            required: true,
            message: "请输入参数，必须位整数",
            change: "change",
            pattern: /^[0-9]+(.[0-9]{0})?$/
          }
        ]
      },
      refund: [],
      form: {
        rule_id: "",
        property_type: [],
        is_jump: 0,
        is_total: 0,
        money_type: "",
        commission_way: "",
        param: ""
      },
      value: "",
      typeOptions: [],
      commissionWayOption: [],
      moneyTypeOption: [],
      distribution: {},
      distributionDetail: {},
      broker_type: 0,
      isAddJumpRule: true,
      addJumpRuleForm: {
        rule_id: "",
        start: "",
        end: "",
        value: "",
        reward: "",
        is_include: 0
      },
      addJumpRuleDialog: false,
      jumpRuleIsDisabled: false,
      operationState: 1
    };
  },
  mounted() {
    this.distribution = this.$store.state.distribution.distribution;
    if (!this.distribution.project_id) {
      this.$router.push({ name: "distribution" });
      return;
    }
    this.broker_type = this.$route.query.broker_type;
    this.operationState = this.$route.query.operationState;
    this.distributionDetail = this.$store.state.distribution.detail;
    if (this.$route.query.rule_id) {
      this.form.rule_id = this.$route.query.rule_id;
      this.form.is_jump = 1;
      //获取佣金规则详情
      this.getRuleInfo();
      //获取佣金规则跳点规则列表
      this.getJumpRuleList();
    }
    this.getMoneyType();
    this.getCommissionWay();
    this.getType();
  },
  methods: {
    getIndex(row) {
      let index = row.$index + 1;
      return index;
    },
    //获取佣金规则详情
    async getRuleInfo() {
      let res = await this.api.getUpdateBrokeRule({
        rule_id: this.form.rule_id
      });
      if (res.code == 200) {
        let temp = res.data;
        console.log(temp);
        temp.property_type = temp.property_type.split(",");
        Object.assign(this.form, temp);

        let index = 0;
        if (this.operationState == 3) {
          for (let type of this.form.property_type) {
            let temp = {};
            temp.param = type;
            temp.id = index++;
            this.typeOptions.push(temp);
          }
        }
      }
    },
    //提交
    submit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          //如果是另外两种规则 则使用这一种提交
          if (this.broker_type != 1) {
            this.submitOtherRule();
            return;
          }
          let temp = {};
          temp.property_type = this.form.property_type.join(",");
          temp.company_rule_id = this.distribution.rule_id;
          temp.broker_type = this.broker_type;
          temp.is_jump = this.form.is_jump;
          temp.is_total = this.form.is_total;
          temp.money_type = this.form.money_type;
          temp.commission_way = this.form.commission_way;
          temp.param = this.form.param;
          if (!this.form.rule_id) {
            let res = await this.api.addBrokeRule(temp);
            if (res.code == 200) {
              this.$message({ type: "success", message: "新增成功" });
              this.form.rule_id = res.data;
            }
          } else {
            temp.rule_id = this.form.rule_id;
            let res = await this.api.updateBrokeRule(temp);
            if (res.code == 200) {
              this.$message({ type: "success", message: "修改成功" });
            }
          }
        } else {
          return false;
        }
      });
    },
    async submitOtherRule() {
      let temp = {};
      temp.company_rule_id = this.distribution.rule_id;
      temp.broker_type = this.broker_type;
      temp.money_type = this.form.money_type;
      temp.param = this.form.param;
      if (!this.form.rule_id) {
        let res = await this.api.addBrokeRule(temp);
        if (res.code == 200) {
          this.$message({ type: "success", message: "新增成功" });
          this.form.rule_id = res.data;
        }
      } else {
        temp.rule_id = this.form.rule_id;
        let res = await this.api.updateBrokeRule(temp);
        if (res.code == 200) {
          this.$message({ type: "success", message: "修改成功" });
        }
      }
      this.$router.push({ name: "ruleOfMaid" });
    },
    async getJumpRuleList() {
      let res = await this.api.getJumpRuleList({
        rule_id: this.form.rule_id
      });
      if (res.code == 200) {
        this.refund = res.data;
      }
    },
    async getCommissionWay() {
      let res = await this.api.getCommissionWay();
      if (res.code == 200) {
        this.commissionWayOption = res.data;
      }
    },
    async getMoneyType() {
      let res = await this.api.getMoneyType();
      if (res.code == 200) {
        this.moneyTypeOption = res.data;
      }
    },
    async getType() {
      if (this.broker_type != 1 || this.operationState == 3) {
        return;
      }
      let res = await this.api.getTags();
      if (res.code == 200) {
        //总物业类型
        let tempArr = res.data;
        let totalTypes = [];
        //当前项目拥有的物业类型 由于只能得到 id 这里把他转为 中文
        for (let tag of this.distributionDetail.property_tags) {
          let text = "";
          for (let temp of tempArr) {
            if (temp.param_id == tag) {
              totalTypes.push(temp);
            }
          }
        }

        //新增和修改
        if (this.operationState != 3) {
          for (let temp of totalTypes) {
            if (
              this.distribution.property_type &&
              this.distribution.property_type.includes(temp.param)
            ) {
            } else {
              this.typeOptions.push(temp);
            }
          }
        }

        if (this.typeOptions.length == 0 && this.operationState == 1) {
          this.$message({
            type: "error",
            message: "物业类型已使用完，不可新增"
          });
          this.$router.push({
            name: "ruleOfMaid"
          });
        }
      }
    },
    cancel() {
      this.$router.back();
    },
    showAddJumpRule(item, isDiabled) {
      this.jumpRuleIsDisabled = isDiabled;
      if (item) {
        this.isAddJumpRule = false;
        Object.assign(this.addJumpRuleForm, item);
      } else {
        this.isAddJumpRule = true;
        Object.assign(
          this.addJumpRuleForm,
          this.$options.data()["addJumpRuleForm"]
        );
      }
      this.addJumpRuleDialog = true;
    },

    addJumpRuleSubmit() {
      this.$refs["addJumpRuleForm"].validate(async valid => {
        if (valid) {
          this.addJumpRuleForm.rule_id = this.form.rule_id;
          let result = {};
          if (this.isAddJumpRule) {
            result = await this.api.addJumpRule(this.addJumpRuleForm);
          } else {
            result = await this.api.updateJumpRule(this.addJumpRuleForm);
          }
          if (result.code == 200) {
            this.$message({ type: "success", message: "提交成功" });
          }
          this.addJumpRuleDialog = false;
          this.getJumpRuleList();
        } else {
          return false;
        }
      });
    },
    removeJumpRule(item) {
      this.$confirm("此操作将删除成功, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let temp = {};
          temp.jump_id = item.jump_id;
          temp.rule_id = this.form.rule_id;
          let res = await this.api.deleteJumpRule(temp);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
          this.getJumpRuleList();
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
