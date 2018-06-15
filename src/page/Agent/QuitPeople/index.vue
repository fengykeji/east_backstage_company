<style lang="less" scoped src="../index.less" ></style>
<template>
    <div class='box'>
        <div class='title'>
            <span class='left'>
                <div class='text1'>当前位置：离职经纪人</div>
            </span>
                 <el-input class='query'></el-input>
                <el-button icon="el-icon-search" circle></el-button>
        </div>
        <template>
  <el-table :data="tableData"  border  style="width: 100%">
    <el-table-column  prop="" label="序号"  align='center'> </el-table-column>
    <el-table-column  prop="account"  label="云算号"  align='center' width="120px"></el-table-column>
    <el-table-column  prop="name" label="名称" align='center'></el-table-column>
    <el-table-column  prop="tel" label="联系方式" align='center' width="120px"></el-table-column>
    <el-table-column  prop="project_name" label="申请项目" align='center'></el-table-column>
    <el-table-column  prop="role" label="角色" align='center'>
        <template slot-scope="scope">{{getRole(scope.row.role)}}</template>
    </el-table-column>
    <el-table-column  prop="department" label="所属部门" align='center'></el-table-column>
    <el-table-column  prop="position" label="职位" align='center'></el-table-column>
    <el-table-column  prop="city" label="城市" align='center'></el-table-column>
    <el-table-column  prop="district" label="区域" align='center'></el-table-column>
    <el-table-column  prop="state" label="审核状态" align='center'>
        <template slot-scope="scope">{{auditingState(scope.row.state)}}</template>
    </el-table-column>
    <el-table-column  prop="entry_time" label="入职时间" align='center'></el-table-column>
    <el-table-column  prop="create_time" label="离职时间" align='center'></el-table-column>
    <el-table-column  prop="remark" label="离职原因" align='center' width="200px"></el-table-column>
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
      this.getQuitList();
  },
  methods:{

      getRole(row){
        if(row==1){
            return "经纪人"
        }else if(row==2){
            return "对接人"
        }
      },
        auditingState(row) {
      if (row == 0) {
        return "未通过";
      }else if (row == 2) {
        return "待审核";
      }
    },
      async getQuitList(){
          let res=await this.api.getQuitList();

          if(res.code=200){
              this.tableData=res.data.data;
          } 
      }
  }

};
</script>


