<template>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="" label="序号" align='center' width="70px">
            <template slot-scope="scope">{{getIndex(scope)}}</template>
        </el-table-column>
        <el-table-column prop="project_code" label="门店名称" align='center' width="90px"></el-table-column>
        <el-table-column prop="project_name" label="门店店长" align='center' width="140px"></el-table-column>
        <el-table-column prop="city" label="联系方式" align='center'></el-table-column>
        <el-table-column prop="absolute_address" label="门店地址" align='center' width="220px"></el-table-column>
        <el-table-column prop="developer_name" label="所属公司" align='center' width="150px"></el-table-column>
        <el-table-column prop="company_relation" label="审核状态" align='center' width="150px"></el-table-column>
        <el-table-column prop="subordinate_company" label="查看位置" align='center' width="200px"></el-table-column>
        <el-table-column label="操作" align='center' width="100px">
            <template slot-scope="scope">
                <el-button type="text" @click='examine(scope.row)'>审核</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
  props: ["tableData"],
  methods: {
    examine(row) {
      this.$emit("examine", row);
    },
    getIndex(row) {
      let index = row.$index + 1;
      return index;
    }
  }
};
</script>
<style lang="less" scoped>
</style>


