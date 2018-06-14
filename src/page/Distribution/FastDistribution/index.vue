<style lang="less" scoped >
.fastDistribution{
    padding-top: 50px;
    margin:0 auto;
    width: 1200px;
    .table{
        margin-bottom: 50px;
        text-align: right;
        .el-button{
            margin-bottom: 20px;
         
        }
    }
   
}
</style>
<template>
    <div class='fastDistribution'>
       <div class='table'>
            <div>到访确认人维护信息</div>
            <el-button type="primary" class='addBtn' @click='addShow'>新增</el-button>
            <el-button type="primary" class='addBtn' @click='cancel'>关闭</el-button>
            <el-table :data="maintain" border>
                <el-table-column prop="nub" label="序号" align='center' width="70px"></el-table-column>
                <el-table-column prop="account" label="云算号" align='center'></el-table-column>
                <el-table-column prop="name" label="名称" align='center'></el-table-column>
                <el-table-column prop="tel" label="联系方式" align='center'></el-table-column>
                <el-table-column prop="department" label="所属部门" align='center'></el-table-column>
                <el-table-column prop="position" label="职位" align='center'></el-table-column>
                <el-table-column prop="entry_time" label="入职时间" align='center'></el-table-column>
                <el-table-column prop="create_time" label="分配时间" align='center'></el-table-column>
                <el-table-column prop="state" label="工作状态" align='center'></el-table-column>
                <el-table-column prop="operation" label="操作" align='center' width="120px">
                    <template slot-scope="scope">
                        <el-button type="text" @click='showAdd(2, scope.row)'>查看</el-button>
                        <el-button type="text" @click='showAdd(1, scope.row)'>修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
       </div>
       <div class='table'>
            <title>到访确认人审核信息</title>
            <el-table :data="examine" border>
                <el-table-column prop="nub" label="序号" align='center' width="70px"></el-table-column>
                <el-table-column prop="account" label="云算号" align='center'></el-table-column>
                <el-table-column prop="name" label="名称" align='center'></el-table-column>
                <el-table-column prop="tel" label="联系方式" align='center'></el-table-column>
                <el-table-column prop="department" label="所属部门" align='center'></el-table-column>
                <el-table-column prop="position" label="职位" align='center'></el-table-column>
                <el-table-column prop="entry_time" label="入职时间" align='center'></el-table-column>
                <el-table-column prop="state" label="审核状态" align='center' width="90px">
                <template slot-scope="scope">{{authenticationState(scope.row.state)}}</template>
                </el-table-column>
                <el-table-column prop="operation" label="操作" align='center' width="120px">
                    <template slot-scope="scope">
                        <el-button type="text" @click='showAdd(2, scope.row)'>查看</el-button>
                        <el-button type="text" @click='showAdd(1, scope.row)'>审核</el-button>
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
      project_id: "",
      maintain: [],
      examine: [],
    };
  },
  mounted() {
        this.getAgent();
    this.project_id= this.$route.params.project_id;
    if (this.project_id) {
    
    }
  },
  methods: {
    async getAgent() {
      let res = await this.api.getAgent({project_id:this.project_id});
      console.log(res)
      if (res.code == 200) {
        this.maintain = res.data.y_info;
        this.examine=res.data.n_info;
      }
    },
    cancel(){
         this.$router.push({ name: "distribution", params: this.$route.params });
    },
    showAdd() {},
    authenticationState(row) {
      if (row == 1) {
        return "未认证";
      } else if (row == 2) {
        return "已认证";
      }
    },
    addShow(){
        this.$router.push({ name: "addPerson" });
    }
  }
};
</script>

