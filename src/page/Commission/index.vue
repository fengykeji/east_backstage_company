<style lang="less" scoped src="./index.less" ></style>
<style lang="less">
body {
  background-color: #fafafc;
}
.commission {
  .el-table thead.is-group th {
    background-color: #fff;
  }
  .el-table thead {
    color: #333;
  }
  .el-table--border,
  .el-table--group {
    margin-top: 20px;
  }
  .el-table th {
    padding: 0px 0px;
  }
  .el-table td {
    padding: 0;
  }
  .el-dialog__body {
    padding-top: 0;
  }
  .el-table thead {
    color: #333;
  }
  .el-table thead.is-group th {
    background-color: none;
  }
}
</style>

<template>
  <div class='commission'>
    <div class='title'>
      <div class='table-title'>
        <div class='text1'>当前位置：佣金管理</div>
        <div class="search-block">
          <el-input class='query' placeholder="可按项目名称进行查询" v-model="searchObj.search"></el-input>
          <el-button icon="el-icon-search" circle @click="getProjectCommissionList"></el-button>
        </div>
      </div>
    </div>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" align='center' width="70px">
          <template slot-scope="scope">{{getIndex(scope)}}</template>
        </el-table-column>
        <el-table-column prop="project_name" label="项目名称" align='center' width="110px"></el-table-column>
        <el-table-column prop="city_name" label="区域" align='center' width="80px"></el-table-column>
        <el-table-column prop="project_hold_name" label="项目负责人" align='center' width="130px"></el-table-column>
        <el-table-column prop="project_hold_phone" label="联系方式" align='center' width="110px"></el-table-column>
        <el-table-column prop="company_name" label="所属单位" align='center' width="150px"></el-table-column>
        <el-table-column label="全部" align='center'>
          <el-table-column prop="all_all_price" label="累计金额" align='center'></el-table-column>
          <el-table-column prop="all_y_price" label="已结金额" align='center'></el-table-column>
          <el-table-column prop="all_n_price" label="未结金额" align='center'></el-table-column>
        </el-table-column>
        <el-table-column label="公司" align='center'>
          <el-table-column prop="company_all_price" label="累计金额" align='center'>
            <template slot-scope="scope">
              <el-button @click='companyPrice (scope.row,0)' type="text">{{scope.row.company_all_price}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="company_y_price" label="已结金额" align='center'>
            <template slot-scope="scope">
              <el-button @click='companyPrice(scope.row,1)' type="text">{{scope.row.company_y_price}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="company_n_price" label="未结金额" align='center'>
            <template slot-scope="scope">
              <el-button @click='companyPrice(scope.row,2)' type="text">{{scope.row.company_n_price}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="全民经纪人" align='center'>
          <el-table-column prop="person_all_price" label="累计金额" align='center'>
            <template slot-scope="scope">
              <el-button @click='personPrice(scope.row,0)' type="text">{{scope.row.person_all_price}}</el-button>
            </template>
          </el-table-column>

          <el-table-column prop="person_y_price" label="已结金额" align='center'>
            <template slot-scope="scope">
              <el-button @click='personPrice(scope.row,1)' type="text">{{scope.row.person_y_price}}</el-button>
            </template>
          </el-table-column>

          <el-table-column prop="person_n_price" label="未结金额" align='center'>
            <template slot-scope="scope">
              <el-button @click='personPrice(scope.row,2)' type="text">{{scope.row.person_n_price}}</el-button>
            </template>
          </el-table-column>
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
        search: "",
        page: 1
      },
      pageSize: 0,
      total: 0,
      companyType: 0, //0公司累计金额   1  公司已结金额  2 公司未结金额
      personType: 0 //0全民经纪人累计金额   1  全民经纪人已结金额  2 全民经纪人未结金额
    };
  },
  mounted() {
    this.getProjectCommissionList();
  },
  methods: {
    companyPrice(row, type) {
      if (type == 0) {
        this.$router.push({
          name: "companyPrice",
          params: {
            companyType: type,
            project_id: row.project_id
          }
        });
      } else if (type == 1) {
        this.$router.push({
          name: "companyPrice",
          params: {
            companyType: type,
            project_id: row.project_id
          }
        });
      } else if (type == 2) {
        this.$router.push({
          name: "companyPrice",
          params: {
            companyType: type,
            project_id: row.project_id
          }
        });
      }
    },
    personPrice(row, type) {
      if (type == 0) {
        this.$router.push({
          name: "personPrice",
          params: {
            personType: type,
            project_id: row.project_id
          }
        });
      } else if (type == 2) {
        // else if (type == 1) {
        //   this.$router.push({
        //     name: "companyPrice",
        //     params: {
        //       personType: type,
        //       project_id: row.project_id
        //     }
        //   });
        // }
        this.$router.push({
          name: "personPrice",
          params: {
            personType: type,
            project_id: row.project_id
          }
        });
      }
    },
    getIndex(row) {
      let index = row.$index + 1 + (this.searchObj.page - 1) * this.pageSize;
      return index;
    },
    pageChange(page) {
      this.searchObj.page = page;
      this.getProjectCommissionList();
    },
    async getProjectCommissionList() {
      let res = await this.api.getProjectCommissionList(this.searchObj);
      if (res.code == 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
       this.pageSize = res.data.per_page;
      }
    }
  }
};
</script>


