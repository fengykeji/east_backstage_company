<style lang="less">
.fastDistribution {
  padding-top: 50px;
  margin: 0 auto;
  width: 1200px;
  .el-table th {
    padding: 5px 0;
  }
  .el-table td {
    padding: 0;
  }
  .search {
    position: absolute;
    top: -10px;
    right: 0;
  }
  .table {
    margin-bottom: 20px;
    text-align: right;
    .el-button {
      margin-bottom: 20px;
    }
    .title {
      text-align: left;
      position: relative;
      .text {
        font-size: 18px;
        width: 200px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
<template>
  <div class='fastDistribution'>
    <div class='table'>
      <div class='title'>
        <div class='text'>到访确认人维护信息</div>
        <span class='search'>
          <el-button type="primary" class='addBtn' @click='addShow'>新增</el-button>
          <el-button type="primary" class='addBtn' @click='cancel'>关闭</el-button>
        </span>
      </div>
      <el-table :data="maintain" border>
        <el-table-column prop="nub" label="序号" align='center' width="70px"></el-table-column>
        <el-table-column prop="account" label="云算号" align='center'></el-table-column>
        <el-table-column prop="name" label="名称" align='center'></el-table-column>
        <el-table-column prop="tel" label="联系方式" align='center'></el-table-column>
        <el-table-column prop="department" label="所属部门" align='center'></el-table-column>
        <el-table-column prop="position" label="职位" align='center'></el-table-column>
        <el-table-column prop="entry_time" label="入职时间" align='center'></el-table-column>
        <el-table-column prop="create_time" label="分配时间" align='center' width="160px"></el-table-column>
        <el-table-column prop="operation" label="操作" align='center' width="120px">
          <template slot-scope="scope">
            <el-button type="text" @click='showAdd(2, scope.row)'>查看</el-button>
            <el-button type="text" @click='showAdd(1, scope.row)'>修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class='table'>
      <div class='title'>
        <div class='text'>到访确认人审核信息</div>
      </div>
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
      maintain: [],
      examine: [],
      sumbitForm: {
        project_id: "",
        id: ""
      }
    };
  },
  mounted() {
    this.project_id = this.$route.params.project_id;
    if (this.project_id) {
      this.getAgent();
    }else{
      this.$router.push({name:"distribution"});
    }
  },
  methods: {
    async getAgent() {
      let res = await this.api.getAgent({ project_id: this.project_id });
      if (res.code == 200) {
        this.maintain = res.data.y_info;
        this.examine = res.data.n_info;
      }
    },
    cancel() {
      this.$router.push({ name: "distribution"});
    },
    showAdd() {},
    authenticationState(row) {
      if (row == 0) {
        return "待审核";
      } else if (row == 2) {
        return "未通过 ";
      }
    },
    addShow() {
      this.$router.push({ name: "addPerson"});
    }
  }
};
</script>

