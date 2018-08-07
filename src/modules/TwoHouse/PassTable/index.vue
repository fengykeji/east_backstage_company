<style lang="less" scoped>
</style>
<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="" label="序号" align='center' width="70px">
        <template slot-scope="scope">{{getIndex(scope)}}</template>
      </el-table-column>
      <el-table-column prop="project_code" label="项目编号" align='center' width="90px"></el-table-column>
      <el-table-column prop="project_name" label="项目名称" align='center'></el-table-column>
      <el-table-column prop="absolute_address" label="地址" align='center' width="300px"></el-table-column>
      <el-table-column prop="project_hold_name" label="项目负责人" align='center'></el-table-column>
      <el-table-column prop="project_hold_phone" label="联系电话" align='center'></el-table-column>
      <el-table-column prop="is_distribution" label="账号分配" align='center'></el-table-column>
      <el-table-column prop="source" label="来源" align='center' width="80px">
        <template slot-scope="scope">{{scopeState (scope.row.source)}}</template>
      </el-table-column>
      <el-table-column label="操作" align='center' width="270px">
        <template slot-scope="scope">
          <el-button type="text" @click='showAdd(2, scope.row)'>查看</el-button>
          <el-button type="text" @click='showAdd(1, scope.row)'>修改</el-button>
          <el-button type="text" @click='accountAdmin(scope.row)'>账号管理</el-button>
          <el-button type="text" @click='showAdd(3, scope.row)'>编辑楼盘字典</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: ["tableData"],
  methods: {
    getIndex(row) {
      let index = row.$index + 1;
      return index;
    },
    scopeState(row) {
      if (row == 1) {
        return "内部申请";
      } else if (row == 2) {
        return "外部申请";
      }
    },
    accountAdmin(row) {
      this.$emit("accountAdmin", row);
    },
    examine(row, type) {
      this.$emit("examine", row, type);
    }
  }
};
</script>