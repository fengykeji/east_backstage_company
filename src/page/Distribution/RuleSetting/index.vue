<style lang="less" scoped src='./index.less'>
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
                <el-form v-model="xx">
                    <el-form-item label="物业类型" class='input'>
                        <el-input v-model="xx.deposit"></el-input>
                    </el-form-item>
                    <el-form-item label="跳点提成累积" class='input'>
                        <el-input v-model="xx.no_price"></el-input>
                    </el-form-item>
                    <el-form-item label="跳点" class='input'>
                        <el-input v-model="xx.allow"></el-input>
                    </el-form-item>
                    <el-form-item label="提成方式" class='input'>
                        <el-input v-model="xx.deposit"></el-input>
                    </el-form-item>
                    <el-form-item label="单位" class='input'>
                        <el-input v-model="xx.no_price"></el-input>
                    </el-form-item>
                    <el-form-item label="参数" class='input'>
                        <el-input v-model="xx.allow"></el-input>
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
      xx: [],
      refund: []
    };
  },
  mounted() {},
  methods: {
    cancel() {
      this.$router.push({
        name: "ruleOfMaid"
      });
    }
  }
};
</script>
