<style lang="less" scoped>
.peopleProject {
  margin-right: 35px;
  .page {
    text-align: right;
    padding-top: 20px;
  }
  .title {
    text-align: left;
    width: 100%;
    z-index: 99;
    .left {
      text-align: left;
      .text1 {
        margin: 20px 0 12px 0px;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .query {
      width: 240px;
    }
    .tab-block {
      position: relative;
      .tab-block-inner {
        position: absolute;
        right: 0;
        top: 0px;
      }
    }
  }
}
</style>
<style lang="less">
.peopleProject {
  .el-form-item__label {
    float: none;
  }
  .el-dialog__body {
    padding-top: 0;
  }
  .el-table--border,
  .el-table--group {
    margin-top: 25px;
  }
  .el-table th {
    padding: 3px 0px;
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
  <div class='peopleProject'>
    <div>
      <div class='title'>
        <div class='left'>
          <div class="tab-block">
            <div class='text1'>当前位置：全民项目管理</div>
            <div class="tab-block-inner">
              <el-input v-model="searchObj.search" class='query' placeholder="可按项目编号/项目名称进行查询"></el-input>
              <el-button icon="el-icon-search" @click='getList' circle></el-button>
            </div>
          </div>
        </div>
      </div>
      <el-table :data="tableData" border style="width: 100%" class="mt-30">
        <el-table-column prop="" label="序号" align='center' width="70px">
          <template slot-scope="scope">{{getIndex(scope)}}</template>
        </el-table-column>
        <el-table-column prop="project_code" label="项目编号" align='center'></el-table-column>
        <el-table-column prop="project_name" label="项目名称" align='center'></el-table-column>
        <el-table-column prop="city" label="区域" align='center'></el-table-column>
        <el-table-column prop="is_distribution" label="分配状态" align='center'></el-table-column>
        <el-table-column prop="operation" label="操作" align='center'>
          <template slot-scope="scope">
            <el-button type="text" @click='showProject(scope.row)'>查看</el-button>
            <el-button type="text" @click='fastDistribution(scope.row)'>分配到访确认人</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background class='page' layout="prev, pager, next" :page-size="pageSize" :current-page="searchObj.page" :total="total" @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchObj: {
        search: "",
        page: 1
      },
      tableData: [],
      pageSize: 0,
      total: 0
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      let res = await this.api.getPeopleList(this.searchObj);
      if (res.code == 200) {
        this.tableData = res.data.data;
        this.pageSize = res.data.per_page;
        this.total = res.data.total;
      }
    },
    showProject(row) {
      this.$router.push({
        name: "peopleProjectInfo",
        params: {
          project_id: row.project_id,
          rule_id: row.rule_id
        }
      });
    },
    fastDistribution(row) {
      this.$router.push({
        name: "peopleFastDistribution",
        params: {
          project_id: row.project_id
        }
      });
    },
    getIndex(row) {
      let index = row.$index + 1 + (this.searchObj.page - 1) * this.pageSize;
      return index;
    },
    search() {
      this.searchObj.page = 1;
      this.getList();
    },
    pageChange(page) {
      this.searchObj.page = page;
      this.getList();
    }
  }
};
</script>
