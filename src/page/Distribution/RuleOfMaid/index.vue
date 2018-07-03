<style lang="less" scoped src='./index.less'></style>
<style lang="less">
.ruleOfMaid {
  .el-table th {
    padding: 5px 0px;
  }
  .el-table td {
    padding: 0;
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
                <el-form v-model="sumbitForm">
                    <!-- <el-form-item label="甲方单位：" class='input'>
                        <el-input v-model="sumbitForm.deposit"></el-input>
                    </el-form-item> -->
                    <el-form-item label="甲方对接人" class='input'>
                        <el-input v-model="sumbitForm.project_docker"></el-input>
                    </el-form-item>
                    <el-form-item label="甲方对接人电话" class='input'>
                        <el-input v-model="sumbitForm.project_docker_tel"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="乙方单位：" class='input'>
                        <el-input v-model="sumbitForm.sell_docker"></el-input>
                    </el-form-item> -->
                    <el-form-item label="乙方对接人" class='input'>
                        <el-input v-model="sumbitForm.sell_docker"></el-input>
                    </el-form-item>
                    <el-form-item label="乙方对接人电话" class='input'>
                        <el-input v-model="sumbitForm.sell_docker_tel"></el-input>
                    </el-form-item>
                    <el-form-item label="合同开始日期" class='input'>
                        <el-date-picker v-model="sumbitForm.compact_begin" type="date" placeholder="选择日期" class="block"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="合同截至日期" class='input'>
                        <el-date-picker v-model="sumbitForm.compact_end" type="date" placeholder="选择日期" class="block"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="实际开始日期" class='input'>
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
                        <el-button type="primary">新增</el-button>
                    </span>
                </div>
                <el-table :data="refund.file" border>
                    <el-table-column label="文件名称" prop="file_name" align='center'></el-table-column>
                    <el-table-column label="附件" align='center'>
                        <template slot-scope='scope'>
                            <a target="_blank" :href="'http://120.27.21.136:2798/' + scope.row.url">查看附件</a>
                        </template>
                    </el-table-column>
                    <el-table-column property="create_name" label="上传人员" align='center'></el-table-column>
                    <el-table-column property="create_time" label="上传时间" align='center'></el-table-column>
                    <el-table-column label="操作" align='center'>
                        <template slot-scope="scope">
                            <el-button type="primary">删除</el-button>
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
  },
  methods: {
    async sumbit() {
      let temp = Object.assign({}, this.sumbitForm);
      temp.project_id = this.project_id;
      temp.rule_id = this.rule_id;
      console.log(temp);
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
    },
    addShow() {
      this.$router.push({
        name: "ruleSetting"
      });
    },
    cancel() {
      this.$router.push({
        name: "startApply"
      });
    }
  }
};
</script>
