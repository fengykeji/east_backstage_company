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
                    <el-button class='tip' :class="tipActiveIndex==1?'active':''" type="text" @click="clickTip(1)">全部</el-button>
                    <el-button class='tip' :class="tipActiveIndex==2?'active':''" type="text" @click="clickTip(2)">已报备</el-button>
                    <el-button class='tip' :class="tipActiveIndex==0?'active':''" type="text" @click="clickTip(0)">勘察中</el-button>
                    <el-button class='tip' :class="tipActiveIndex==0?'active':''" type="text" @click="clickTip(0)">勘察失效</el-button>
                    <el-button class='tip' :class="tipActiveIndex==0?'active':''" type="text" @click="clickTip(0)">勘察完成</el-button>
                    <el-button class='tip' :class="tipActiveIndex==0?'active':''" type="text" @click="clickTip(0)">已下架</el-button>
                    <div class="search-block">
                        <el-input class='query' v-model="searchObj.search" placeholder="可查询云算号/经纪人姓名"></el-input>
                        <el-button icon="el-icon-search" circle @click='getExList'></el-button>
                    </div>
                </div>
            </div>
        </div>
        <template>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="" label="序号" align='center' width="70px">
                    <template slot-scope="scope">{{getIndex(scope)}}</template>
                </el-table-column>
                <el-table-column prop="account" label="房源编号" align='center'></el-table-column>
                <el-table-column prop="name" label="所属项目" align='center'></el-table-column>
                <el-table-column prop="tel" label="房号" align='center'></el-table-column>
                <el-table-column prop="project_name" label="户型" align='center'></el-table-column>
                <el-table-column prop="department" label="面积(/㎡)" align='center'></el-table-column>
                <el-table-column prop="city_name" label="售单价(元/㎡)" align='center'></el-table-column>
                <el-table-column prop="district_name" label="售总价(万)" align='center'></el-table-column>
                <el-table-column prop="remark" label="报备经纪人" align='center'></el-table-column>
                <el-table-column prop="entry_time" label="勘察经纪人" align='center'></el-table-column>
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
        tag_search: "",
        search: "",
        page: 1
      },
      pageSize: 0,
      total: 0,
      tipActiveIndex: 1,
      examinePeople: {
        name: "",
        role: "",
        account: "",
        department: "",
        position: "",
        img_url: "",
        entry_time: "",
        project_name: "",
        sex: "",
        tel: "",
        birth: "",
        absolute_address: "",
        city_name: "",
        district_name: ""
      },
      submitForm: {}
    };
  },

  mounted() {
    this.getExList();
  },
  methods: {
    state(row) {
      if (row == 0) {
        return "勘察失效";
      } else if (row == 1) {
        return "已报备";
      } else if (row == 2) {
        return "勘察中";
      }
    },
    see(row) {
      this.$router.push({ name: "storeHouseSeeInfo" });
    },
    async getExList() {
      let res = await this.api.getExList(this.searchObj);
      if ((res.code = 200)) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageSize = res.data.per_page;
      }
    },
    pageChange(page) {
      this.searchObj.page = page;
      this.getExList();
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
      this.getExList();
    }
  }
};
</script>


