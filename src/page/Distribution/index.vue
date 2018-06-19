<style lang="less" scoped src="./index.less" ></style>
<style lang="less">
.distribution {
  .el-form-item__label {
    float: none;
  }
  .el-dialog__body {
    padding-top: 0;
  }
  .search{
  position: relative;
}
.search-btn {
  position: fixed;
  top: 11%;
  right: 160px;
}
.search-btn.right{
   right: 40px;
}
}


</style>
<template>
  <div class='box distribution'>
    <div class='title'>
      <span></span>
      <span class='left'>
        <div class='text1'>当前位置：项目分销</div>
        <div>
          <el-button class='tip' type="text" @click="search(0)">全部</el-button>
          <el-button class='tip' type="text" @click="search(1)">待审核</el-button>
          <el-button class='tip' type="text" @click="search(2)">已通过</el-button>
          <el-button class='tip' type="text" @click="search(3)">已终止</el-button>
          <span class='search'>
            <div>
              <el-button class="search-btn" type="primary" @click="getList">高级查询</el-button>
              <el-button class="search-btn right" type="primary" @click='startApply'>发起申请</el-button>
            </div>
          </span>
        </div>
      </span>
      <!-- <el-input v-model="searchObj.tag_search" class='query'></el-input> -->
    </div>
    <div class='search'>
      <!-- <div>
              <span class='block'>
                  <div>
                      <span class='row'>项目编号：</span>
                      <el-input v-model="searchObj.project_code" class='input'></el-input>
                  </div>
                  <div>
                      <span class='row'>开发商名：</span>
                      <el-input v-model="searchObj.developer_name" class='input'></el-input>
                  </div>
              </span>
              <span class='block'>
                 <div>
                      <span class='row'>项目名称：</span>
                      <el-input v-model="searchObj.project_name" class='input'></el-input>
                  </div>
                  <div>
                       <span class='row'>来源：</span>
                       <el-select v-model="searchObj.source" placeholder="请选择">
                         <el-option label="自行申请" value="1"></el-option>
                         <el-option label="项目方选择" value="2"></el-option>
                       </el-select>
                  </div>
              </span>
              <span class='block'>
                 <div>
                      <span class='row'>区域：</span>
                      <el-select v-model="x" placeholder="请选择">
                         <el-option v-for="item in options"  :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                      </el-select>
                  </div>
                
              </span>
          </div> -->
    </div>
    <template>
      <el-table :data="tableData" border style="width: 100%" class="mt-30">
        <el-table-column prop="" label="序号" align='center' width="70px"> </el-table-column>
        <el-table-column prop="project_code" label="项目编号" align='center'></el-table-column>
        <el-table-column prop="project_name" label="项目名称" align='center'></el-table-column>
        <el-table-column prop="end_state" label="项目状态" align='center' width="90px">
          <template slot-scope="scope">{{projectState(scope.row.end_state)}}</template>
        </el-table-column>
        <el-table-column prop="city" label="区域" align='center'></el-table-column>
        <el-table-column prop="absolute_address" label="地址" align='center'></el-table-column>
        <el-table-column prop="subordinate_company" label="项目所属单位" align='center'></el-table-column>
        <el-table-column prop="company_relation" label="与项目关系" align='center'></el-table-column>
        <el-table-column prop="developer_name" label="所属单位" align='center'></el-table-column>
        <el-table-column prop="source" label="来源" align='center' width="80px">
          <template slot-scope="scope">{{scopeState (scope.row.source)}}</template>
        </el-table-column>
        <el-table-column prop="state" label="审核状态" align='center' width="90px">
          <template slot-scope="scope">{{auditingState(scope.row.state)}}</template>
        </el-table-column>
        <el-table-column prop="is_distribution" label="分配状态" align='center'></el-table-column>
        <el-table-column prop="operation" label="操作" align='center' width="210px">
          <template slot-scope="scope">
            <el-button type="text" @click='showProject(scope.row,"see")'>查看</el-button>
            <el-button type="text" @click='showProject(scope.row,"edit")'>修改</el-button>
            <el-button type="text" @click='fastDistribution(scope.row)'>分配到访确认人</el-button>
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
        tag_search: 0,
        project_code: "",
        project_name: "",
        developer_name: "",
        source: ""
      },
      tableData: [],
      project_id: "",
      options: [],
      value: "",
      operationType: 0 //0 查看  1 修改
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    search(tag_search) {
      this.searchObj.tag_search = tag_search;
      this.getList();
    },
    async getList() {
      let res = await this.api.getList(this.searchObj);
      if (res.code == 200) {
        this.tableData = res.data;
      }
    },
    startApply() {
      this.$router.push({
        name: "startApply"
      });
    },
    fastDistribution(row) {
      this.$router.push({
        name: "fastDistribution", 
        params: { project_id: row.project_id }
      });
    },
    showProject(row, type) {
      this.$router.push({
        name: "projectInfo",
        params: { project_id: row.project_id, type: type }
      });
    },
    scopeState(row) {
      if (row == 1) {
        return "自行申请";
      } else if (row == 2) {
        return "项目方选择";
      }
    },
    projectState(row) {
      if (row == 0) {
        return "管理中";
      } else {
        return "以终止";
      }
    },
    auditingState(row) {
      if (row == 0) {
        return "停用";
      } else if (row == 1) {
        return "通过";
      } else if (row == 2) {
        return "审核中";
      }
    }
  }
};
</script>


