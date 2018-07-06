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
                    <el-button type="primary">提交</el-button>
                    <el-button type="primary" @click='cancel'>关闭</el-button>
                </span>
            </div>
            <div class='infoform'>
                <div class='text'>规则设置</div>
                <el-form :model="form">
                    <el-form-item prop="property_type">
                        <el-checkbox v-model="form.property_type" v-for="item in typeOptions" :key="item.param_id" :label="item.param_id">{{item.param}}</el-checkbox>
                    </el-form-item>
                    <el-form-item label="提成方式" class='input'>
                        <el-select clearable placeholder="请选择提成方式" v-model="form.commission_way">
                            <el-option v-for="item in commissionWayOption" :key="item.param_id" :label="item.param" :value="item.param_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="单位" class='input'>
                        <el-select clearable placeholder="请选择币种" v-model="form.money_type">
                            <el-option v-for="item in moneyTypeOption" :key="item.param_id" :label="item.param" :value="item.param_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="参数" class='input'>
                        <el-input v-model="form.param"></el-input>
                    </el-form-item>
                    <el-form-item label="跳点提成累积" class='input'>
                        <el-radio-group v-model="form.is_total">
                            <el-radio label="是" value='1'></el-radio>
                            <el-radio label="否" value='0'></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="跳点" class='input2'>
                        <el-radio-group v-model="form.is_jump">
                            <el-radio label="是" value='1'></el-radio>
                            <el-radio label="否" value='0'></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </div>
            <div class='info'>
                <div class='title'>
                    <div class='text'>跳点规则</div>
                    <span class='btn'>
                        <el-button type="primary">新增</el-button>
                    </span>
                </div>
                <el-table :data="refund.file" border>
                    <el-table-column label="序号" align='center' width="70px">
                        <template slot-scope="scope">{{getIndex(scope)}}</template>
                    </el-table-column>
                    <el-table-column property="project_code" label="起始数" align='center'></el-table-column>
                    <el-table-column property="project_name" label="截止数" align='center'></el-table-column>
                    <el-table-column property="absolute_address" label="提成公式" align='center'></el-table-column>
                    <el-table-column property="project_hold_name" label="固定金额" align='center'></el-table-column>
                    <el-table-column property="project_hold_phone" label="是否累积" align='center'></el-table-column>
                    <el-table-column property="operation" label="奖励金额（元/套）" align='center'></el-table-column>
                    <el-table-column label="操作" align='center'>
                        <template slot-scope="scope">
                            <el-button type="text">查看</el-button>
                            <el-button type="text">修改</el-button>
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
      refund: [],
      form: {
        property_type: "",
        is_jump: "",
        is_total: "",
        money_type: "",
        commission_way: "",
        param: ""
      },
      value: "",
      typeOptions: [],
      commissionWayOption: [],
      moneyTypeOption: []
    };
  },
  mounted() {
    this.getType();
    this.getMoneyType();
    this.getCommissionWay();
  },
  methods: {
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
      let res = await this.api.getTags();
      if (res.code == 200) {
        this.typeOptions = res.data;
      }
    },
    cancel() {
      this.$router.push({
        name: "ruleOfMaid"
      });
    }
  }
};
</script>
