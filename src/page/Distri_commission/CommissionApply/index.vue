<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.maidInfo{
    .el-form-item{
        margin: 0;
    }
}
</style>


<template>
    <div class='maidInfo'>
        <div class='table'>
            <div class='title'>
                <div class='title-text'>申请信息</div>
                <el-button class='pos-btn-1' type="primary">确定</el-button>
                <el-button class='pos-btn' @click='cancel' type="primary">关闭</el-button>
            </div>
            <el-form v-model="sumbitForm" class='form'>
                <el-form-item label="申请名称" class='row'>
                    <el-input v-model="sumbitForm.deposit" auto-complete="off" class='input'></el-input>
                </el-form-item>
                 <el-form-item label="申请笔数" class='row'>
                    <el-input v-model="sumbitForm.allow" auto-complete="off" class='input'></el-input>
                </el-form-item> </br>
                <el-form-item label="申请金额（￥）：" class='row'>
                    <el-input v-model="sumbitForm.no_price" auto-complete="off" class='input'></el-input>
                </el-form-item>
                <el-form-item label="扣款金额（￥）：" class='row'>
                    <el-input v-model="sumbitForm.allow" auto-complete="off" class='input'></el-input>
                </el-form-item>
                <el-form-item label="审核金额（￥）：" class='row'>
                    <el-input v-model="sumbitForm.allow" auto-complete="off" class='input'></el-input>
                </el-form-item>
                <el-form-item label="甲方联系人" class='row'>
                    <el-input v-model="sumbitForm.allow" auto-complete="off" class='input'></el-input>
                </el-form-item>
                <el-form-item label="甲方联系电话" class='row'>
                    <el-input v-model="sumbitForm.allow" auto-complete="off" class='input'></el-input>
                </el-form-item>
                <el-form-item label="乙方联系人" class='row'>
                    <el-input v-model="sumbitForm.allow" auto-complete="off" class='input'></el-input>
                </el-form-item>
                <el-form-item label="乙方联系电话" class='row'>
                    <el-input v-model="sumbitForm.allow" auto-complete="off" class='input'></el-input>
                </el-form-item>
                <el-form-item label="申请类型" class='row'>
                    <el-input v-model="sumbitForm.allow" auto-complete="off" class='input'></el-input>
                </el-form-item>
                <el-form-item label="申请人员" class='row'>
                    <el-input v-model="sumbitForm.allow" auto-complete="off" class='input'></el-input>
                </el-form-item>
                <el-form-item label="申请时间" class='row'>
                    <el-input v-model="sumbitForm.allow" auto-complete="off" class='input'></el-input>
                </el-form-item>
            </el-form>

            <div class='title-text'>申请结佣列表</div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="序号" align='center'> </el-table-column>
                <el-table-column prop="project_name" label="推荐编号" align='center'></el-table-column>
                <el-table-column prop="begin_time" label="状态" align='center' width="120px"></el-table-column>
                <el-table-column prop="end_time" label="经纪人名称" align='center' width="120px"></el-table-column>
                <el-table-column prop="developer_name" label="佣金类型" align='center'></el-table-column>
                <el-table-column prop="city" label="时间" align='center'></el-table-column>
                <el-table-column prop="project_hold_name" label="佣金金额" align='center' width="110px"></el-table-column>
                <el-table-column prop="project_hold_phone" label="扣款金额" align='center'></el-table-column>
                <el-table-column prop="all_price" label="审核金额" align='center'></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      sumbitForm: {}
    };
  },
  mounted() {},
  methods: {
    cancel() {
      this.$router.push({
        name: "distri_commission"
      });
    }
  }
};
</script>

