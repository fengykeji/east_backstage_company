<style lang="less" scoped>
.fastDistribution {
  .page {
    padding-top: 10px;
  }
}
</style>

<style lang="less">
.fastDistribution {
  padding-top: 20px;
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
    top: 0px;
    right: 0;
  }
  .table {
    margin-bottom: 20px;
    text-align: right;
    .el-button {
      margin-bottom: 0px;
    }
    .title {
      text-align: left;
      position: relative;
      .text {
        font-size: 18px;
        width: 200px;
        margin-bottom: 30px;
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
        <el-table-column prop="nub" label="序号" align='center' width="70px">
          <template slot-scope="scope">{{getIndex(scope)}}</template>
        </el-table-column>
        <el-table-column prop="account" label="云算号" align='center'></el-table-column>
        <el-table-column prop="name" label="名称" align='center'></el-table-column>
        <el-table-column prop="tel" label="联系方式" align='center'></el-table-column>
        <el-table-column prop="department" label="所属部门" align='center'></el-table-column>
        <el-table-column prop="position" label="职位" align='center' width="120px"></el-table-column>
        <el-table-column prop="entry_time" label="入职时间" align='center'></el-table-column>
        <el-table-column prop="create_time" label="分配时间" align='center' width="160px"></el-table-column>
        <el-table-column prop="state" label="状态" align='center'>
          <template slot-scope="scope">{{state(scope.row.state)}}</template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" align='center' width="140px">
          <template slot-scope="scope">
            <el-button type="text" @click='showAdd(0, scope.row)'>查看</el-button>
            <el-button type="text" @click='remove(scope.row)'>结束</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background class='page' layout="prev, pager, next" :page-size="pageSize" :current-page="page" :total="total" @current-change="pageChange">
      </el-pagination>
    </div>
    <div class='table'>
      <div class='title'>
        <div class='text'>到访确认人审核信息</div>
      </div>
      <el-table :data="examine" border>
        <el-table-column label="序号" align='center' width="70px">
          <template slot-scope="scope">{{getIndex(scope)}}</template>
        </el-table-column>
        <el-table-column prop="account" label="云算号" align='center'></el-table-column>
        <el-table-column prop="name" label="名称" align='center'></el-table-column>
        <el-table-column prop="tel" label="联系方式" align='center'></el-table-column>
        <el-table-column prop="department" label="所属部门" align='center'></el-table-column>
        <el-table-column prop="position" label="职位" align='center' width="120px"></el-table-column>
        <el-table-column prop="entry_time" label="申请时间" align='center'></el-table-column>
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
      <el-pagination background class='page' layout="prev, pager, next" :page-size="pageSize1" :current-page="page" :total="total1" @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
      pageSize: 0,
      total: 0,
      pageSize1: 0,
      total1: 0,
      maintain: [],
      examine: [],
      project_id: "",
      agent_id: "",
      operationType: 0 //0 查看  1 审核  2 审核的查看
    };
  },
  mounted() {
    this.project_id = this.$route.params.project_id;
    if (this.project_id) {
      this.getAgent();
    } else {
      this.$router.push({ name: "distribution" });
    }
  },
  methods: {
    remove(row) {
      this.$confirm("此操作将结束到访确认人的权利, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.api.endAgent({ agent_id: row.agent_id });
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "结束成功!"
            });
            this.getAgent();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消结束到访确认人的权利"
          });
        });
    },
    async getAgent() {
      let res = await this.api.getAgent({ project_id: this.project_id });
      if (res.code == 200) {
        this.maintain = res.data.y_info.data;
        this.examine = res.data.n_info.data;
        this.total = res.data.y_info.total;
        this.pageSize = res.data.y_info.per_page;
        this.total1 = res.data.n_info.total;
        this.pageSize1 = res.data.n_info.per_page;
      }
    },
    getIndex(row) {
      let index = row.$index + 1 + (this.page - 1) * this.pageSize;
      return index;
    },
    pageChange(page) {
      this.page = page;
      this.getAgent();
    },
    cancel() {
      this.$router.push({ name: "distribution" });
    },
    async showAdd(type, row) {
      if (type == 0) {
        //查看
        this.$router.push({
          name: "addPerson",
          params: {
            project_id: this.project_id,
            operationType: type,
            agent_id: row.agent_id
          }
        });
      } else if (type == 1) {
        //审核
        this.$router.push({
          name: "addPerson",
          params: {
            agent_id: row.agent_id,
            operationType: type,
            project_id: row.project_id,
            ex_id: row.ex_id
          }
        });
      } else if (type == 2) {
        //审核的查看
        this.$router.push({
          name: "addPerson",
          params: {
            agent_id: row.agent_id,
            operationType: type
          }
        });
      }
    },
    state(row) {
      if (row == 0) {
        return "禁用";
      } else if (row == 1) {
        return "正常";
      }
    },
    authenticationState(row) {
      if (row == 2) {
        return "待审核";
      } else if (row == 0) {
        return "未通过 ";
      } else if (row == 1) {
        return "审核通过 ";
      }
    },
    addShow() {
      //新增
      this.$router.push({
        name: "addPerson",
        params: { project_id: this.project_id }
      });
    }
  }
};
</script>

