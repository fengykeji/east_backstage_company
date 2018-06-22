<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.updateCommission {
  .el-form-item {
    margin: 0;
  }
}
</style>


<template>
    <div class='updateCommission'>
        <div class='table'>
            <div class='title'>
                <div class='title-text'></div>
                <el-button class='pos-btn-1' type="primary">确定</el-button>
                <el-button class='pos-btn' @click='cancel' type="primary">关闭</el-button>
            </div>
            <el-input v-model="searchObj.search" class='query' placeholder="可查询推荐编号"></el-input>
            <el-input v-model="searchObj.search" class='query' placeholder="可查询经纪人姓名"></el-input>
            <el-button icon="el-icon-search" circle></el-button>

            <div class='title-text'>未结列表</div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="序号" align='center'> </el-table-column>
                <el-table-column prop="project_name" label="推荐编号" align='center'></el-table-column>
                <el-table-column prop="end_time" label="经纪人名称" align='center' width="120px"></el-table-column>
                <el-table-column prop="developer_name" label="客户名称" align='center'></el-table-column>
                <el-table-column prop="city" label="成交房号" align='center'></el-table-column>
                <el-table-column prop="project_hold_name" label="物业类型" align='center' width="110px"></el-table-column>
                <el-table-column prop="project_hold_phone" label="合同总价" align='center'></el-table-column>
                <el-table-column prop="all_price" label="已付金额" align='center'></el-table-column>
                <el-table-column prop="all_price" label="付款方式" align='center'></el-table-column>
                <el-table-column prop="all_price" label="佣金类型" align='center'></el-table-column>
                <el-table-column prop="all_price" label="产生佣金时间" align='center' width="140px"></el-table-column>
                <el-table-column prop="all_price" label="佣金金额" align='center'></el-table-column>
                <el-table-column label="操作" align='center'>
                    <template slot-scope="scope">
                        <el-button type="text" @click='showAdd(scope.row)'>添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      sumbitForm: {},
      searchObj: {
        search: ""
      }
    };
  },
  mounted() {},
  methods: {
      showAdd(row){

      },
    cancel() {
      this.$router.push({
        name: "distri_commission"
      });
    },
  }
};
</script>

