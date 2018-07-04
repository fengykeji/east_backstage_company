<style lang="less" scoped src="./index.less" ></style>
<style lang="less">
body {
  background-color: #fafafc;
}
.project {
  .el-form-item__label {
    float: none;
  }
  .el-dialog__body {
    padding-top: 0;
  }
  .el-dialog {
    width: 63%;
    top: -10%;
  }
  .el-table--border,
  .el-table--group {
    margin-top: 5px;
  }
  .el-table th {
    padding: 8px 0px;
    font-size: 14px;
    color: #333;
  }
  .el-table td {
    padding: 0;
    color: #333;
  }
}
</style>
<template>
  <div class='box project'>
    <div class='title'>
      <div class='left'>
        <div class="tab-block">
          <div class='text1'>当前位置：项目管理</div>
          <div class="tab-block-inner">
            <el-input v-model="searchObj.search" class='query' placeholder="可按项目编号/项目名称进行查询"></el-input>
            <el-button @click="search" icon="el-icon-search" circle></el-button>
            <el-button type="primary" @click='showAdd(0)'>新增</el-button>
          </div>
        </div>
        <div>
          <el-button class='tip' :class="tipActiveIndex==0?'active':''" type="text" @click="clickTip(0)">全部</el-button>
          <el-button class='tip' :class="tipActiveIndex==1?'active':''" type="text" @click="clickTip(1)">待审核</el-button>
          <el-button class='tip' :class="tipActiveIndex==2?'active':''" type="text" @click="clickTip(2)">审核不通过</el-button>
          <el-button class='tip' :class="tipActiveIndex==3?'active':''" type="text" @click="clickTip(3)">未认证</el-button>
          <el-button class='tip' :class="tipActiveIndex==4?'active':''" type="text" @click="clickTip(4)">已认证</el-button>
          <el-button class='tip' :class="tipActiveIndex==5?'active':''" type="text" @click="clickTip(5)">已转出</el-button>
        </div>
      </div>
    </div>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="" label="序号" align='center' width="70px">
          <template slot-scope="scope">{{getIndex(scope)}}</template>
        </el-table-column>
        <el-table-column prop="project_code" label="项目编号" align='center' width="90px"></el-table-column>
        <el-table-column prop="project_name" label="项目名称" align='center' width="140px"></el-table-column>
        <!-- 项目状态函数 -->
        <el-table-column prop="state" label="项目状态" align='center' width="90px">
          <template slot-scope="scope">{{projectState(scope.row.state)}}</template>
        </el-table-column>
        <el-table-column prop="city" label="区域" align='center'></el-table-column>
        <!-- <el-table-column  prop="absolute_address" label="地址" align='center' width="220px"></el-table-column> -->
        <el-table-column prop="developer_name" label="开发商" align='center' width="150px"></el-table-column>
        <el-table-column prop="company_relation" label="与项目关系" align='center' width="150px"></el-table-column>
        <el-table-column prop="subordinate_company" label="所属单位" align='center' width="200px"></el-table-column>
        <el-table-column prop="source" label="来源" align='center' width="80px">
          <template slot-scope="scope">{{scopeState (scope.row.source)}}</template>
        </el-table-column>
        <el-table-column prop="auth_state" label="认证状态" align='center'>
          <template slot-scope="scope">{{authenticationState (scope.row.auth_state)}}</template>
        </el-table-column>
        <!-- 审核状态函数 -->
        <el-table-column prop="check_state" label="审核状态" align='center'>
          <template slot-scope="scope">{{auditingState(scope.row.check_state)}}</template>
        </el-table-column>
        <el-table-column label="操作" align='center' width="130px">
          <template slot-scope="scope">
            <el-button type="text" @click='showAdd(2, scope.row)'>查看</el-button>
            <el-button type="text" @click='showAdd(1, scope.row)' v-if="scope.row.check_state==1||scope.row.check_state==2">修改</el-button>
            <el-button type="text" @click='showAdd(3, scope.row)' v-if="scope.row.check_state==0">重新申请</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background class='page' layout="prev, pager, next" :page-size="pageSize" :current-page="searchObj.page" :total="total" @current-change="pageChange">
      </el-pagination>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchObj: {
        search: "",
        tag_search: "",
        page: 1
      },
      tipActiveIndex: 0,
      pageSize: 0,
      name: "",
      company_name: "",
      total: 0,
      tableData: [],
      operationType: 0 //0 查看  1 修改
    };
  },
  mounted() {
    this.getProjectList();
  },
  methods: {
    getIndex(row) {
      let index = row.$index + 1 + (this.searchObj.page - 1) * this.pageSize;
      return index;
    },
    clickTip(index) {
      this.tipActiveIndex = index;
      this.searchObj.tag_search = index;
      this.search();
    },
    search() {
      this.searchObj.page = 1;
      this.getProjectList();
    },
    async getProjectList() {
      let res = await this.api.getProjectList(this.searchObj);
      if (res.code == 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageSize = res.data.per_page;
      }
    },
    projectState(row) {
      if (row == 0) {
        return "未管理";
      } else if (row == 1) {
        return "管理中";
      } else if (row == 2) {
        return "已转新房";
      } else if (row == 3) {
        return "已转二手房";
      }
    },
    authenticationState(row) {
      if (row == 0) {
        return "未认证";
      } else if (row == 1) {
        return "已认证";
      }
    },
    scopeState(row) {
      if (row == 1) {
        return "自行申请";
      } else if (row == 2) {
        return "平台分配";
      }
    },
    auditingState(row) {
      if (row == 0) {
        return "拒绝";
      } else if (row == 1) {
        return "通过";
      } else if (row == 2) {
        return "待审核";
      }
    },
    pageChange(page) {
      this.searchObj.page = page;

      this.getProjectList();
    },
    async showAdd(type, row) {
      //新增 0 修改 1 查看 2
      if (type == 0) {
        this.$router.push({
          name: "addProject",
          params: { operationType: type }
        });
      } else if (type == 1) {
        this.$router.push({
          name: "addProject",
          params: { operationType: type, project_id: row.project_id }
        });
      } else if (type == 2) {
        console.log(row);
        this.$router.push({
          name: "addProject",
          params: { operationType: type, project_id: row.project_id }
        });
      } else if (type == 3) {
        this.$router.push({
          name: "reCreateProject",
          params: { operationType: type, project_id: row.project_id }
        });
      }
    }
  }
};
</script>


