<style lang="less" scoped src="../Project/index.less"></style>
<template>
    <div class='box'>
        <div class='title'>
            <span></span>
            <span class='left'>
                <div class='text1'>当前位置：分销佣金管理</div>
            </span>
              <el-input class='query'></el-input>
              <el-button icon="el-icon-search" circle></el-button>
        </div>
        <template>
  <el-table :data="tableData"  border  style="width: 100%">
    <el-table-column  prop="x" label="序号"  align='center'> </el-table-column>
    <el-table-column  prop="project_name" label="项目名称" align='center'></el-table-column>
    <el-table-column  prop="address" label="开始执行时间" align='center'></el-table-column>
    <el-table-column  prop="address" label="截至执行时间" align='center'></el-table-column>
    <el-table-column  prop="developer_name" label="房产商" align='center'></el-table-column>
    <el-table-column  prop="address" label="区域" align='center'></el-table-column>
    <el-table-column  prop="address" label="项目负责人" align='center'></el-table-column>
    <el-table-column  prop="address" label="联系方式" align='center'></el-table-column>
    <el-table-column  prop="address" label="累计金额" align='center'></el-table-column>
    <el-table-column  prop="address" label="已结金额" align='center'></el-table-column>
    <el-table-column  prop="address" label="扣款金额" align='center'></el-table-column>
    <el-table-column  prop="address" label="未结金额" align='center'></el-table-column>
    <el-table-column  prop="address" label="提醒状态" align='center'></el-table-column>
     <el-table-column property="address" label="操作" align='center' width="140px">
        <template slot-scope="scope">
          <el-button type="text" @click='see(scope.row)'>查看</el-button>
          <el-button type="text" @click='commissionApply(scope.row)'>佣金申请</el-button>
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
    this.getDistributionList();
  },
  methods:{
    see(row){

    },
   commissionApply(row){

   },
    async getDistributionList(){
      let res=await this.api.getDistributionList();
      if(res.code==200){
        this.tableData=res.data;
      }
    }
  }
  
};
</script>


