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
                <el-table-column prop="num" label="房源编号" align='center'></el-table-column>
                <el-table-column prop="name" label="所属项目" align='center'></el-table-column>
                <el-table-column prop="city" label="所属门店" align='center'></el-table-column>
                <el-table-column prop="a" label="房号" align='center'></el-table-column>
                <el-table-column prop="a" label="户型" align='center'></el-table-column>
                <el-table-column prop="b" label="面积（/㎡）" align='center'></el-table-column>
                <el-table-column prop="c" label="售单价（/㎡）" align='center'></el-table-column>
                <el-table-column prop="d" label="售总价（万）" align='center'></el-table-column>
                <el-table-column prop="f" label="报备经纪人" align='center'></el-table-column>
                <el-table-column prop="f" label="勘察经纪人" align='center'></el-table-column>
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
import CompanyMockData from "@/mock/Company";
export default {
  data() {
    return {
      value: "",
      remark: "",
      searchObj: {
        search: "",
        tag_search: 0,
        page: 1
      },
      pageSize: 1,
      name: "",
      company_name: "",
      total: 1,
      tableData: CompanyMockData
    };
  },
  mounted() {},
  methods: {
    see(row) {
        console.log(123)
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
    },
    clickTip(index) {
      this.searchObj.tag_search = index;
      // this.search();
    }
  }
};
</script>
