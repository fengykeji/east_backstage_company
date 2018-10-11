<style lang="less" scoped>
</style>
<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" class="mt-30">
      <el-table-column prop="" label="序号" align='center' width="70px">
        <template slot-scope="scope">{{getIndex(scope)}}</template>
      </el-table-column>
      <el-table-column prop="sub_code" label="合同编号" align='center' width="90px"></el-table-column>
      <el-table-column prop="house_code" label="房源编号" align='center'></el-table-column>
      <el-table-column prop="project_name" label="所属项目" align='center'></el-table-column>
      <el-table-column prop="store_name" label="所属门店" align='center'></el-table-column>
      <el-table-column prop="agent_name" label="代办人" align='center' width="90px"></el-table-column>
      <el-table-column prop="agent_tel" label="代办人电话" align='center' width="110px"></el-table-column>
      <el-table-column label="房号" align='center' width="100px">
        <template slot-scope="scope">{{scope.row.build_name + scope.row.unit_name + scope.row.house_name}}</template>
      </el-table-column>
      <el-table-column prop="build_area" label="产权面积(㎡)" align='center' width="110px"></el-table-column>
      <el-table-column prop="total_price" label="交易总价(￥)" align='center' width="110px"></el-table-column>
      <el-table-column prop="break_money" label="违约金(￥)" align='center' width="90px"></el-table-column>
      <el-table-column prop="earnest_money" label="诚意金(￥)" align='center' width="90px"></el-table-column>
      <el-table-column prop="appoint_construct_time" label="签约日期" align='center' width="100px"></el-table-column>
      <el-table-column label="状态" align='center' width="60px">
        <template slot-scope="scope">{{check_state(scope.row.check_state)}}</template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" align='center' width="140px">
        <template slot-scope="scope">
          <el-button type="text" @click='printing(scope.row,1)'>打印</el-button>
          <el-button type="text" @click='examine(scope.row,2)'>查看</el-button>
          <el-button type="text" @click='examine(scope.row,3)'>挞定</el-button>
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
    check_state(row) {
      if (row == 1) {
        return "有效";
      } else if (row == 0) {
        return "挞定";
      }
    },
    examine(row, type) {
      this.$emit("examine", row, type);
    },
    printing(row, type) {
      this.$emit("printing", row, type);
    }
  }
};
</script>