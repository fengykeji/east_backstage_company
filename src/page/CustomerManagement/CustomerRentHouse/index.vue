<style lang="less" scoped src="./index.less" ></style>
<style lang="less">
body {
  background-color: #fafafc;
}
.customerRentHouse {
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
    <div class='customerRentHouse project'>
        <div class='title'>
            <div class='left'>
                <div class='text1'>当前位置：客户管理 ➟ 租房</div>
                <div class="left">
                    <el-button class='tip' :class="tipActiveIndex==1?'active':''" type="text" @click="clickTip(1)">全部</el-button>
                    <el-button class='tip' :class="tipActiveIndex==2?'active':''" type="text" @click="clickTip(2)">已推荐</el-button>
                    <el-button class='tip' :class="tipActiveIndex==3?'active':''" type="text" @click="clickTip(3)">带看中</el-button>
                    <el-button class='tip' :class="tipActiveIndex==4?'active':''" type="text" @click="clickTip(4)">带看失效</el-button>
                    <el-button class='tip' :class="tipActiveIndex==3?'active':''" type="text" @click="clickTip(3)">带看成交</el-button>
                    <el-button class='tip' :class="tipActiveIndex==4?'active':''" type="text" @click="clickTip(4)">带看未成交</el-button>
                    <div class="search-block">
                        <el-input class='query' v-model="searchObj.search" placeholder="可查询推荐编号/经纪人姓名"></el-input>
                        <el-button icon="el-icon-search" circle @click='getExList'></el-button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <el-table :data="tableData" border style="width: 100%" class="mt-30">
                <el-table-column prop="" label="序号" align='center' width="70px">
                    <template slot-scope="scope">{{getIndex(scope)}}</template>
                </el-table-column>
                <el-table-column prop="store_code" label="推荐编号" align='center' width="90px"></el-table-column>
                <el-table-column prop="contact" label="客户姓名" align='center'></el-table-column>
                <el-table-column prop="contact_tel" label="联系电话" align='center' width="110px"></el-table-column>
                <el-table-column prop="store_name" label="意向物业类型" align='center' width="110px"></el-table-column>
                <el-table-column prop="gave_code" label="意向区域" align='center'></el-table-column>
                <el-table-column prop="developer_name" label="项目名称" align='center'></el-table-column>
                <el-table-column prop="contact_tel" label="项目地址" align='center' width="110px"></el-table-column>
                <el-table-column prop="developer_name" label="推荐经纪人" align='center'></el-table-column>
                <el-table-column prop="is_distribution" label="带看经纪人" align='center' width="80px"></el-table-column>
                <el-table-column prop="contact" label="状态" align='center'></el-table-column>
                <el-table-column prop="operation" label="操作" align='center' width="170px">
                    <template slot-scope="scope">
                        <el-button type="text" @click='see(scope.row)'>查看</el-button>
                        <el-button type="text">删除</el-button>
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
        tag_search: "",
        page: 1
      },
      pageSize: 0,
      total: 0,
      tableData: [],
      store_id: ""
    };
  },
  mounted() {
    this.getStoreList();
  },
  methods: {
    see(row) {
      this.$router.push({ name: "dealNewHouseSeeInfo" });
    },
    getIndex(row) {
      let index = row.$index + 1 + (this.searchObj.page - 1) * this.pageSize;
      return index;
    },
    search() {
      this.searchObj.page = 1;
      this.getStoreList();
    },
    async getStoreList() {
      let res = await this.api.getStoreList(this.searchObj);
      if (res.code == 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageSize = res.data.per_page;
      }
    },
    pageChange(page) {
      this.searchObj.page = page;
      this.getStoreList();
    }
  }
};
</script>


