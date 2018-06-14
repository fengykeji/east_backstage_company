<style lang="less" scoped src="./index.less" ></style>
<style lang="less">
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
    margin-top: 20px;
  }
  .el-table th {
    padding: 8px 5px;
  }
  .el-table td {
    padding: 0;
  }
}
</style>
<template>
    <div class='box project'>
        <div class='title'>
            <span></span>
            <span class='left'>
                <div class='text1'>当前位置：项目管理</div>
                 <div>
                    <el-button class='tip' type="text" @click="search(0)">全部</el-button>
                    <el-button class='tip' type="text" @click="search(1)">待审核</el-button>
                    <el-button class='tip' type="text" @click="search(2)">审核不通过</el-button>
                    <el-button class='tip' type="text" @click="search(3)">未认证</el-button>
                    <el-button class='tip' type="text" @click="search(4)">已认证</el-button>
                    <el-button class='tip' type="text" @click="search(5)">已转出</el-button>
                 </div>
            </span>
             <el-input v-model="searchObj.search" class='query'></el-input>
              <el-button @click="getProjectList" icon="el-icon-search" circle></el-button>
            <span class='right'>
                 <el-button type="primary" @click='showAdd(0)'>新增</el-button>
            </span>
        </div>
        <template>
  <el-table :data="tableData"  border  style="width: 100%">
    <el-table-column  prop="project_id" label="序号"  align='center' width="70px"> </el-table-column>
    <el-table-column  prop="project_code"  label="项目编号"  align='center' width="100px"></el-table-column>
    <el-table-column  prop="project_name" label="项目名称" align='center' width="120px"></el-table-column>
       <!-- 项目状态函数 -->
     <el-table-column prop="state" label="项目状态" align='center' width="90px">
        <template slot-scope="scope">{{projectState(scope.row.state)}}</template>
    </el-table-column>
    <el-table-column  prop="city" label="区域" align='center' width="90px"></el-table-column>
    <el-table-column  prop="absolute_address" label="地址" align='center' width="220px"></el-table-column>
    <el-table-column  prop="developer_name" label="开发商" align='center' width="160px"></el-table-column>
    <el-table-column  prop="company_relation" label="与项目关系" align='center' width="110px"></el-table-column>
    <el-table-column  prop="subordinate_company" label="所属单位" align='center' width="120px"></el-table-column>
    <el-table-column prop="source" label="来源" align='center' width="80px">
         <template slot-scope="scope">{{scopeState (scope.row.source)}}</template>
    </el-table-column>
    <el-table-column prop="authentication_state" label="认证状态" align='center' width="90px">
         <template slot-scope="scope">{{authenticationState (scope.row.authentication_state)}}</template>
    </el-table-column>
    <el-table-column  prop="" label="申请人" align='center' width="120px"></el-table-column>
    <el-table-column  prop="create_time" label="申请时间" align='center' width="120px"></el-table-column>
          <!-- 审核状态函数 -->
    <el-table-column prop="auditing_state" label="审核状态" align='center' width="90px">
           <template slot-scope="scope">{{auditingState(scope.row.auditing_state)}}</template>
    </el-table-column>
    <el-table-column  prop="auditing_name" label="审核人" align='center' width="90px"></el-table-column>
    <el-table-column  prop="auditing_time" label="审核时间" align='center' width="120px"></el-table-column>
    <el-table-column property="operation" label="操作" align='center' width="180px">
        <template slot-scope="scope">
          <el-button type="text" @click='showAdd(2, scope.row)'>查看</el-button>
          <el-button type="text" @click='showAdd(1, scope.row)'>修改</el-button>
          <el-button type="text" @click='showAdd(3, scope.row)' v-if="scope.row.auditing_state==2">重新申请</el-button>
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
      searchObj: {
        search: "",
        tag_search: ""
      },
      tableData: []
    };
  },
  mounted() {
    this.getProjectList();
  },
  methods: {
    search(type) {
      this.searchObj.tag_search = type;
      this.getProjectList();
    },
    async getProjectList() {
      let res = await this.api.getProjectList(this.searchObj);
      if (res.code == 200) {
        this.tableData = res.data;
      }
    },
    projectState(row) {
      if (row == 0) {
        return "弃用";
      } else if (row == 1) {
        return "正常";
      } else if (row == 2) {
        return "已转新房";
      } else if (row == 3) {
        return "已转二手房";
      }
    },
    authenticationState(row) {
      if (row == 1) {
        return "未认证";
      } else if (row == 2) {
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
        return "待审核";
      } else if (row == 1) {
        return "通过";
      } else if (row == 2) {
        return "未通过";
      }
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


