<style lang="less" scoped >
.projectInfo {
  width: 900px;
  margin: 0 auto;
  border: 1px solid #999;
  text-align: left;
  padding: 15px 30px;
   margin-top: 90px;
  .input {
    width: 180px;
    display: inline-block;
    padding-right: 30px;
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
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
  }
  .title-text {
    font-size: 16px;
    padding: 5px 0;
  }
  .dialog-footer {
    text-align: right;
    padding-top: 20px;
  }
}
</style>
<template>
  <div class='projectInfo'>
    <div class='title-text'>项目分销详情</div>
    <el-form :model="submitForm" class='form' :disabled="isDisable()">
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
        <city-selector :province.sync="submitForm.province_name" :city.sync="submitForm.city_name" :district.sync="submitForm.district_name" />
        <el-input class='input1' v-model="submitForm.absolute_address"></el-input>
      </el-form-item>
      <el-form-item label="项目状态" class='input'>
        <template slot-scope="scope">
          {{state(submitForm.state)}}</template>
      </el-form-item><br/>
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
    <!-- <div class='title-text'>结佣规则</div>
        <el-table :data="gridData" border>
            <el-table-column  type="selection"></el-table-column>
            <el-table-column prop="date" label="序号" align='center'></el-table-column>
            <el-table-column prop="name" label="计划开始日期" align='center'></el-table-column>
            <el-table-column prop="address" label="计划截至日期" align='center'></el-table-column>
            <el-table-column prop="address" label="实际开始日期" align='center'></el-table-column>
            <el-table-column prop="address" label="实际截至日期" align='center'></el-table-column>
            <el-table-column prop="address" label="申请状态" align='center'></el-table-column>
            <el-table-column prop="address" label="执行状态" align='center'></el-table-column>
            <el-table-column label="操作" align='center'>
                <template slot-scope="scope">
                <el-button>查看</el-button>
            </template>
            </el-table-column>
        </el-table> -->
    <div class='title-text'>审核项目信息</div>
    <el-form :model="submitForm.auditProject">
      <div>
        <el-form-item label="审核人员" class='input'>
          <el-input v-model="submitForm.fp_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="审核时间" class='input'>
          <el-input v-model="submitForm.fp_time" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="审核状态" class='input'>
          <el-input v-model="submitForm.state" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" class='input'>
          <el-input v-model="submitForm.remark" auto-complete="off"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class='title-text'>到访确认人信息</div>
    <el-table :data="submitForm.peopleInfo" border>
      <el-table-column property="nub" label="序号" align='center' width="70px"></el-table-column>
      <el-table-column property="company_name" label="云算号" align='center'></el-table-column>
      <el-table-column property="company_relation" label="名称" align='center'></el-table-column>
      <el-table-column property="s_time" label="联系方式" align='center'></el-table-column>
      <el-table-column property="e_time" label="所属部门" align='center'></el-table-column>
      <el-table-column property="project_hold_name" label="职位" align='center'></el-table-column>
      <el-table-column property="project_hold_phone" label="入职时间" align='center'></el-table-column>
      <el-table-column property="project_hold_phone" label="申请时间" align='center'></el-table-column>
      <el-table-column property="project_hold_phone" label="审核状态" align='center'></el-table-column>
      <el-table-column property="project_hold_phone" label="分配时间" align='center'></el-table-column>
      <el-table-column property="project_hold_phone" label="工作状态" align='center'></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click='cancel'>关 闭</el-button>
      <el-button type="primary" @click='submit' :disabled="isDisable()">提 交</el-button>
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
        auditProject: {},
        peopleInfo: [],
        property_tags: []
      },
      project_id: "",
      typeOptions: []
    };
  },
  mounted() {
    if (this.$route.params.project_id) {
      this.operationType = this.$route.params.operationType;
      this.project_id = this.$route.params.project_id;
      this.getProjectDetail();
      this.getType();
    } else {
      this.$router.push({ name: "startApply" });
    }
  },
  methods: {
    async getType() {
      let res = await this.api.getTags();
      if (res.code == 200) {
        this.typeOptions = res.data;
      }
    },
    state(row) {
      if (row == 1) {
        return "正常";
      } else if (row == 0) {
        return "弃用";
      } else if (row == 2) {
        return "已转新房";
      } else if (row == 3) {
        return "已转二手房";
      }
    },
    isDisable() {
      if (this.operationType == 0) {
        return true;
      } else {
        return false;
      }
    },
    async getProjectDetail() {
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
    },
    async search() {
      let res = await this.api.changeProjectList({
        project_id: this.submitForm.project_id
      });
      if (res.code == 200) {
        this.sumbitForm = res.data;
      }
    },
    async submit() {
      let res = this.api.changeProjectAdd({
        project_id: this.submitForm.project_id
      });
      if (res.code == 200) {
        this.$router.push({ name: "distribution" });
      }
    },
    cancel() {
      if (this.$route.params.operationType != undefined) {
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
