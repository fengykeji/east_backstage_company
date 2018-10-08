<style lang="less" scoped src="./index.less" ></style>
<style lang="less">
body {
  background-color: #fafafc;
}
.companyDeal {
  .el-table thead {
    color: #333;
  }
  .el-form-item__label {
    float: none;
  }
  .el-dialog__body {
    padding-top: 0;
  }
  .el-table--border,
  .el-table--group {
    margin-top: 5px;
  }
  .el-table th {
    padding: 8px 0px;
    color: #333;
  }
  .el-table td {
    padding: 0;
    color: #333;
  }
}
</style>
<template>
  <div class='companyDeal'>
    <div class='title'>

      <div class='tab-block'>
        <div class='text1'>当前位置：客户管理 → 成交客户</div>
        <div class="search-block">
          <div class="time_block">
            <el-date-picker v-model="searchObj.start_time" type="date" placeholder="选择日期"  class='date'> </el-date-picker> 
             <span class='date_text'>至</span>
            <el-date-picker v-model="searchObj.end_time" type="date" placeholder="选择日期"  class='date'> </el-date-picker>
          </div>
          <el-input class='query' placeholder="可按客户电话/客户姓名/置业顾问姓名进行查询" v-model="searchObj.search"></el-input>
          <el-button icon="el-icon-search" circle @click="getDealList"></el-button>
        </div>
      </div>
      <div>
        <el-button class='tip' :class="tipActiveIndex==0?'active':''" type="text" @click="clickTip(0)">全部</el-button>
        <el-button class='tip' :class="tipActiveIndex==1?'active':''" type="text" @click="clickTip(1)">有效</el-button>
        <el-button class='tip' :class="tipActiveIndex==2?'active':''" type="text" @click="clickTip(2)">无效</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%" class="mt-30">
      <el-table-column prop="" label="序号" align='center' width="70px">
        <template slot-scope="scope">{{getIndex(scope)}}</template>
      </el-table-column>
      <el-table-column prop="client_id" label="推荐编号" align='center' width="90px"></el-table-column>
      <el-table-column prop="project_name" label="推荐项目" align='center'></el-table-column>
      <el-table-column prop="name" label="客户名称" align='center' width="100px"></el-table-column>
      <el-table-column prop="tel" label="联系电话" align='center' width="120px"></el-table-column>
      <el-table-column prop="property_advicer_real" label="置业顾问" align='center' width="100px"></el-table-column>
      <el-table-column prop="butter_name" label="确认人员" align='center' width="100px"></el-table-column>
      <el-table-column label="推荐人" align='center' width="180px">
        <template slot-scope="scope">{{scope.row.agent_name+ ' / ' +scope.row.agent_tel}}</template>
      </el-table-column>
      <el-table-column prop="subscribe_time" label="成交时间" align='center' width="180px"></el-table-column>
      <el-table-column label="状态" align='center' width="140px">
        <template slot-scope="scope">{{state(scope.row.current_state)}} / {{disabledState(scope.row.disabled_state)}}</template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" align='center' width="100px">
        <template slot-scope="scope">
          <el-button type="text" @click='showProject(scope.row)'>查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background class='page' layout="prev, pager, next" :page-size="pageSize" :current-page="searchObj.page" :total="total" @current-change="pageChange">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
     searchObj: {
        tag_search: 0,
        start_time: "",
        end_time: "",
        page: 1,
        search: ""
      },
      pageSize: 0,
      total: 0,
      tipActiveIndex: 0,
      tableData: [],
      project_id: "",
      rule_id: "",
      options: [],
      value: "",
      operationType: 0 //0 查看  1 修改
    };
  },
  mounted() {
    this.getDealList();
  },
  methods: {
    clickTip(index) {
      this.tipActiveIndex = index;
      this.searchObj.tag_search = index;
      this.search();
    },
    search() {
      this.getDealList();
    },
    async getDealList() {
       if (this.searchObj.start_time && !this.searchObj.end_time) {
        this.$message({
          type: "error",
           message: `请选择查询的结束时间！`
        });
      }
      let res = await this.api.getDealList(this.searchObj);
      if (res.code == 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageSize = res.data.per_page;
      }
    },
    search() {
      this.searchObj.page = 1;
      this.getDealList();
    },
    getIndex(row) {
      let index = row.$index + 1 + (this.searchObj.page - 1) * this.pageSize;
      return index;
    },
    pageChange(page) {
      this.searchObj.page = page;
      this.getDealList();
    },
    state(row) {
      if (row == 5) {
        return "认购";
      } else if (row == 6) {
        return "签约";
      }
    },
    disabledState(row) {
      if (row == 0) {
        return "有效";
      } else {
        return "失效";
      }
    }
  }
};
</script>


