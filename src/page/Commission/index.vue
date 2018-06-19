<style lang="less" scoped src="./index.less" ></style>
<template>
    <div class='box'>
        <div class='title'>
            <span></span>
            <span class='left'>
                <div class='text1'>当前位置：佣金管理</div>
            </span>
              <el-input class='query'></el-input>
                <el-button icon="el-icon-search" circle></el-button>
            <span class='right'>
               
            </span>
        </div>
        <template>
  <el-table :data="tableData"  border  style="width: 100%">
    <el-table-column  prop="x" label="序号"  align='center'> </el-table-column>
    <el-table-column  prop="address" label="项目名称" align='center'></el-table-column>
    <el-table-column  prop="address" label="开始执行时间" align='center'></el-table-column>
    <el-table-column  prop="address" label="截至执行时间" align='center'></el-table-column>
    <el-table-column  prop="address" label="所属单位" align='center'></el-table-column>
    <el-table-column  prop="address" label="区域" align='center'></el-table-column>
    <el-table-column  prop="address" label="项目负责人" align='center'></el-table-column>
    <el-table-column  prop="address" label="联系方式" align='center'></el-table-column>
    <el-table-column  prop="address" label="全部累计金额" align='center'></el-table-column>
    <el-table-column  prop="address" label="全部已结金额" align='center'></el-table-column>
    <el-table-column  prop="address" label="全部未结金额" align='center'></el-table-column>
    <el-table-column  prop="address" label="公司累计金额" align='center'></el-table-column>
    <el-table-column  prop="address" label="公司已结金额" align='center'></el-table-column>
    <el-table-column  prop="address" label="公司未结金额" align='center'></el-table-column>
    <el-table-column  prop="address" label="全民经纪人累计金额" align='center'></el-table-column>
    <el-table-column  prop="address" label="全民经纪人已结金额" align='center'></el-table-column>
    <el-table-column  prop="address" label="全民经纪人未接金额" align='center'></el-table-column>
  </el-table>
</template>
    </div>
</template>
<script>
export default {
  data() {
    return {
        tableData:[],
    };
  },
  mounted(){
    this.getProjectCommissionList();
  },
  methods:{
    async getProjectCommissionList(){
      let res=await this.api.getProjectCommissionList();
      if(res.code==200){
        this.tableData=res.data;
      }
    },
  }
};
</script>


