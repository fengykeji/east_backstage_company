<style lang="less" scoped>

</style>
<template>
    <div>
         <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="" label="序号" align='center' width="70px">
                    <template slot-scope="scope">{{getIndex(scope)}}</template>
                </el-table-column>
                <el-table-column prop="project_code" label="项目编号" align='center' width="90px"></el-table-column>
                <el-table-column prop="project_name" label="项目名称" align='center' ></el-table-column>
                <el-table-column prop="absolute_address" label="地址" align='center' width="300px"></el-table-column>
                <el-table-column prop="create_time" label="申请时间" align='center'></el-table-column>
                   <el-table-column prop="check_name" label="审核人" align='center'></el-table-column>
                <el-table-column prop="check_time" label="审核时间" align='center'></el-table-column>
                <el-table-column label="操作" align='center' width="120px">
                    <template slot-scope="scope">
                        <el-button type="text" @click='showAdd(2, scope.row)'>查看</el-button>
                           <el-button type="text">删除</el-button>
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
    examine(row,type) {
      this.$emit("examine", row,type);
    },
  }
};
</script>