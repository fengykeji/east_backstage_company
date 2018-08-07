<style lang="less" scoped src="./index.less" ></style>
<style lang="less">
body {
  background-color: #fafafc;
}
.twoHouse {
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
  <div class='twoHouse'>
    <div class='title'>
      <div class='left'>
        <div class="tab-block">
          <div class='text1'>当前位置：项目管理 ➟ 二手房</div>
          <div class="tab-block-inner">
            <el-input v-model="searchObj.search" class='query' placeholder="可按项目编号/项目名称进行查询"></el-input>
            <el-button @click="search" icon="el-icon-search" circle></el-button>
            <el-button type="primary" @click='AddProjrct' v-if='this.store_id!=0'>新增</el-button>
            <el-button type="primary" @click='showAdd'>发起申请</el-button>
          </div>
        </div>
        <div>
          <el-button class='tip' :class="tipActiveIndex==2?'active':''" type="text" @click="clickTip(2)">待审核</el-button>
          <el-button class='tip' :class="tipActiveIndex==1?'active':''" type="text" @click="clickTip(1)">审核通过</el-button>
          <el-button class='tip' :class="tipActiveIndex==0?'active':''" type="text" @click="clickTip(0)">审核不通过</el-button>
        </div>
      </div>
    </div>
    <div>

      <ready-table v-if="searchObj.tag_search == 2" :tableData="tableData" />
      <pass-table v-if="searchObj.tag_search == 1" :tableData="tableData" @accountAdmin='accountAdmin' />
      <no-pass-table v-if="searchObj.tag_search == 0" :tableData="tableData" />
      <el-pagination background class='page' layout="prev, pager, next" :page-size="pageSize" :current-page="searchObj.page" :total="total" @current-change="pageChange">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import ReadyTable from "@/modules/TwoHouse/ReadyTable";
import PassTable from "@/modules/TwoHouse/PassTable";
import NoPassTable from "@/modules/TwoHouse/NoPassTable";
export default {
  data() {
    return {
      searchObj: {
        search: "",
        tag_search: 2,
        page: 1
      },
      tipActiveIndex: 2,
      pageSize: 0,
      total: 0,
      tableData: [],
      operationType: 0, //新增 0 修改 1 查看 2
      store_id: ""
    };
  },
  mounted() {
    this.store_id = localStorage.getItem("store_id");
    this.getTwoHouseList();
  },
  methods: {
    accountAdmin(row) {
      this.$router.push({
        name: "accountAdmin",
        query: {
          project_id: row.project_id
        }
      });
    },
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
      this.getTwoHouseList();
    },
    async getTwoHouseList() {
      let res = await this.api.getTwoHouseList(this.searchObj);
      if (res.code == 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageSize = res.data.per_page;
      }
    },
    pageChange(page) {
      this.searchObj.page = page;

      this.getTwoHouseList();
    },
    AddProjrct() {
      this.$router.push({
        name: "addApply"
      });
    },
    showAdd() {
      this.$router.push({
        name: "apply"
      });
    }
  },
  components: {
    NoPassTable,
    PassTable,
    ReadyTable
  }
};
</script>


