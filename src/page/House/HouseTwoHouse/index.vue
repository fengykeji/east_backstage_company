<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.houseTwoHouse {
  .el-dialog {
    width: 35%;
  }
  .el-table th {
    background-color: #fff;
    padding: 8px 0;
    color: #000;
    font-weight: 600;
  }
  .el-table td {
    padding: 0;
  }
  .el-form-item__content {
    line-height: 43px;
  }
  .el-dialog__body {
    padding: 0px 30px;
  }
}
</style>

<template>
  <div class='houseTwoHouse'>
    <div class='title'>
      <div class='block-title'>
        <div class='block-textAdd-query'>
          <div class='title-text'>当前位置：房源管理 ➟ 二手房</div>
          <div class="search-block-option">
            <el-select v-model="searchObj.project_search" placeholder="可按项目查询" @change="changeProject">
              <el-option v-for="item in options" :key="item.project_id" :label="item.project_name" :value="item.project_id">
              </el-option>
            </el-select>
            <el-select v-model="searchObj.store_search" placeholder="可按门店查询" @change="changeStore">
              <el-option v-for="item in storeOptions" :key="item.store_id" :label="item.store_name" :value="item.store_id">
              </el-option>
            </el-select>
          </div>
          <div class='query-all'>
            <el-input v-model="searchObj.search" class='query' placeholder="可按公司名称/公司编号"></el-input>
            <el-button type="primary">查询</el-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="" label="序号" align='center' width="60px">
          <template slot-scope="scope">{{getIndex(scope)}}</template>
        </el-table-column>
        <el-table-column prop="house_code" label="房源编号" align='center'></el-table-column>
        <el-table-column prop="project_name" label="所属项目" align='center'></el-table-column>
        <el-table-column prop="store_name" label="所属门店" align='center'></el-table-column>
        <el-table-column prop="house_name" label="房号" align='center'></el-table-column>
        <el-table-column prop="house_type_name" label="户型" align='center'></el-table-column>
        <el-table-column prop="build_area" label="面积（/㎡）" align='center'></el-table-column>
        <el-table-column prop="unit_price" label="售单价（/㎡）" align='center'></el-table-column>
        <el-table-column prop="price" label="售总价（万）" align='center'></el-table-column>
        <el-table-column prop="record_name" label="报备经纪人" align='center'></el-table-column>
        <el-table-column prop="survey_name" label="勘察经纪人" align='center'></el-table-column>
        <el-table-column label="操作" align='center' width="100px">
          <template slot-scope="scope">
            <el-button type="text" @click='see(scope.row)'>查看</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="tableData.length > 0" background class='page' layout="prev, pager, next" :page-size="pageSize" :current-page="searchObj.page" :total="total" @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      remark: "",
      searchObj: {
        search: "",
        tag_search: 0,
        page: 1
        // project_search: "",
        // store_search: ""
      },
      options: [],
      storeOptions: [],
      pageSize: 1,
      name: "",
      company_name: "",
      total: 1,
      tableData: []
    };
  },
  mounted() {
    this.storeHousegetList();
    this.getProjectsearch();
  },
  methods: {
    changeProject(value) {
      this.searchObj.project_search = value;
    },
    changeStore(value) {
      this.searchObj.store_search = value;
    },
    async storeHousegetList() {
      let res = await this.api.storeHousegetList(this.searchObj);
      if (res.code == 200) {
        this.tableData = res.data.house.data;
        this.total = res.data.house.total;
        this.pageSize = res.data.house.per_page;
      }
    },
    async getProjectsearch() {
      let res = await this.api.storeHousegetList();
      if (res.code == 200) {
        this.options = res.data.project;
        this.storeOptions = res.data.store;
      }
    },
    see(row) {
      this.$router.push({
        name: "seeHouseInfo"
      });
    },
    getIndex(row) {
      let index = row.$index + 1;
      return index;
    },
    pageChange(page) {
      this.searchObj.page = page;
    }
  }
};
</script>
