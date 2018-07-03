<style lang="less" scoped>
.addPerson {
  width: 1050px;
  margin: 0 auto;
  border: 1px solid #999;
  text-align: left;
  padding: 15px 20px;
  margin-top: 20px;
}
.rule {
  margin-top: 20px;
}
.page {
  text-align: right;
  padding-top: 20px;
}
.input1 {
  width: 200px;
  display: inline-block;
  padding-right: 30px;
  vertical-align: middle;
}
.border {
  border: 1px solid #888;
  padding: 0 10px;
  border-radius: 4px;
  height: 40px;
  margin-top: 32px;
}
.el-form-item {
  margin-bottom: 5px;
}
.num_set {
  padding-top: 15px;
  font-size: 24px;
  text-align: left;
}
.cancel {
  margin-top: 20px;
  text-align: right;
}
.box {
}
.el-form-item {
  margin: 2px 0;
}
.query {
  width: 240px;
}
.selectDis {
  display: inline-block;
}
.texe-1 {
  padding-bottom: 10px;
}
.btn {
  position: relative;
  height: 40px;
}
.pos-right {
  position: absolute;
  right: 0;
}
.relative {
  position: relative;
  margin: 15px 0;
}
.title {
  position: relative;
  padding-bottom: 10px;
}
.addbtn {
  position: absolute;
  top: -6px;
  right: 0;
}
</style>
<style lang="less" >
.addPerson {
  .el-select {
    width: 150px;
  }
}
</style>


<template>
  <div class='addPerson'>
    <div class='box'>
      <div class='relative'>
        <city-selector class='selectDis' :province.sync="searchObj.province" :city.sync="searchObj.city" :district.sync="searchObj.district" />
        <el-input class='query' v-model="searchObj.search" placeholder="可按项目编号/项目名称进行查询"></el-input>
        <el-button @click="changeProjectList" icon="el-icon-search" circle></el-button>
        <span class='pos-abs'>
          <el-button type="primary" class="pos-right" @click="close">返回</el-button>
        </span>
      </div>
    </div>
    <div class='texe-1'>申请项目信息</div>
    <el-table :data="sumbitForm" border>
      <el-table-column label="序号" align='center' width="70px">
        <template slot-scope="scope">{{getIndex(scope)}}</template>
      </el-table-column>
      <el-table-column property="project_code" label="项目编号" align='center'></el-table-column>
      <el-table-column property="project_name" label="项目名称" align='center'></el-table-column>
      <el-table-column property="absolute_address" label="地址" align='center' width="320px">
        <template slot-scope="scope">
          <span>{{scope.row.province_name + scope.row.city_name + scope.row.district_name+scope.row.absolute_address}}</span>
        </template>
      </el-table-column>
      <el-table-column property="project_hold_name" label="项目负责人" align='center'></el-table-column>
      <el-table-column property="project_hold_phone" label="联系方式" align='center' width="120px"></el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope">
          <el-button @click='sumbit(scope.row)'>提交</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background class='page' layout="prev, pager, next" :page-size="pageSize" :current-page="searchObj.page" :total="total" @current-change="pageChange">
    </el-pagination>
  </div>
</template>
<script>
import CitySelector from "../../../components/CitySelector";
export default {
  data() {
    return {
      searchObj: {
        search: "",
        province: "",
        city: "",
        district: "",
        page: 1
      },
      pageSize: 0,
      total: 0,
      sumbitForm: [],
      project_id: ""
    };
  },
  mounted() {
    this.changeProjectList();
  },
  methods: {
    addshow() {
      this.$router.push({
        name: "ruleOfMaid"
      });
    },
    search() {
      this.searchObj.page = 1;
      this.changeProjectList();
    },
    getIndex(row) {
      let index = row.$index + 1 + (this.searchObj.page - 1) * this.pageSize;
      return index;
    },
    pageChange(page) {
      this.searchObj.page = page;
      this.changeProjectList();
    },
    async changeProjectList() {
      let res = await this.api.changeProjectList(this.searchObj);
      if (res.code == 200) {
        this.sumbitForm = res.data.data;
        this.total = res.data.total;
        this.pageSize = res.data.per_page;
      }
    },
    sumbit(row) {
      this.$router.push({
        name: "projectInfo",
        params: {
          project_id: row.project_id
        }
      });
    },
    close() {
      this.$router.push({ name: "distribution", params: this.$route.params });
    }
  },
  components: {
    CitySelector: CitySelector
  }
};
</script>


