<style lang="less" scoped >
.projectInfo {
  width: 900px;
  margin: 0 auto;
  border: 1px solid #999;
  text-align: left;
  padding: 15px 30px;
  margin-top: 20px;
  .input {
    width: 190px;
    display: inline-block;
    padding-right: 31px;
  }
  .input1 {
    padding-top: 10px;
    width: 300px;
  }
  .el-form-item {
    margin: 0;
  }
  .text {
    vertical-align: middle;
    font-size: 14px;
    color: #333;
    line-height: 40px;
    padding: 0 12px 0 0;
  }
  .title-text {
    font-size: 16px;
    padding: 5px 0;
    position: relative;
    color: #333;
  }
  .dialog-footer {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
<style lang="less">
.projectInfo {
  .el-form-item__label {
    float: none;
    color: #333;
  }
  .el-table td,
  .el-table th {
    padding: 4px 0;
    color: #333;
  }
}
</style>

<template>

  <div class='projectInfo'>
    <div class='title-text'>项目分销详情
      <div slot="footer" class="dialog-footer">
        <el-button @click='cancel'>关 闭</el-button>
        <el-button type="primary" v-if="!isDisable()" @click='submit'>提 交</el-button>
      </div>
    </div>
    <el-form :model="submitForm" class='form' :disabled="!(operationType==1)">
      <div>
        <el-form-item label="项目编号" class='input'>
          <el-input v-model="submitForm.project_code" auto-complete="off" placeholder="请输入项目编号"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" class='input'>
          <el-input v-model="submitForm.project_name" auto-complete="off" placeholder="请输入项目名称"></el-input>
        </el-form-item>
      </div>
      <!-- 物业类型 -->
      <div class="text">物业类型</div>
      <el-form-item prop="property_tags">
        <el-checkbox v-model="submitForm.property_tags" v-for="item in typeOptions" :key="item.param_id" :label="item.param_id">{{item.param}}</el-checkbox>
      </el-form-item>
      <div class='text'>现住地址</div>
      <el-form-item>
        <city-selector :province.sync="submitForm.province" :city.sync="submitForm.city" :district.sync="submitForm.district" />
        <el-input class='input1' v-model="submitForm.absolute_address"></el-input>
      </el-form-item>
      <el-form-item label="项目负责人" class='input'>
        <el-input v-model="submitForm.project_hold_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" class='input'>
        <el-input v-model="submitForm.project_hold_phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="开发商" class='input'>
        <el-input v-model="submitForm.developer_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="结佣单位" class='input'>
        <el-input v-model="submitForm.statement_company" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属单位" class='input'>
        <el-input v-model="submitForm.subordinate_company" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="与项目关系" class='input'>
        <el-input v-model="submitForm.company_relation" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <!-- <div v-if="this.auditing_state==1">
      <div class='title-text'>审核项目信息</div>
      <el-form :model="submitForm.auditProject">
        <div>
          <el-form-item label="审核人员" class='input'>
            <el-input v-model="submitForm.fp_name" auto-complete="off" :disabled="operationType==0"></el-input>
          </el-form-item>
          <el-form-item label="审核时间" class='input'>
            <el-input v-model="submitForm.fp_time" auto-complete="off" :disabled="operationType==0"></el-input>
          </el-form-item>
          <el-form-item label="备注" class='input'>
            <el-input v-model="submitForm.remark" auto-complete="off" :disabled="operationType==0"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div> -->
    <div v-if="this.auditing_state==1&&operationType==0">
      <div class='title-text'>到访确认人信息</div>
      <el-table :data="peopleInfo" border>
        <el-table-column label="序号" align='center' width="70px">
          <template slot-scope="scope">{{getIndex(scope)}}</template>
        </el-table-column>
        <el-table-column property="account" label="云算号" align='center'></el-table-column>
        <el-table-column property="name" label="名称" align='center'></el-table-column>
        <el-table-column property="tel" label="联系方式" align='center' width="110px"></el-table-column>
        <el-table-column property="department" label="所属部门" align='center'></el-table-column>
        <el-table-column property="position" label="职位" align='center'></el-table-column>
        <el-table-column property="entry_time" label="入职时间" align='center'></el-table-column>
        <el-table-column property="create_time" label="分配时间" align='center'></el-table-column>
        <el-table-column label="操作" align='center'>
          <template slot-scope="scope">
            <el-button type='text' @click='remove(scope.row)'>结束</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if='operationType==1||operationType==0'>
      <div class='title-text'>结佣规则</div>
      <el-table :data="gridData" border>
        <el-table-column prop="state" label="申请状态" align='center'>
          <template slot-scope="scope">{{state(scope.row.state)}}</template>
        </el-table-column>
        <el-table-column prop="end_state" label="执行状态" align='center'>
          <template slot-scope="scope">{{end_state(scope.row.end_state)}}</template>
        </el-table-column>
        <el-table-column label="操作" align='center'>
          <template slot-scope="scope">
            <el-button type='text' @click='seeShow(scope.row)'>查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import CitySelector from "../../../components/CitySelector";
export default {
  data() {
    return {
      submitForm: {
        province: "",
        city: "",
        district: "",
        project_id: "",
        rule_id: "",
        auditProject: {},
        property_tags: [],
        state: ""
      },
      peopleInfo: [],
      project_id: "",
      rule_id: "",
      typeOptions: [],
      operationType: 0,
      auditing_state: "",
      gridData: [],
      distribution: {}
    };
  },
  mounted() {
    this.distribution = this.$store.state.distribution.distribution;
    this.auditing_state = this.distribution.state;
    this.project_id = this.distribution.project_id;
    this.rule_id = this.distribution.rule_id;
    this.operationType = this.$store.state.operationType;
    if (this.project_id) {
      this.getProjectDetail();
      this.getType();
    } else {
      this.$router.push({ name: "distribution" });
    }
  },
  methods: {
    seeShow() {
      this.$router.push({
        name: "ruleOfMaid"
      });
    },
    remove(row) {
      this.$confirm("此操作将结束到访确认人的权利, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.api.endAgent({ agent_id: row.agent_id });
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "结束成功!"
            });
            this.getProjectDetail();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消结束到访确认人的权利"
          });
        });
    },
    getIndex(row) {
      let index = row.$index + 1;
      return index;
    },
    end_state(row) {
      if (row == 0) {
        return "执行中";
      } else {
        return "已终止";
      }
    },
    state(row) {
      if (row == 1) {
        return "通过";
      } else if (row == 0) {
        return "拒绝";
      } else if (row == 2) {
        return "待审核";
      }
    },
    async getType() {
      let res = await this.api.getTags();
      if (res.code == 200) {
        this.typeOptions = res.data;
      }
    },
    isDisable() {
      if (this.operationType == 0) {
        return true;
      } else if (this.operationType == 1) {
        return false;
      } else {
        return false;
      }
    },
    async getProjectDetail() {
      Object.assign(this.submitForm, this.$route.params.projectInfo);
      if (this.operationType == 0) {
        let res = await this.api.getRole({
          project_id: this.project_id,
          rule_id: this.rule_id
        });
        if (res.code == 200) {
          Object.assign(this.submitForm, res.data.project);
          let property_tags = res.data.project.property_tags;
          let arr = [];
          for (let type of property_tags) {
            arr.push(type.property_tag_id);
          }
          this.submitForm.property_tags = arr;
          this.gridData = res.data.broker;
          this.peopleInfo = res.data.agent;
        }
      } else {
        Object.assign(this.submitForm, this.$route.params.projectInfo);
        let res = await this.api.applyProject({ project_id: this.project_id });
        if (res.code == 200) {
          Object.assign(this.submitForm, res.data);
          let property_tags = res.data.property_tags;
          let arr = [];
          for (let type of property_tags) {
            arr.push(type.property_tag_id);
          }
          this.submitForm.property_tags = arr;
        }
      }
      this.$store.commit("distributionDetail", { ...this.submitForm });
    },
    async search() {
      let res = await this.api.changeProjectList({
        project_id: this.submitForm.project_id
      });
      if (res.code == 200) {
        this.sumbitForm = res.data;
      }
    },
    submit() {
      this.$confirm("此操作将提交成功, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.api.changeProjectAdd({
            project_id: this.project_id
          });
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "提交成功!"
            });
            this.distribution.rule_id = res.data;
            this.$router.push({
              name: "ruleOfMaid"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交"
          });
        });
    },
    cancel() {
      if (this.operationType != undefined) {
        this.$router.push({ name: "distribution" });
      } else {
        this.$router.push({ name: "startApply" });
      }
    }
  },
  components: {
    CitySelector: CitySelector
  }
};
</script>
