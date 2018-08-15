<style lang="less" scoped src="./index.less" ></style>
<style lang="less">
.storeHouseTwoHouse {
  .el-table thead {
    color: #333;
  }
  .el-table th {
    padding: 8px 5px;
  }
  .el-table td {
    padding: 0;
  }
  .dialog {
    text-align: left;
    position: fixed;
    top: -10%;
    left: 0;
    .el-dialog__title {
      font-size: 26px;
    }
    .el-dialog__body {
      padding: 0px 20px 20px 20px;
    }
    .el-form-item {
      margin: 0;
    }
    .btn {
      position: absolute;
      right: 0;
      top: 15px;
      margin-right: 20px;
    }
    .num_set {
      font-size: 18px;
      padding: 5px 0;
    }
    .border {
      width: 140px;
      height: 35px;
      border: 1px solid#bbb;
      border-radius: 6px;
      padding-left: 10px;
    }
    .border.img {
      border: none;
    }
    .el-form-item__content {
      text-align: left;
    }
    .border.img {
      width: 240px;
      border: none;
      .text {
        padding-right: 20px;
        font-size: 14px;
      }
    }
    .border.height {
      height: 70px;
      width: 400px;
    }
    .border.width {
      width: 340px;
    }
    .input1 {
      display: inline-block;
      padding-right: 30px;
      text-align: left;
      vertical-align: top;
    }
    .img-text {
      display: inline-block;
      vertical-align: top;
    }
    .showImg {
      width: 800px;
      position: fixed;
      top: 20%;
      left: 30%;
    }
  }
}
</style>

<template>
  <div class='storeHouseTwoHouse'>
    <div class='title'>
      <div class='left'>
        <div class='text1'>当前位置：房源管理 ➟ 二手房</div>
        <div class="left">
          <el-button class='tip' :class="tipActiveIndex== 0 ?'active':''" type="text" @click="clickTip(0)">全部</el-button>
          <el-button class='tip' :class="tipActiveIndex==1?'active':''" type="text" @click="clickTip(1)">已报备</el-button>
          <el-button class='tip' :class="tipActiveIndex==2?'active':''" type="text" @click="clickTip(2)">勘察中</el-button>
          <el-button class='tip' :class="tipActiveIndex==3?'active':''" type="text" @click="clickTip(3)">勘察失效</el-button>
          <el-button class='tip' :class="tipActiveIndex==4?'active':''" type="text" @click="clickTip(4)">勘察完成</el-button>
          <el-button class='tip' :class="tipActiveIndex==5?'active':''" type="text" @click="clickTip(5)">已下架</el-button>
          <div class="search-block-option">
            <el-select v-model="value" placeholder="可按项目查询">
              <el-option v-for="item in options" :key="item.project_id" :label="item.project_name" :value="item.project_id">
              </el-option>
            </el-select>
            <el-select v-model="value" placeholder="可按门店查询">
              <el-option v-for="item in storeOptions" :key="item.store_id" :label="item.store_name" :value="item.store_id">
              </el-option>
            </el-select>
          </div>
          <!-- <div class="search-block">
            <el-input class='query' v-model="searchObj.search" placeholder="可查询云算号/经纪人姓名"></el-input>
            <el-button icon="el-icon-search" circle @click='storeHousegetList'></el-button>
          </div> -->
        </div>
      </div>
    </div>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="" label="序号" align='center' width="70px">
          <template slot-scope="scope">{{getIndex(scope)}}</template>
        </el-table-column>
        <el-table-column prop="house_code" label="房源编号" align='center' width="130px"></el-table-column>
        <el-table-column prop="project_name" label="所属项目" align='center'></el-table-column>
        <el-table-column prop="house_name" label="房号" align='center'></el-table-column>
        <el-table-column prop="house_type_name" label="户型" align='center'></el-table-column>
        <el-table-column prop="build_area" label="面积(/㎡)" align='center'></el-table-column>
        <el-table-column prop="unit_price" label="售单价(元/㎡)" align='center' width="120px"></el-table-column>
        <el-table-column prop="price" label="售总价(万)" align='center'></el-table-column>
        <el-table-column prop="record_name" label="报备经纪人" align='center'></el-table-column>
        <el-table-column prop="survey_name" label="勘察经纪人" align='center'></el-table-column>
        <el-table-column label="勘察状态" align='center' width="110px">
          <template slot-scope="scope">{{surveyState(scope.row.current_state)}}</template>
        </el-table-column>
        <el-table-column label="状态" align='center' width="110px">
          <template slot-scope="scope">{{state(scope.row.state)}}</template>
        </el-table-column>
        <el-table-column label="操作" align='center'>
          <template slot-scope="scope">
            <el-button type="text" @click='see(scope.row)'>查看</el-button>
            <el-button type="text">删除</el-button>
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
      tableData: [],
      searchObj: {
        tag_search: 0,
        search: "",
        page: 1
      },
      value: "",
      options: [],
      storeOptions: [],
      pageSize: 0,
      total: 0,
      tipActiveIndex: 1
    };
  },

  mounted() {
    this.storeHousegetList();
    this.getProjectsearch(); //搜索框
  },
  methods: {
    async getProjectsearch() {
      let res = await this.api.storeHousegetList();
      if (res.code == 200) {
        this.options = res.data.project;
        this.storeOptions = res.data.store;
      }
    },
    surveyState(row) {
      if (row == 2) {
        return "勘察中";
      } else if (row == 3) {
        return "勘察完成";
      } else if (row == 0) {
        return "勘察失效";
      } else {
        return "已报备";
      }
    },
    state(row) {
      if (row == 0) {
        return "已下架";
      } else if (row == 1) {
        return "已上架";
      } else {
        return "";
      }
    },
    see(row) {
      console.log(row);
      this.$router.push({
        name: "storeHouseSeeInfo",
        query: {
          record_id: row.record_id,
          current_state: row.current_state,
          state: row.state
        }
      });
    },
    async storeHousegetList() {
      let res = await this.api.storeHousegetList(this.searchObj);
      if (res.code == 200) {
        this.tableData = res.data.house.data;
        this.total = res.data.house.total;
        this.pageSize = res.data.house.per_page;
      }
    },
    pageChange(page) {
      this.searchObj.page = page;
      this.storeHousegetList();
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
      this.storeHousegetList();
    }
  }
};
</script>


