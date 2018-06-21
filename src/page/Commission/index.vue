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
        </div>
        <template>
  <el-table :data="tableData"  border  style="width: 100%">
    <el-table-column  prop="" label="序号"  align='center'> </el-table-column>
    <el-table-column  prop="project_name" label="项目名称" align='center'></el-table-column>
    <el-table-column  prop="address" label="开始执行时间" align='center'></el-table-column>
    <el-table-column  prop="address" label="截至执行时间" align='center'></el-table-column>
    <el-table-column  prop="company_name" label="所属单位" align='center' width="120px"></el-table-column>
    <el-table-column  prop="city_name" label="区域" align='center'></el-table-column>
    <el-table-column  prop="project_hold_name" label="项目负责人" align='center'></el-table-column>
    <el-table-column  prop="project_hold_phone" label="联系方式" align='center' width="110px"></el-table-column>
    <el-table-column  prop="all_all_price" label="全部累计金额" align='center'></el-table-column>
    <el-table-column  prop="all_y_price" label="全部已结金额" align='center'></el-table-column>
    <el-table-column  prop="all_n_price" label="全部未结金额" align='center'></el-table-column>
    <el-table-column  prop="company_all_price" label="公司累计金额" align='center'></el-table-column>
    <el-table-column  prop="company_y_price" label="公司已结金额" align='center'></el-table-column>
    <el-table-column  prop="company_n_price" label="公司未结金额" align='center'></el-table-column>
    <el-table-column  prop="person_all_price" label="全民经纪人累计金额" align='center'></el-table-column>
    <el-table-column  prop="person_y_price" label="全民经纪人已结金额" align='center'></el-table-column>
    <el-table-column  prop="person_n_price" label="全民经纪人未结金额" align='center'></el-table-column>
    <el-table-column  label="操作" align='center'>
      <template slot-scope="scope">
        <el-button></el-button>
        <el-button></el-button>
      </template>
    </el-table-column>
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
        this.tableData=res.data.data;
      }
    },
  }
};
</script>


